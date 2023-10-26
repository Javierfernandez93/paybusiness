<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    try {
        if($UserApi->setTestInvoiceAsPayed($data))
        {
            $data['status'] = Unlimited\UserApiCodes::DATA_OK;
            $data['message'] = Unlimited\UserApiCodes::DATA_OK->label();
        } else {
            $data['status'] = Unlimited\UserApiCodes::ERROR_AT_SEND_TEXT_INVOICE_AS_PAYED;
            $data['message'] = Unlimited\UserApiCodes::ERROR_AT_SEND_TEXT_INVOICE_AS_PAYED->label();
        }
    } catch (Exception $e) {
        $data['status'] = $e->getMessage();
    }
} else {
    $data['status'] = Unlimited\UserApiCodes::INVALID_CREDENTIALS;
    $data['message'] = Unlimited\UserApiCodes::INVALID_CREDENTIALS->label();
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));