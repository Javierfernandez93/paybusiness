<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Evox\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('list_mam'))
    {
        $data['status'] = $data['status'] ?? Evox\BuyPerBridge::PENDING;

        if($buys = (new Evox\BuyPerBridge)->getAll($data['status']))
        {
            $data['buys'] = $buys;
            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_BUYS';
        }		
    } else {
        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }		
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 