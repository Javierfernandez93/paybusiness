<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    $pass = $UserLogin->isActive();
    
    if(!$pass)
    {
        $UserSupport = new Unlimited\UserSupport;
        
        if($UserSupport->logged)
        {
            $pass = $UserSupport->hasPermission('transfer_money_full_permission');
        }
    }

    if($pass)
    {
        if($data['recipientAdress'])
        {
            if($data['amountToSend'] > 0)
            {
                if($wallet = (new BlockChain\Wallet)->findRow("public_key = ?",$data['recipientAdress']))
                {
                    if($Wallet = BlockChain\Wallet::getWallet($UserLogin->company_id,$data['wallet_kind_id']))
                    {
                        if($Wallet->wallet_kind_id == $wallet['wallet_kind_id'])
                        {
                            $message = $data['message'] ?? '';
                            
                            try {
                                if($transaction_per_wallet_id = $Wallet->createTransaction($data['recipientAdress'],$data['amountToSend'],BlockChain\Transaction::prepareData(['@optMessage'=>$message]),true,BlockChain\Transaction::TRANSACTION_FEE))
                                {
                                    $data["s"] = 1;
                                    $data["r"] = "SAVE_OK";
                                } else {
                                    $data["s"] = 0;
                                    $data["r"] = "NOT_TRANSACTION_PER_WALLET_ID";
                                }
                            } catch (Exception $e) {
                                $data["s"] = 0;
                                $data["r"] = $e->getMessage();
                            }
                        } else {
                            $data["s"] = 0;
                            $data["r"] = "INVALID_WALLET_ADDRESS_KIND";
                        }
                    } else {
                        $data["s"] = 0;
                        $data["r"] = "NOT_EWALLET";
                    }
                } else {
                    $data["s"] = 0;
                    $data["r"] = "NOT_AMOUNT_TO_SEND";
                }
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_AMOUNT_TO_SEND";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_RECIPIENTADRESS";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_ACTIVE";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 