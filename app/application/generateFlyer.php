<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    require_once TO_ROOT . "/vendor/autoload.php";

    $img = new \Treinetic\ImageArtist\lib\Image('../../src/img/mask.png');

    $size = Unlimited\UserLogin::USER_IMAGE_SIZE;
    
    $img2 = new \Treinetic\ImageArtist\lib\Image($UserLogin->_data['user_account']['image']);
    $img2->crop(0,0,$size,$size);

    $circle = new \Treinetic\ImageArtist\lib\Shapes\CircularShape($img2);

    $circle->build();

    $img = $img->merge($circle,($img->getWidth()-$circle->getWidth())/2,($img->getHeight() - $circle->getHeight())/2);

    $img->scale(70);

    $data['path'] = "../../src/files/img/user/flyer/{$UserLogin->company_id}.png";

    $img->save($data['path'],IMAGETYPE_PNG);

    $data['s'] = 1;
    $data['r'] = 'DATA_OK';
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 