<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$create_date = strtotime(date("2024-03-04 00:00:00"));
$catalog_commission_id = 7;

$commissions = (new Unlimited\CommissionPerUser)->connection()->rows("SELECT * FROM commission_per_user where create_date > {$create_date} AND catalog_commission_id >= {$catalog_commission_id}");

if($commissions)
{
    $CommissionPerUser = new Unlimited\CommissionPerUser;
    $MembershipPerUser = new Unlimited\MembershipPerUser;
    $TransactionPerWallet = new BlockChain\TransactionPerWallet;

    foreach($commissions as $commission)
    {
        echo "User {$commission['user_login_id']}  ";

        if($commission['transaction_per_wallet_id'])
        {
            if($commission['membership_per_user_id'])
            {
                if($MembershipPerUser->loadWhere("membership_per_user_id = ?",$commission['membership_per_user_id']))
                {
                    $take = HCStudio\Util::isJson($MembershipPerUser->take) ? json_decode($MembershipPerUser->take,true) : [];
                    
                    // finding user_login_id in $take array
    
                    if($take)
                    {
                        if(in_array($commission['user_login_id'],$take))
                        {
                            echo "User {$commission['user_login_id']} has been found in take ";
    
                            $key = array_search($commission['user_login_id'],$take);
    
                            if($key !== false)
                            {
                                echo " found in take";
        
                                unset($take[$key]);
        
                                $take = array_values($take);
        
                                $MembershipPerUser->take = json_encode($take);
                                
                                if($MembershipPerUser->save())
                                {
                                    echo " MembershipPerUser {$commission['membership_per_user_id']} has been updated -";
    
                                    if($TransactionPerWallet->loadWhere("transaction_per_wallet_id = ?",$commission['transaction_per_wallet_id']))
                                    {
                                        $TransactionPerWallet->status = -1;
                                        
                                        if($TransactionPerWallet->save())
                                        {
                                            echo " TransactionPerWallet {$commission['transaction_per_wallet_id']} has been updated\n";    
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                echo " MembershipPerUser {$commission['membership_per_user_id']} not found\n";
            }
        } else {
            echo " TransactionPerWallet {$commission['transaction_per_wallet_id']} not found\n";
        }
    }
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 