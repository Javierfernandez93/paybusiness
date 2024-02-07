<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{	
    $limit_to_activate_pay_academy = $UserLogin->getDaysExpired('pay_academy');

    $data['productPermissions'] = [
        'pay_academy' => $UserLogin->hasProductPermission('pay_academy'),
        'pay_business' => $UserLogin->hasProductPermission('pay_business'),
        'limit_to_activate_pay_academy' => $limit_to_activate_pay_academy < 0 && $limit_to_activate_pay_academy > -6
    ];
    $data['r'] = 'DATA_OK';
	$data['s'] = 1;
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 