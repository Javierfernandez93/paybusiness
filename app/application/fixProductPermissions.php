<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$BuyPerUser = new Site\BuyPerUser;
$buys = $BuyPerUser->findAll("amount = ? AND status = ?",[300,2],["user_login_id","amount"]);

if($buys)
{
    foreach($buys as $buy)
    {
        $ProductPermission = new Site\ProductPermission;
        
        if($ProductPermission->loadWhere("user_login_id = ? AND product_id = ? AND status = ?",[$buy['user_login_id'],1,1]))
        {
            $ProductPermission->end_date = strtotime("+335 days",$ProductPermission->create_date);
            $ProductPermission->save();
        }
        
        if($ProductPermission->loadWhere("user_login_id = ? AND product_id = ? AND status = ?",[$buy['user_login_id'],2,1]))
        {
            $ProductPermission->end_date = strtotime("+335 days",$ProductPermission->create_date);
            $ProductPermission->save();
        }

        // if(!$MembershipPerUser->findField("user_login_id = ? AND catalog_membership_id = ?",[$buy['user_login_id'],1],"membership_per_user_id"))
        // {
        //     echo "Creandolo para {$buy['user_login_id']}\n";

        //     Site\BuyPerUser::addMembership([
        //         'point' => $buy['amount'],
        //         'catalog_membership_id' => 1,
        //         'user_login_id' => $buy['user_login_id'],
        //     ]);
        // }
    }
}   

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 