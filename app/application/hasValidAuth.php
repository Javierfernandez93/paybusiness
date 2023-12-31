<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    if(isset($data['key']) === true)
    {
        if((new Unlimited\AuthorizationPerUser)->hasValidAuth($data['key'])) 
        {
            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_VALID';
        }		   
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_KEY_ID';
    }	   
} else {
    $data['status'] = Unlimited\UserApiCodes::INVALID_CREDENTIALS;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));