<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    if(isset($data['dni']))
    {
        if($UserLogin->sendDni($data['dni']))
        {
            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_SENT';
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_DNI";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 