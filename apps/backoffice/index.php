<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/login/");
}

// (new Unlimited\UserReferral)->truncate();

// $UserLogin->insertReferralOnSide([
// 	'user_login_id' => 2,
// 	'side' => Unlimited\UserReferral::LEFT
// ]);
// // $UserLogin->insertReferralOnSide([
// // 	'user_login_id' => 3,
// // 	'side' => Unlimited\UserReferral::RIGHT
// // ]);

// for($i = 4; $i < 52; $i++) 
// {
// 	$UserLogin->insertReferralOnSide([
// 		'user_login_id' => $i,
// 		'side' => Unlimited\UserReferral::LEFT
// 	]);
// }

// die;
// d($UserLogin->getBinaryTree());

$UserLogin->checkRedirection();

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Backoffice;
$Layout->init(JFStudio\Router::getName($route),'index',"backoffice",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'chart.js',
	'telegram.css',
	'banner.css',
	'backoffice.css',
	'backoffice.vue.js',
]);

$Layout->setVar([
	'route' =>  $route,
	'setApp' =>  true,
	'UserLogin' => $UserLogin
]);
$Layout();