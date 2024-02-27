<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    $filter = "AND package.catalog_package_type_id = '{$data['catalog_package_type_id']}'";

    $BuyPerUser = new Unlimited\BuyPerUser;

    if($data['catalog_package_type_id'] == Unlimited\CatalogPackageType::PAY_ACADEMY)
    {
        $buy = $BuyPerUser->getLastBuyByType($UserLogin->company_id, Unlimited\CatalogPackageType::PAY_ACADEMY);

        $data['currentAmount'] = $buy['amount'];
        $filter .= " AND package.order_id >= '{$buy['items'][0]['order_id']}'";
    } else if($data['catalog_package_type_id'] == Unlimited\CatalogPackageType::PAY_BUSINESS) {
        $buy = $BuyPerUser->getLastBuyByType($UserLogin->company_id, Unlimited\CatalogPackageType::PAY_BUSINESS);

        $data['currentAmount'] = $buy['amount'];
        $filter .= " AND package.order_id >= '{$buy['items'][0]['order_id']}'";
    }

    if($data['catalog_package_type_id'] == Unlimited\CatalogPackageType::PAY_BUSINESS)
    {
        $catalog_membership_id = Unlimited\MembershipPerUser::getNextMembershipPackage($UserLogin->company_id);

        if($catalog_membership_id)
        {
            $filter .= " AND package.catalog_membership_id <= '{$catalog_membership_id}'";
        }
    }

    if($packages = (new Unlimited\Package)->getAllWithProducts($filter))
    {
        $data['packages'] = $packages;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_PACKAGES";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 