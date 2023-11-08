<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Home;

$Layout->init(JFStudio\Router::getName($route),'countdown',"countdown",'',TO_ROOT.'/');

$Translator = JFStudio\Translator::getInstance();
$Translator->init();

$Layout->setScript([
	'countdown.css',
	'countdown.vue.js'
]);

$Layout->setVar([
	'UserLogin' => new Unlimited\UserLogin,
	'Translator' => $Translator
]);
$Layout();