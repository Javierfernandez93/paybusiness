<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

if(date("Y-m-d H:i:s") < '2023-11-08 19:00:00')
{
	
}

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