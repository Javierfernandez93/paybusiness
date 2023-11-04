<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

HCStudio\Util::redirectTo("../../apps/login");

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Home;

$Layout->init(JFStudio\Router::getName($route),'index',"index",'',TO_ROOT.'/');

$Translator = JFStudio\Translator::getInstance();
$Translator->init();

$Layout->setScript([
	'home.css',
	'home.vue.js'
]);

$Layout->setVar([
	'UserLogin' => new Unlimited\UserLogin,
	'Translator' => $Translator
]);
$Layout();