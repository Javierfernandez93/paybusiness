<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$ProductPermission = new Unlimited\ProductPermission;

$product_permissions = $ProductPermission->findAll("status = ?",1);

if($product_permissions)
{
    foreach($product_permissions as $product_permission)
    {
        $payBusiness = $ProductPermission->findRow("user_login_id = ? AND product_id = ?",[$product_permission['user_login_id'],1]);
        
        if($payBusiness)
        {
            $user_login_id = $ProductPermission->findField("user_login_id = ? AND product_id = ?",[$product_permission['user_login_id'],2],"user_login_id");

            if(!$user_login_id)
            {
                createPayAcademyFree($payBusiness);
            }
        }   
    }
}

function createPayAcademyFree($payBusiness)
{
    $ProductPermission = new Unlimited\ProductPermission;

    $ProductPermission->loadArray([
        'user_login_id' => $payBusiness['user_login_id'],
        'product_id' => 2,
        'status' => 1,
        'create_date' => $payBusiness['create_date'],
        'end_date' => $payBusiness['end_date']
    ]);

    return $ProductPermission->save();
}


echo json_encode(HCStudio\Util::compressDataForPhone($data)); 