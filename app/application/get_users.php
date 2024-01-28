<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    $filter = "";

    if($users = $UserSupport->getUsers($filter))
    {
        $data["users"] = format($users);
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data['r'] = "DATA_ERROR";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function format(array $users = null) : array 
{
    $Country = new World\Country;
    $UserKyc = new Unlimited\UserKyc;
    
    return array_map(function($user) use($Country,$UserKyc){
        $user['ewallets'] = [];
        $user['countryData'] = $Country->getCountryNameAndPhoneArea($user['country_id']);
        $user['kyc_approbed'] = $UserKyc->findField("user_login_id = ? AND status = ?",[$user['user_login_id'],Unlimited\UserKyc::PASS],"status") == 2;

        return $user;
    },$users);
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 