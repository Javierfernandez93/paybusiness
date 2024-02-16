<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$MembershipPerUser = new Unlimited\MembershipPerUser;
$users = $MembershipPerUser->findAll("point = ? AND status = ?",[0,1]);

// tomo usuarios
// verifico si tienen compra gratis con ese puntaje
// verifico si genero comision
// elimino comisión de tabla y blockchain

if($users)
{
    foreach($users as $user)
    {
        $BuyPerUser = new Unlimited\BuyPerUser;
        
        $buy = $BuyPerUser->findRow("user_login_id = ? AND amount = ? AND catalog_payment_method_id = ? AND status = ?",[$user['user_login_id'],20,7,2]);

        if($buy)
        {
            $CommissionPerUser = new Unlimited\CommissionPerUser;
            
            if($commissions = $CommissionPerUser->findAll("user_login_id_from = ? AND catalog_commission_id = ? AND status = ?",[$user['user_login_id'],7,2]))
            {
                if($commissions)
                {
                    foreach($commissions as $commission)
                    {
                        $CommissionPerUser = new Unlimited\CommissionPerUser;

                        if($CommissionPerUser->loadWhere("commission_per_user_id = ?",$commission['commission_per_user_id']))
                        {
                            $CommissionPerUser->status = -1;

                            if($CommissionPerUser->save())
                            {
                                if($commission['transaction_per_wallet_id'])
                                {
                                    $TransactionPerWallet = new BlockChain\TransactionPerWallet;
                                    
                                    if($TransactionPerWallet->loadWhere('transaction_per_wallet_id = ?',$commission['transaction_per_wallet_id']))
                                    {
                                        $TransactionPerWallet->status = 0;
                                        $TransactionPerWallet->save();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}   

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 