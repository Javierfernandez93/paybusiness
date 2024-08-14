<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if(!isset($data['secret']) || !isset($data['email'])) {
    endWebServiceWithError(Constants::RESPONSES['NOT_PARAM']);
}

$UserLogin = new Site\UserLogin(false,false);

if(!$UserLogin->isValidSecretForValidateEmail($data['secret'],$data['email'])) {
    endWebServiceWithError(Constants::RESPONSES['NOT_VALID_SECRET']);
}

if(!$UserLogin->updateAsVerified([
    'secret' => $data['secret'],
    'email' => $data['email']
])) {
    endWebServiceWithError('NOT_UPDATE_AS_VERIFIED');
}

if(!$UserLogin->loginWithMemory()) {
    endWebServiceWithError('NOT_LOGIN_WITH_MEMORY');
} 

endWebServiceWithSuccess();