<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{	
    if($membership = $UserLogin->getCurrentMembership())
    {
        $data['membership'] = $membership;
        $data['r'] = 'DATA_OK';
	    $data['s'] = 1;
    } else {
        $data['r'] = 'NOT_MEMBERSHIP';
	    $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 