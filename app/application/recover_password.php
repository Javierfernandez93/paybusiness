<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if(!isset($data["email"]))
{
    endWebServiceWithError('NOT_PARAM');
}

$UserLogin = new Site\UserLogin;

if($UserLogin->isUniqueMail($data['email']))
{
    endWebServiceWithError('NOT_FOUND_MAIL');
}

$token = Site\UserLogin::generateTokenByParams([
    'time' => time(),
    'email' => $data['email']
]);

if(!$token) {
    endWebServiceWithError('NOT_TOKEN');
}

JFStudio\EmailManager::getInstance($data['language'] ?? JFStudio\Translator::DEFAULT_LANGUAGE)->dispatch('recoverPassword',[
    "email" => $data['email'],
    "token" => $token
]);

endWebServiceWithSuccess();