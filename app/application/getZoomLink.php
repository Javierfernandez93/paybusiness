<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    $data["zoom_button_2"] = Unlimited\SystemVar::_getValue("zoom_button_2");
    $data["zoom_class_2"] = Unlimited\SystemVar::_getValue("zoom_class_2");
    $data["zoom_button_1"] = Unlimited\SystemVar::_getValue("zoom_button_1");
    $data["zoom_class_1"] = Unlimited\SystemVar::_getValue("zoom_class_1");
    
    $data["s"] = 1;
    $data["r"] = "DATA_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 