<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$route = HCStudio\Util::getVarFromPGS("route");

if($route === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/home/not_found");
}

$VCardPerUser = new Unlimited\VCardPerUser;

if($VCardPerUser->loadWhere("route = ?",$route) == false)
{
	HCStudio\Util::redirectTo(TO_ROOT."/apps/home/not_found");
}

$Layout = JFStudio\Layout::getInstance();

$Layout->init("VCard",Unlimited\VCardPerUser::getViewPathFile($VCardPerUser->getId()),"view","",TO_ROOT."/",TO_ROOT."/".Unlimited\VCardPerUser::getViewPath($VCardPerUser->getId()));

$Layout->setScriptPath(HCStudio\Connection::getMainPath() . '/src/');
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
	'Proyect' => $Proyect,
	'vcard_per_user_id' => $VCardPerUser->getId(),
]);
$Layout();