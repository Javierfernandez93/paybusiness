<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$BuyPerUser = new Unlimited\BuyPerUser;
$buys = $BuyPerUser->findAll("amount = ? AND catalog_payment_method_id = ? AND status = ?",[20,7,2],["user_login_id","amount"]);

if($buys)
{
    foreach($buys as $buy)
    {
        $MembershipPerUser = new Unlimited\MembershipPerUser;
        
        if($MembershipPerUser->loadWhere("user_login_id = ? AND catalog_membership_id = ?",[$buy['user_login_id'],1]))
        {
            echo "cambiandolo para {$buy['user_login_id']}\n";

            $MembershipPerUser->amount = 0;
            $MembershipPerUser->save();
        }

        // if(!$MembershipPerUser->findField("user_login_id = ? AND catalog_membership_id = ?",[$buy['user_login_id'],1],"membership_per_user_id"))
        // {
        //     echo "Creandolo para {$buy['user_login_id']}\n";

        //     Unlimited\BuyPerUser::addMembership([
        //         'point' => $buy['amount'],
        //         'catalog_membership_id' => 1,
        //         'user_login_id' => $buy['user_login_id'],
        //     ]);
        // }
    }
}   

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 