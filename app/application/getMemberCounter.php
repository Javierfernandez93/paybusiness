<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{	
    $UserLogin->insertFirstRange();

    $data["profile"] = [
        'code' => $UserLogin->code,
        'user_login_id' => $UserLogin->company_id,
        'verified' => $UserLogin->isVerified(),
        'names' => $UserLogin->_data['user_data']['names'],
        'range' => $UserLogin->getRange(),
        'image' => $UserLogin->_data['user_account']['image'] ? $UserLogin->_data['user_account']['image'] : HCStudio\Connection::getMainPath()."/src/img/user.png",
    ];

    if($members = $UserLogin->getNetworkCount())
    {
        $data['members'] = $members;
        $data['r'] = 'DATA_OK';
	    $data['s'] = 1;
    } else {
        $data['r'] = 'NOT_MEMBERS';
	    $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 