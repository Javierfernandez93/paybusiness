<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/login/");
}

$UserLogin->checkRedirection();

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Legal;
$Layout->init(JFStudio\Router::getName($route),'index',"backoffice",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'chart.js',
	'telegram.css',
	'banner.css',
	'backoffice.css',
]);

$Layout->setVar([
	'route' =>  $route,
	'setApp' =>  true,
	'file' =>  HCStudio\Util::getParam("f"),
	'UserLogin' => $UserLogin
]);
$Layout();