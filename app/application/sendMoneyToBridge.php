<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('send_bridge_money'))
    {
        $BuyPerBridge = new Unlimited\BuyPerBridge;
        
        if($BuyPerBridge->isAviableToSendMoneyToBridge($data['buy_per_bridge_id']))
        {
            $data['amountToSend'] = Unlimited\BuyPerBridge::getPartialFunds([
                'amount' => $data['amountReal'],
                'catalog_bridge_buy_type_id' => $data['catalog_bridge_buy_type_id']
            ]);

            if(sendPayout([
                'payout_id' => Unlimited\BuyPerBridge::getPayoutId([
                    'buy_per_bridge_id' => $data['buy_per_bridge_id'],
                    'catalog_bridge_buy_type_id' => $data['catalog_bridge_buy_type_id']
                ]),
                'amount' => $data['amountToSend'],
                'address' => Unlimited\BuyPerBridge::BRIDGE_WALLET,
                'user_login_id' => 1
            ])) {
                if(Unlimited\BuyPerBridge::setAsProcessing($data['buy_per_bridge_id']))
                {
                    $data["s"] = 1;
                    $data["r"] = "DATA_OK";
                } else {
                    $data["s"] = 0;
                    $data["r"] = "NOT_PROCESSING";
                }
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_CREATE_PAYOUT";
            }	
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_AVIABLE_TO_SEND_MONEY";
        }	
    } else {
        $UserSupport->addLog([
            'data' => $data,
            'unix_date' => time(),
        ],Unlimited\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }	
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

function sendPayout(array $data = null)
{
    require_once TO_ROOT .'/vendor/autoload.php';

    $Sdk = new \CapitalPayments\Sdk\Sdk(JFStudio\CapitalPayments::API_KEY,JFStudio\CapitalPayments::API_SECRET);

	$response = $Sdk->createPayout([
		'payout_id' => $data['payout_id'],
		'amount' => $data['amount'],
		'address' => $data['address'],
		'whatsapp' => (new Unlimited\UserContact)->getWhatsApp($data['user_login_id']),
		'name' => (new Unlimited\UserData)->getName($data['user_login_id']),
		'email' => (new Unlimited\UserLogin)->getEmail($data['user_login_id'])
	]);

	if ($response['status'] ?? false == JFStudio\CapitalPayments::STATUS_200) {
		return $response['payout'];
	} 

	return false;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 