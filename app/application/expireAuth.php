<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    if(isset($data['key']) === true)
    {
        if(Unlimited\AuthorizationPerUser::expireAuth($data['key']))
        {
            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_TOKEN';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_DOCUMENTATION_ID';
    }	   
} else {
    $data['status'] = Unlimited\UserApiCodes::INVALID_CREDENTIALS;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));