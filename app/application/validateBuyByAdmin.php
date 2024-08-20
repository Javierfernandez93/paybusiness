<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    endWebServiceWithUnauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

if(!isset($data['invoice_id'])) {
    endWebServiceWithError(Constants::RESPONSES['NOT_PARAM']);
}

if(!$UserSupport->hasPermission('delete_payment'))  {
    endWebServiceWithError(Constants::RESPONSES['NOT_PERMISSION']);
}

$url = getFullPath("app/application/validateBuy.php"); 
$data['sendCommissions'] = isset($data['sendCommissions']) ? filter_var($data['sendCommissions'],FILTER_VALIDATE_BOOL) : true;

$Curl = new JFStudio\Curl;
$Curl->post($url, [
    'user' => HCStudio\Util::USERNAME,
    'password' => HCStudio\Util::PASSWORD,
    'invoice_id' => $data['invoice_id'],
    'catalog_validation_method_id' => Site\CatalogValidationMethod::ADMINISTRATOR,
    'sendCommissions' => $data['sendCommissions'],
    'user_support_id' => $UserSupport->getId(),
]);

$response = $Curl->getResponse(true);

if(!$response) {
    endWebServiceWithError(Constants::RESPONSES['NOT_RESPONSE']);
}

endWebServiceWithSuccess(null,[
    'response' => $response,
]);