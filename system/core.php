<?php

function autoloadCore($className) {
	$className = ltrim($className, '\\');
	$fileName  = __DIR__ . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR;

	if ($lastNsPos = strrpos($className, '\\'))
	{
		$namespace = substr($className, 0, $lastNsPos);
		$className = substr($className, $lastNsPos + 1);
		$fileName  .= str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
	}
	$fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';

	if(stream_resolve_include_path($fileName)) require_once($fileName);
}


# Registramos autoload
spl_autoload_register('autoloadCore');

# Registramos timezone
date_default_timezone_set('America/Mexico_City');

# Aplicacion en producccion?
define('__DEBUG__', false);
define('LANGUAGE', 'spanish');

#
if(!__DEBUG__) {
	ini_set('error_reporting', E_ALL ^ E_NOTICE);
	ini_set('display_errors', '1');
} else ini_set('display_errors', '0');

require_once Constants::ROOT."/vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(Constants::ROOT);
$dotenv->load();

/* main_function */
function debug($var = null,$clean_ob = true) : void
{
	if(isset($var) === true)
	{
		if($clean_ob === true)
		{
			ob_clean();
		}

		echo "<pre>";print_r($var);die;
	}
}

function d($var = null,$clean_ob = null) : void
{
	debug($var,$clean_ob);
}


function endWebServiceWithErrorCode(int $code, string $response = null,array $additional_data = null,bool $logger = false) : void {
	printWebServiceResponse([ 's' => 0, 'r' => $response ?? 'ERROR' ], $additional_data);
	if ($logger) {
		monolog($response, $additional_data, Monolog\Level::Error);
	}
	http_response_code($code);
	die;
}

function endWebServiceWithUnauthorized(string $response = null,array $additional_data = null,bool $logger = false) : void {
	endWebServiceWithErrorCode(401, $response, $additional_data, $logger);
}

function endWebServiceWithBadRequest(string $response = null,array $additional_data = null,bool $logger = false) : void {
	endWebServiceWithErrorCode(400, $response, $additional_data, $logger);
}

function endWebServiceWithNotFound(string $response = null,array $additional_data = null,bool $logger = false) : void {
	endWebServiceWithErrorCode(404, $response, $additional_data, $logger);
}

function endWebServiceWithError(string $response = null,array $additional_data = null,bool $logger = false) : void {
	endWebServiceWithErrorCode(200, $response, $additional_data, $logger);
}

function validateCronCredentials()
{
	if(!isset($_SERVER['USERNAME']) || !isset($_SERVER['PASSWORD'])) {
		return false;
	}
	
	return ($_SERVER['USERNAME'] == $_ENV['USERNAME'] && $_SERVER['PASSWORD'] == $_ENV['PASSWORD']);
}

function endWebServiceWithSuccess(string $response = null,array $additional_data = null,bool $logger = false) : void {
	printWebServiceResponse([ 's' => 1, 'r' => $response ?? 'OK' ], $additional_data);
	if ($logger) {
		monolog($response, $additional_data, Monolog\Level::Info);
	}
	http_response_code(200);
	die;
}

function printWebServiceResponse(array $data = null,array $additional_data = null) : void {
	if (is_array($additional_data)) {
		$data = array_merge($data, $additional_data);
	}

	HCStudio\Util::setHeaders();
	
	echo json_encode(HCStudio\Util::compressDataForPhone($data)); 
}

function monolog(string $message,array $additional_data = null,Monolog\Level $type = Monolog\Level::Warning) : void {
	$log = new Monolog\Logger('core');
	$log->pushHandler(new Monolog\Handler\StreamHandler(__DIR__.'../../log/core.log', $type));

	$data = [
		'message' => $message,
		...$additional_data
	];

	$message = json_encode($data);

	switch($type){
		case Monolog\Level::Warning:
			$log->warning($message);
			break;
		case Monolog\Level::Error:
			$log->error($message);
			break;
		case Monolog\Level::Info:
		default:
			$log->info($message);
			break;
	}
}

function isDevelopment(): bool {
	return ($_ENV['APP_ENV'] ?? Environment::DEV) === Environment::DEV; 
}

function isProduction(): bool {
	return ($_ENV['APP_ENV'] ?? Environment::DEV) === Environment::PROD; 
}

function getTelegramMysqlConnection(): array {
	return [
		'host'     => $_ENV['MYSQL_HOSTNAME'],
		'user'     => $_ENV['MYSQL_ROOT_USER'],
		'password' => $_ENV['MYSQL_ROOT_PASSWORD'],
		'database' => 'app_telegram',
	];
}

function getFullPath(string $path): string {
	return $_ENV['PROJECT_PROTOCOL']."://".$_ENV['PROJECT_URL'].(isset($path) ? $path : "");
}

function printErrorFromCronjob()
{
	return [
        'PHP_AUTH_USER' => $_SERVER['PHP_AUTH_USER'] ?? 'none',
        'PHP_AUTH_PW' => $_SERVER['PHP_AUTH_PHP_AUTH_PW'] ?? 'none',
        'CURRENT_IP' => HCStudio\Util::getIP() ?? 'none'
    ];
}