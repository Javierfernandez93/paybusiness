<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getVarFromPGS();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('add_ewallet_transaction') === true)
    {
        if($data['address'])
        {
            if($data['amount'])
            {
                if($data['wallet_id'] = (new BlockChain\Wallet)->getWalletIdByPublicKey($data['address']))
                {
                    $message = 'By admin';
                    
                    if(send($data['wallet_id'],$data['amount'],$message))
                    {
                        $data['s'] = 1;
                        $data['r'] = "DATA_OK";
                    } else {
                        $data['s'] = 0;
                        $data['r'] = "NOT_SEND"; 
                    }
                } else {
                    $data['s'] = 0;
                    $data['r'] = "NOT_WALLET_FOUND"; 
                }
            } else {
                $data['s'] = 0;
                $data['r'] = "NOT_AMOUNT";
            }
        } else {
            $data['s'] = 0;
            $data['r'] = "NOT_ADDRESS";
        }
    } else {
        $UserSupport->addLog([
            'transaction' => json_encode(['address'=>$data['address'],'amount'=>$data['amount']]),
            'unix_date' => time(),
        ],Unlimited\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }
} else {
    $data['s'] = 0;
    $data['r'] = "INVALID_CREDENTIALS";
}

function send(int $wallet_id = null,float $amountToSend = null,string $message = null)
{
    if($ReceiverWallet = BlockChain\Wallet::getWalletByWalletId($wallet_id))
    {
        if($amountToSend)
        {
            $Wallet = BlockChain\Wallet::getWallet(BlockChain\Wallet::MAIN_EWALLET);
            
            if($transaction_per_wallet_id = $Wallet->createTransaction($ReceiverWallet->public_key,$amountToSend,BlockChain\Transaction::prepareData(['@optMessage'=>$message]),true))
            {
                return $transaction_per_wallet_id;
            } 
        } 
    } 
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 