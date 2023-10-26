<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    $data['catalog_broker_id'] = isset($data['catalog_broker_id']) ? $data['catalog_broker_id'] : null;
     
    if($userAccounts = (new Unlimited\UserBridgeAccount)->getAllFromUser($UserLogin->company_id,$data['catalog_broker_id']))
    {
        $data['userAccounts'] = $userAccounts;
        $data['s'] = 1;
        $data['r'] = 'DATA_OK';
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_ACCOUNTS';
    }		
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 