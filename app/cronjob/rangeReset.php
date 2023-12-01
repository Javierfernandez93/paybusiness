<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getVarFromPGS();

$CatalogRangePerUser = new Unlimited\CatalogRangePerUser;

$catalog_ranges = $CatalogRangePerUser->findAll("status IN(?,?)",[1,2],["catalog_range_per_user_id"]);

if($catalog_ranges)
{
    foreach($catalog_ranges as $catalog_range)
    {
        if($CatalogRangePerUser->loadWhere("catalog_range_per_user_id = ?",$catalog_range['catalog_range_per_user_id']))
        {
            $CatalogRangePerUser->status = 3;

            if($CatalogRangePerUser->save())
            {
                Unlimited\CatalogRangePerUser::insertFirstRange([
                    'catalog_range_id' => Unlimited\CatalogRange::FIRST_RANGE_ID,
                    'user_login_id' => $CatalogRangePerUser->user_login_id,
                ]);
            }
        }
    }
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));