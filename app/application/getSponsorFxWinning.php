<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    if($data['landing'])
    {
        $data['catalog_broker_id'] = isset($data['catalog_broker_id']) ? $data['catalog_broker_id'] : Unlimited\CatalogBroker::BRIDGE;
        
        if($account = (new Unlimited\UserBridgeAccount)->get($UserLogin->company_id,$data['catalog_broker_id']))
        {
            if($landing = (new Unlimited\LandingPerUser)->getUserLanding(strtolower($data['landing'])))
            {
                if($sponsor = (new Unlimited\UserLogin(false,false))->getUser($landing['user_login_id']))
                {
                    $data["account"] = $account;
                    $data["sponsor"] = array_merge($sponsor,$landing);
                    $data["s"] = 1;
                    $data["r"] = "DATA_OK";
                } else {
                    $data['r'] = "NOT_SPONSOR";
                    $data['s'] = 0;
                }
            } else {
                $data['r'] = "NOT_USERS";
                $data['s'] = 0;
            }
        } else {
            $data['r'] = "NOT_ACCOUNT";
            $data['s'] = 0;
        }
    } else {
        $data['r'] = "NOT_LANDING";
        $data['s'] = 0;
    }
} else {
    $data['r'] = "INVALID_CREDENTIALS";
    $data['s'] = 0;
}

echo json_encode($data);