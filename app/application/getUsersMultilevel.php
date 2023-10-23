<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Evox\UserLogin;

if($UserLogin->logged === true)
{
    if($multilevel = Evox\UserReferral::getNetworkData(10,$UserLogin->company_id))
    {   
        $data['getRanges'] = isset($data['getRanges']) ? filter_var($data['getRanges'], FILTER_VALIDATE_BOOL) : true;

        if($data['getRanges'])
        {
            $data["nextRange"] = (new Evox\CatalogRangePerUser)->getNextRange($UserLogin->company_id);
        }
        
        $BuyPerUser = new Evox\BuyPerUser;

        $data["multilevel"] = $BuyPerUser->appendActives($multilevel);
        $data["multilevel"] = Evox\CommissionPerUser::appendCommissionToNetwork($data['multilevel'],$UserLogin->company_id);

        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_MULTILEVEL";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 