<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$BuyPerUser = new Unlimited\BuyPerUser;
$ProductPermission = new Unlimited\ProductPermission;

$product_permissions = $ProductPermission->findAll("status = ? AND product_id = ?",[1,2]);

if($product_permissions)
{
    foreach($product_permissions as $product_permission)
    {
        $buy = $BuyPerUser->findRow("user_login_id = ? AND amount = ? AND status = ?",[$product_permission['user_login_id'],240,2]);
        
        if($buy)
        {
            $product_permission_id = $ProductPermission->findField("user_login_id = ? AND product_id = ?",[$product_permission['user_login_id'],2],"product_permission_id");

            if($product_permission_id)
            {
                updateSuscription([
                    'product_permission_id' => $product_permission_id,
                    'approved_date' => $buy['approved_date'],
                ]);
            }
        }   
    }
}

function updateSuscription(array $data = null)
{
    $ProductPermission = new Unlimited\ProductPermission;
    
    if($ProductPermission->loadWhere("product_permission_id = ?",[$data['product_permission_id']]))
    {
        $ProductPermission->end_date = strtotime("+1 year",$data['approved_date']);

        return $ProductPermission->save();
    }

    return false;
}


echo json_encode(HCStudio\Util::compressDataForPhone($data)); 