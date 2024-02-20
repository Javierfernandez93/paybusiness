<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    $pay_businesss = $UserLogin->hasProductPermission(Unlimited\Product::PAY_BUSINESS);
    $pay_academy = $UserLogin->hasProductPermission(Unlimited\Product::PAY_ACADEMY);

	$BuyPerUser = new Unlimited\BuyPerUser;

	if($pay_businesss)
	{
		$buy = $BuyPerUser->getLastBuyByType($UserLogin->company_id, Unlimited\CatalogPackageType::PAY_BUSINESS);

		$data['activations'][] = $buy['items'][0]['id'];
	}

	if($pay_academy)
	{
		$buy = $BuyPerUser->getLastBuyByType($UserLogin->company_id, Unlimited\CatalogPackageType::PAY_ACADEMY);

		$data['activations'][] = $buy['items'][0]['id'];
	}

	$data['active'] = $pay_businesss;
    $data["s"] = 1;
	$data["r"] = "DATA_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode($data);