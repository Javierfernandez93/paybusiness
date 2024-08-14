<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$productsPermission = (new Site\ProductPermission)->findAll("product_id = ? AND status = ?",[2,1]);

// d($productsPermission);

foreach($productsPermission as $productPermission){
    $buys = (new Site\BuyPerUser)->findAll("user_login_id = ? AND status = ?",[$productPermission['user_login_id'],2]);

    if($buys)
    {
        foreach($buys as $buy){
            if($buy['amount'] == 240)
            {
                $ProductPermission = new Site\ProductPermission;
                
                if($ProductPermission->loadWhere("product_permission_id = ?",$productPermission['product_permission_id']))
                {
                    $ProductPermission->end_date = strtotime("+365 days",$productPermission['create_date']);
                    $ProductPermission->save();
                }
            }
        }
    }
}


echo json_encode(HCStudio\Util::compressDataForPhone($data)); 