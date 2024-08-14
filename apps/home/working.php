<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php";


$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Working;
$Layout->init(JFStudio\Router::getName($route),'working',"working",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'working.vue.js'
]);

$Layout->setVar([
	'route' =>  $route
]);
$Layout();