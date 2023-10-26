<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$vcard_per_user_id = HCStudio\Util::getVarFromPGS("vpulid");

if($vcard_per_user_id === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/home/not_found");
}

$VCardPerUser = new Unlimited\VCardPerUser;

if($VCardPerUser->loadWhere("vcard_per_user_id = ?",$vcard_per_user_id) == false)
{
	HCStudio\Util::redirectTo(TO_ROOT."/apps/home/not_found");
}

$Layout = JFStudio\Layout::getInstance();

$Layout->init("VCard",Unlimited\VCardPerUser::getViewPathFile($vcard_per_user_id),"blank-preview","",TO_ROOT."/",TO_ROOT."/".Unlimited\VCardPerUser::getViewPath($VCardPerUser->getId()));

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(
	array_merge(['vcarduser.vue.js'],(new Unlimited\Template)->getScripts($VCardPerUser->template_id))
);

Unlimited\VisitPerVCard::addVisit($VCardPerUser->getId());

$TagPerVCard = new Unlimited\TagPerVCard;

if($tags = $TagPerVCard->getAll($VCardPerUser->getId()))
{
	$Layout->setTags($tags);
}

$Layout->setVar([
	'MetaPerSheet' => new Unlimited\MetaPerSheet,
	'vcard_per_user_id' => $vcard_per_user_id,
]);
$Layout();