<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$MembershipPerUser = new Site\MembershipPerUser;

$memberships = $MembershipPerUser->getAllMembershipsPaybusiness();

if($memberships)
{
    foreach($memberships as $membership)
    {
        if($membership['amount_total'] >= $membership['target'])
        {
            $MembershipPerUserTemp = new Site\MembershipPerUser;

            if($MembershipPerUserTemp->loadWhere("membership_per_user_id = ?", $membership['membership_per_user_id']))
            {
                if(!$MembershipPerUserTemp->fill_date)
                {
                    $MembershipPerUserTemp->fill_date = time();
                    $MembershipPerUserTemp->status = Site\MembershipPerUser::FILLED;
                    $MembershipPerUserTemp->save();

                    $data['memberships'][] = $membership['membership_per_user_id'];
                }
            }
        }
    }
}


echo json_encode(HCStudio\Util::compressDataForPhone($data)); 