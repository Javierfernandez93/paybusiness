<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    $CommissionPerUser = new Unlimited\CommissionPerUser;
    
    $filter = '';

    if(isset($data['catalog_commission_id']))
    {
        $data['catalog_commission_id'] = implode(",",$data['catalog_commission_id']);
        $filter = "AND commission_per_user.catalog_commission_id IN ({$data['catalog_commission_id'] })";
    }

    if($data['months'] = $CommissionPerUser->_getProfitsByMonths($UserLogin->company_id,$filter))
    {
        if($income = $CommissionPerUser->getAllProfitsByMonths($data['months'],$UserLogin->company_id,$filter))
        {
            $data['income'] = $income;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_DATA";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_MONTHS";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 