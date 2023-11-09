<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    if(isset($data['user_kyc_id']))
    {
        if($UserSupport->rejectKyc([
            'feedback' => $data['feedback'],
            'user_kyc_id' => $data['user_kyc_id']
        ]))
        {
            $data["status"] = Unlimited\UserKyc::INCOMPLETE;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 1;
            $data["r"] = "NOT_APPROBED";
        }
    } else {
        $data["s"] = 1;
        $data["r"] = "NOT_DATA";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode($data);