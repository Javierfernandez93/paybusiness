<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin(false,false);
$MembershipPerUser = new Unlimited\MembershipPerUser;

$memberships = $MembershipPerUser->getMembershipsPaybusinessForDelete();

if($memberships)
{
    foreach($memberships as $membership)
    {
        if($membership['amount_total'] >= $membership['target'])
        {
            if(Unlimited\MembershipPerUser::isReadyToExpireBinary($membership['fill_date']))
            {
                $binary_points = $UserLogin->_getBinaryPoints($membership['user_login_id']);
                    
                if($binary_points)
                {
                    $users = array_merge($binary_points['start']['users'],$binary_points['end']['users']);
    
                    foreach($users as $user_from)
                    {
                        Unlimited\MembershipPerUser::setAsTake([
                            'user_login_id' => $membership['user_login_id'],
                            'membership_per_user_id' => $user_from['membership_per_user_id']
                        ]);
    
                        Unlimited\MembershipPerUser::setOldMembershipAsTaked([
                            'sponsor_id' => $membership['user_login_id'],
                            'user_login_id' => $user_from['user_login_id']
                        ]);
                    }
    
                    Unlimited\MembershipPerUser::setMembershipAsEnd($membership['membership_per_user_id']);
                }   
            }
        }
    }
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 