<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    if($memberships = $UserLogin->getMemberships())
    {
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
        $data["memberships"] = $memberships;
    } else {
        $data["s"] = 0;
        $data["r"] = "NO_MEMBERSHIPS";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 