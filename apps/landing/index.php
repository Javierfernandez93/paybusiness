<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$landing = HCStudio\Util::getVarFromPGS('landing');

if($landing)
{
	if($user_login_id = (new Unlimited\UserAccount)->getIdByLanding($landing))
	{
		HCStudio\Util::redirectTo(Unlimited\UserLogin::_getLanding($user_login_id));
	}
}