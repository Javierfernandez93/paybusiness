<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    if($data['company_id'])
    {
        if($network = (new Unlimited\UserReferral)->getNetworkReverseReferral(-1,$data['company_id']))
        {
            if($first_active_user_login_id = (new Unlimited\MembershipPerUser)->getFirstActive($network))
            {
                $data["user"] = $UserSupport->getUser($first_active_user_login_id);
                
                $data["s"] = 1;
                $data["r"] = "DATA_OK";
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_ACTIVE";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_NETWORK";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_USER_LOGIN_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 