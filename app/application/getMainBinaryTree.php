<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $data["profile"] = [
        'code' => $UserLogin->code,
        'user_login_id' => $UserLogin->company_id,
        'active' => $UserLogin->hasProductPermission('pay_business'),
        'names' => $UserLogin->_data['user_data']['names'],
        'landing' => $UserLogin->_data['user_account']['landing'],
        'image' => $UserLogin->_data['user_account']['image'] ? $UserLogin->_data['user_account']['image'] : HCStudio\Connection::getMainPath()."/src/img/user.png",
    ];
      
    if($team = $UserLogin->getBinaryTree())
    {
        $data['frontals'] = $UserLogin->getFrontalUsers();
        $data["team"] = $team;
        // d($data);
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_TEAM";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 