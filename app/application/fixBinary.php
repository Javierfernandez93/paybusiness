<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$create_date = strtotime(date("2024-03-04 00:00:00"));
$catalog_commission_id = 7;

$commissions = (new Site\CommissionPerUser)->connection()->rows("SELECT * FROM commission_per_user where create_date > {$create_date} AND catalog_commission_id >= {$catalog_commission_id}");
// $commissions = (new Site\CommissionPerUser)->connection()->rows("SELECT * FROM commission_per_user where create_date > {$create_date} AND catalog_commission_id >= {$catalog_commission_id}

//     and user_login_id = 12
//     and user_login_id_from = 170
// ");

if($commissions)
{
    $CommissionPerUser = new Site\CommissionPerUser;
    $MembershipPerUser = new Site\MembershipPerUser;
    $TransactionPerWallet = new BlockChain\TransactionPerWallet;

    $users = [];
    
    foreach($commissions as $commission)
    {
        echo "User {$commission['user_login_id']}  ";

    
        if($commission['membership_per_user_id'])
        {
            if($commission['membership_per_user_id'])
            {
                $MembershipPerUser->loadWhere("membership_per_user_id = ?",$commission['membership_per_user_id']);
            } else {
                $MembershipPerUser->loadWhere("user_login_id = ?",[$commission['user_login_id_from']]);
            }

            if($MembershipPerUser->getId())
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
                            
                            // if(true)
                            if($MembershipPerUser->save())
                            {
                                echo " MembershipPerUser {$commission['membership_per_user_id']} has been updated -";

                                if($CommissionPerUser->loadWhere("commission_per_user_id = ?",$commission['commission_per_user_id']))
                                {
                                    $CommissionPerUser->status = -1;
                                    
                                    // if(true)
                                    if($CommissionPerUser->save())
                                    {
                                        echo " CommissionPerUser {$commission['commission_per_user_id']} has been updated -";

                                        if($commission['transaction_per_wallet_id'])
                                        {
                                            if($TransactionPerWallet->loadWhere("transaction_per_wallet_id = ?",$commission['transaction_per_wallet_id']))
                                            {
                                                $TransactionPerWallet->status = -1;
                                                
                                                // if(true)
                                                if($TransactionPerWallet->save())
                                                {
                                                    $users[$commission['user_login_id']] += $commission['amount'];
                                                    echo " TransactionPerWallet {$commission['transaction_per_wallet_id']} has been updated\n";    
                                                }
                                            }
                                        } else {
                                            echo " TransactionPerWallet {$commission['transaction_per_wallet_id']} not found\n";    
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
        } else {
            echo " MembershipPerUser {$commission['membership_per_user_id']} not found \n";
        }
    }
}

echo array_sum($users);
d($users);

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 