<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php";

$UserSupport = new Site\UserSupport;

$data = HCStudio\Util::getHeadersForWebService();

if(($data['user'] != HCStudio\Util::USERNAME && $data['password'] != HCStudio\Util::PASSWORD) && !$UserSupport->logged) {
    endWebServiceWithUnauthorized();
}

if(!isset($data['invoice_id'])) {
    endWebServiceWithError(Constants::RESPONSES['NOT_PARAM']);
}

$BuyPerUser = new Site\BuyPerUser;

if(!$BuyPerUser->loadWhere('invoice_id = ?',$data['invoice_id'])) {	
    endWebServiceWithError('NOT_BUY_PER_USER');
}

if(!$BuyPerUser->isInvoicePending($data['invoice_id'] ?? false)) {
    endWebServiceWithError('NOT_PENDING');
}

$data['sendCommissions'] = isset($data['sendCommissions']) ? $data['sendCommissions'] : true;

try {
    Site\BuyPerUser::processPayment($BuyPerUser->getId(),$data['sendCommissions']);
} catch (\Exception $e) {
    endWebServiceWithError('PROCESS_PAYMENT',[
        'error' => $e->getMessage(),
    ],true);
}

$BuyPerUser->catalog_validation_method_id = $data['catalog_validation_method_id'];
$BuyPerUser->ipn_data = $data['ipn_data'] ?? '';
$BuyPerUser->approved_date = time();
$BuyPerUser->user_support_id = isset($data['user_support_id']) ? $data['user_support_id'] : $BuyPerUser->user_support_id;
$BuyPerUser->status = Site\BuyPerUser::VALIDATED;

$items = $BuyPerUser->unformatData();

if(!$BuyPerUser->save()) {
    endWebServiceWithError('NOT_UPDATE');
}

$response = JFStudio\EmailManager::getInstance('es')->dispatch('academyPayment',[
    'email' => (new Site\UserLogin)->getEmail($BuyPerUser->user_login_id),
    'company_name' => Site\SystemVar::_getValue("company_name"),
    'names' => (new Site\UserData)->getNames($BuyPerUser->user_login_id),
]);

endWebServiceWithSuccess(null,[
    'buy_per_user_id' => $BuyPerUser->getId(),
    'status' => $BuyPerUser->status,
    'mail_response' => $response ?? false,
]);