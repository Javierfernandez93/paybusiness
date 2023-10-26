<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    $TransactionRequirementPerUser = new Unlimited\TransactionRequirementPerUser;

    if(in_array($data['status'],[Unlimited\TransactionRequirementPerUser::PENDING,Unlimited\TransactionRequirementPerUser::EXPIRED,Unlimited\TransactionRequirementPerUser::VALIDATED,Unlimited\TransactionRequirementPerUser::DELETED]))
    {
        $data['filter'] = " WHERE transaction_requirement_per_user.status = '".$data['status']."'";
    }
    
    if($transactions = $TransactionRequirementPerUser->getTransactions(($data['filter'])))
    {
        $data["transactions"] = $transactions;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data['r'] = "NOT_TRANSACTIONS";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 