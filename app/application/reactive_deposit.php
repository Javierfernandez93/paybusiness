<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    $CatalogPlan = new Unlimited\CatalogPlan;

    if($data['transaction_requirement_per_user_id'])
    {
        $TransactionRequirementPerUser = new Unlimited\TransactionRequirementPerUser;
        
        if($TransactionRequirementPerUser->isAviableToReactive($data['transaction_requirement_per_user_id']))
        {
            if($TransactionRequirementPerUser->loadWhere('transaction_requirement_per_user_id = ?',$data['transaction_requirement_per_user_id']))
            {
                $TransactionRequirementPerUser->status = Unlimited\TransactionRequirementPerUser::PENDING;

                if($TransactionRequirementPerUser->save())
                {
                    $data["s"] = 1;
                    $data["r"] = "DATA_OK";
                } else {
                    $data['r'] = "NOT_UPDATE_TRANSACTION_REQUIREMENT_PER_USER";
                    $data['s'] = 0;
                }
            } else {
                $data['r'] = "NOT_TRANSACTION_REQUIREMENT_PER_USER";
                $data['s'] = 0;
            }
        } else {
            $data['r'] = "NOT_AVIABLE_TO_REACTIVE";
            $data['s'] = 0;
        }
    } else {
        $data['r'] = "NOT_TRANSACTION_REQUIREMENT_PER_USER_ID";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 