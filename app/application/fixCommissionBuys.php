<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$TransactionPerWallet = new BlockChain\TransactionPerWallet;
$CommissionPerUser = new Unlimited\CommissionPerUser;
$commissions = $CommissionPerUser->findAll("buy_per_user_id != ? AND status = ?",['',2]);

$BuyPerUser = new Unlimited\BuyPerUser;

if($commissions)
{
    foreach($commissions as $commission)
    {
        if($commission['buy_per_user_id'])
        {
            $catalog_payment_method_id = $BuyPerUser->findField('buy_per_user_id = ?',$commission['buy_per_user_id'],'catalog_payment_method_id');

            if($catalog_payment_method_id == Unlimited\CatalogPaymentMethod::EWALLET_PROTECTED)
            {
                $wallet_kind_id = $TransactionPerWallet->getWalletKindId($commission['transaction_per_wallet_id']);

                if($wallet_kind_id == 1)
                {
                    $TransactionPerWalletTemp = new BlockChain\TransactionPerWallet;

                    if($TransactionPerWalletTemp->loadWhere('transaction_per_wallet_id = ?',$commission['transaction_per_wallet_id']))
                    {
                        echo "{$wallet_kind_id} ID : {$commission['user_login_id']}  en revisión";

                        $TransactionPerWalletTemp->status = -1;
                        
                        if($TransactionPerWalletTemp->save())
                        {
                            if($new_transaction_per_wallet_id = send([
                                'user_login_id' => $commission['user_login_id'],
                                'message' => 'COMISIÓN',
                                'amount' => $commission['amount'],
                            ]))
                            {
                                echo " ok \n";

                                $CommissionPerUserTemp = new Unlimited\CommissionPerUser;
                                $CommissionPerUserTemp->loadWhere("commission_per_user_id = ?",$commission['commission_per_user_id']);
                                $CommissionPerUserTemp->transaction_per_wallet_id = $new_transaction_per_wallet_id;
                                $CommissionPerUserTemp->save();
                            }
                        }
                    }
                }
            }
        }
    }
}



function send(array $data = null)
{
    $wallet_kind_id = BlockChain\WalletKind::USDT_NOWITHDRAWABLE;

    if($ReceiverWallet = BlockChain\Wallet::getWallet($data['user_login_id'],$wallet_kind_id))
    {
        if($data['amount'])
        {
            $Wallet = BlockChain\Wallet::getWallet(BlockChain\Wallet::MAIN_EWALLET);

            if($transaction_per_wallet_id = $Wallet->createTransaction($ReceiverWallet->public_key,$data['amount'],BlockChain\Transaction::prepareData(['@optMessage'=>$data['message']]),true))
            {
                return $transaction_per_wallet_id;
            } 
        } 
    } 
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 