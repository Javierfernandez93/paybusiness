<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getVarFromPGS();

if($user_ranges = (new Unlimited\CatalogRangePerUser)->findAll("status = ?",[1]))
{
    foreach($user_ranges as $user_range)
    {
        $range = Unlimited\UserLogin::getLastRange($user_range['user_login_id']);
        $nextRange = Unlimited\UserLogin::_getNextRange($user_range['user_login_id']);

        if($range)
        {
            $range['currentAmount'] = Unlimited\UserLogin::_getCurrentMembershipAmount($user_range['user_login_id']);
  
            if($range['currentAmount'] >= $range['end_volumen'])
            {
                $catalog_commission_id = (new Unlimited\CatalogCommission)->findField("amount = ? AND catalog_commission_type_id = ? AND status = ?",[$nextRange['amount'],Unlimited\CatalogCommissionType::RANGE_BONUS_ID,1],"catalog_commission_id");

                if($catalog_commission_id)
                {
                    Unlimited\CatalogRangePerUser::expireRange($range['catalog_range_per_user_id']);
    
                    Unlimited\CatalogRangePerUser::insertRange([
                        'user_login_id' => $user_range['user_login_id'],
                        'catalog_range_id' => $nextRange['catalog_range_id']
                    ]);
                    
                    Unlimited\CommissionPerUser::addCommissionRange([
                        'package_id' => 0,
                        'buy_per_user_id' => 0,
                        'catalog_commission_id' => $catalog_commission_id,
                        'user_login_id' => $user_range['user_login_id'],
                        'user_login_id_from' => $user_range['user_login_id'],
                        'amount' => $nextRange['amount'],
                    ]);
                }
            }
        }
    }
}


echo json_encode(HCStudio\Util::compressDataForPhone($data));