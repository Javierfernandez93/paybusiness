<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Evox\UserLogin;

if($UserLogin->logged === true)
{
    if($classes = (new Evox\VideoClass)->getAllByCatalog($data['catalog_video_class_id']))
    {
        $data['title'] = (new Evox\CatalogVideoClass)->getType($data['catalog_video_class_id']);
        $data['classes'] = $classes;
        $data['s'] = 1;
        $data['r'] = 'DATA_OK';
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_CLASSES';
    }		
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 