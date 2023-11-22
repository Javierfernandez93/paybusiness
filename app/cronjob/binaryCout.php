<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getVarFromPGS();

$MembershipPerUser = new Unlimited\MembershipPerUser;
$CatalogCommission = new Unlimited\CatalogCommission;
$CatalogMembership = new Unlimited\CatalogMembership;
$UserLogin = new Unlimited\UserLogin(false,false);

$users = $MembershipPerUser->findAll("status = ? AND take = ?",[1,0]);

echo "<pre>";

if($users)
{
    foreach($users as $user)
    {
        if($UserLogin->_isQualified($user['user_login_id']))
        {
            if($binary_points = $UserLogin->_getBinaryPoints($user['user_login_id']))
            {
                if($binary_points)
                {
                    if($network = Unlimited\UserLogin::getNetworkToPay($binary_points))
                    {
                        foreach($network['pay']['users'] as $user_from)
                        {
                            Unlimited\CommissionPerUser::addBinaryCommission([
                                'catalog_commission_id' => $CatalogMembership->findField("catalog_membership_id = ?",[$user_from['catalog_membership_id']],"catalog_commission_id"),
                                'user_login_id' => $user['user_login_id'],
                                'user_login_id_from' => $user_from['user_login_id'],
                                'membership_per_user_id' => $user_from['membership_per_user_id'],
                                'amount' => $user_from['point'],
                                'percentaje' => $network['pay']['percentaje'],
                            ]);
                        }
    
                        if(isset($network['pass']))
                        {
                            foreach($network['pass']['users'] as $user_from)
                            {
                                Unlimited\CommissionPerUser::addBinaryCommission([
                                    'catalog_commission_id' => $CatalogMembership->findField("catalog_membership_id = ?",[$user_from['catalog_membership_id']],"catalog_commission_id"),
                                    'user_login_id' => $user['user_login_id'],
                                    'user_login_id_from' => $user_from['user_login_id'],
                                    'membership_per_user_id' => $user_from['membership_per_user_id'],
                                    'status' => -2,
                                    'amount' => 0,
                                    'percentaje' => $network['pay']['percentaje'],
                                ]);
                            }
                        }
                    }
                }
            }
        }
    }
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));