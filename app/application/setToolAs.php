<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    endWebServiceWithUnauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

if(!isset($data['tool_id'])) {
    endWebServiceWithError(Constants::RESPONSES['NOT_PARAM']);
}

if(!(new Site\Tool)->find($data['tool_id'])->updateStatus($data['status'])) {
    endWebServiceWithError('NOT_TOOL');
}

endWebServiceWithSuccess(null);