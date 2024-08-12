<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $filter = "AND package.catalog_package_type_id = '{$data['catalog_package_type_id']}'";

    $BuyPerUser = new Site\BuyPerUser;

    if($data['catalog_package_type_id'] == Site\CatalogPackageType::PAY_BUSINESS) {

        $membership = (new Site\MembershipPerUser)->getCurrentMembership($UserLogin->company_id);

        if($membership)
        {
            if(isset($membership['package_id']) && $membership['package_id'] > 0)
            {
                $package = (new Site\Package)->findRow("package_id = ?",$membership['package_id']);
        
                if($package)
                {
                    $data['currentAmount'] = $package['amount'];
                    $filter .= " AND package.order_id >= '{$package['package_id']}'";
                }
            }
        }
    }

    if($data['catalog_package_type_id'] == Site\CatalogPackageType::PAY_BUSINESS)
    {
        $catalog_membership_id = Site\MembershipPerUser::getNextMembershipPackage($UserLogin->company_id);

        if($catalog_membership_id)
        {
            $filter .= " AND package.catalog_membership_id >= '{$catalog_membership_id}'";
        }
    }

    if($packages = (new Site\Package)->getAllWithProducts($filter))
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