<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$link = HCStudio\Util::getVarFromPGS('link');

if($link)
{
	if((new Unlimited\ShortUrl)->existCode($link)) {
		Unlimited\ShortUrl::redirectToUrlByCode($link);
	}
}