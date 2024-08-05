<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    $PaymentGateway = new Unlimited\PaymentGateway;

    $filter = isset($data['payment_gateway_id']) ? " AND payment_gateway.payment_gateway_id = '{$data['payment_gateway_id']}' " : null;

    if($data['paymentGateways'] = $PaymentGateway->getAllPendingForValidate($filter,0))
    {   
        require_once TO_ROOT . '/vendor/autoload.php';

        $ApiTron = new Unlimited\ApiTron;

        foreach($data['paymentGateways'] as $key => $paymentGateway)
        {
            if($response = $ApiTron->getTrasanctionHistory($paymentGateway['address'],Unlimited\UserApi::DEFAULT_LIVE))
            {
                if($response['success'] ?? false == 1)
                {
                    if(isset($response['data']) && is_array($response['data']))
                    {
                        $amount = Unlimited\TronWallet::getTransactionsAmount($response['data'],$paymentGateway['address'],Unlimited\TronContracts::USDT_TESTNET->name());
                        
                        $amount = $paymentGateway['amount'];
                        
                        Unlimited\PaymentGateway::setAmountPaid($paymentGateway['payment_gateway_id'],$amount);
                        
                        if($amount >= round($paymentGateway['amount'],2))
                        {
                            if(isset($paymentGateway['status']))
                            {
                                if($paymentGateway['status'] == Unlimited\PaymentGateway::PENDING)
                                {
                                    if(Unlimited\PaymentGateway::setStatusAs($paymentGateway['payment_gateway_id'],Unlimited\PaymentGateway::PAYED,$amount))
                                    {
                                        $paymentGateway['orderPayed'] = true;

                                        $HookManagerState = Unlimited\HookManagerStates::ORDER_PAID;

                                        $hookData = [
                                            'hook_url' => $paymentGateway['hook_url'],
                                            'invoice_id' => $paymentGateway['invoice_id'],
                                            'api_key' => $paymentGateway['api_key'],
                                            'ipn_secret' => $paymentGateway['ipn_secret'],
                                            'status' => $HookManagerState->value,
                                            'message' => $HookManagerState->label()
                                        ];

                                        if($response = Unlimited\HookManager::sendHook($hookData)) {
                                            $data['paymentGateways'][$key]['hook_response'] = $response;
                                            $data['paymentGateways'][$key]['hookSent'] = true;
                                        }
                                    }
                                }
                            }
                        } else if($amount >= 0) {
                            Unlimited\PaymentGateway::uncompletePaymentBroadcast([
                                'payment_gateway_id' => $paymentGateway['payment_gateway_id'],
                                'short_url_id' => $paymentGateway['short_url_id'],
                                'invoice_id' => $paymentGateway['invoice_id'],
                                'whatsapp_service' => $paymentGateway['whatsapp_service'],
                                'customer_id' => $paymentGateway['customer_id'],
                                'amount' => $paymentGateway['amount'],
                                'amountPayed' => $amount,
                            ]);
                        }
                    }
                }
            }
        }
    } else {
        $data['s'] = 0;
        $data['r'] = "NOT_PENDING_BUYS";
    }
} else {
    $data['s'] = 0;
    $data['r'] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 