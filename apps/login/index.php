<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Unlimited\UserLogin;

if(date("Y-m-d H:i:s") < '2023-11-08 19:00:00')
{
    // HCStudio\Util::redirectTo("../../apps/home/countdown");
}

if($UserLogin->logged === true) {
    HCStudio\Util::redirectTo(TO_ROOT."/apps/backoffice/");
}

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Login;
$Layout->init(JFStudio\Router::getName($route),'index',"two_columns",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
    'login.css',
    'login.vue.js'
]);

$Layout->setVar([
	'UserLogin' => $UserLogin,
    'company_name' => Unlimited\SystemVar::_getValue('company_name')
]);
$Layout();