<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

$data['PHP_AUTH_USER'] = $data['PHP_AUTH_USER'] ?? false;
$data['PHP_AUTH_PW'] = $data['PHP_AUTH_PW'] ?? false;

if(($data['PHP_AUTH_USER'] == HCStudio\Util::USERNAME && $data['PHP_AUTH_PW'] == HCStudio\Util::PASSWORD) || $UserSupport->logged === true)
{
    $CommissionPerUser = new Site\CommissionPerUser;
    $MembershipPerUser = new Site\MembershipPerUser;
    $UserLogin = new Site\UserLogin(false,false);
    $BuyPerUser = new Site\BuyPerUser;
    
    $dispertions = [];
    
    if($commissions = $CommissionPerUser->getPendingCommissions())
    {
        foreach($commissions as $commission)
        {
            if($UserLogin->_hasProductPermission('pay_business',$commission['user_login_id']))
            {
                if($MembershipPerUser->_hasMembershipSpace($commission['user_login_id']))
                {
                    $message = 'COMISIÓN';
        
                    if($transaction_per_wallet_id = send([
                        'status' => $commission['status'],
                        'buy_per_user_id' => $commission['buy_per_user_id'],
                        'user_login_id' => $commission['user_login_id'],
                        'amount' => $commission['amount'],
                        'message' => $message,
                    ],$BuyPerUser))
                    {
                        $dispertions[] = $commission;
    
                        $CommissionPerUser::setCommissionAsDispersed($commission['commission_per_user_id'],$transaction_per_wallet_id);
        
                        sendPush($commission['user_login_id'],"Hemos dispersado $ ".number_format($commission['amount'],2)." USD a tu ewallet.",Site\CatalogNotification::GAINS);
                    }
                }
            }
        }
    }

    $data['dispertions'] = $dispertions;
    $data['s'] = 1;
    $data['r'] = "DATA_OK";
} else {
    $data['s'] = 0;
    $data['r'] = "INVALID_CREDENTIALS";
}

function sendPush(string $user_login_id = null,string $message = null,int $catalog_notification_id = null) : bool
{
    return Site\NotificationPerUser::push($user_login_id,$message,$catalog_notification_id,"");
}

function send(array $data = null,$BuyPerUser = null)
{
    $wallet_kind_id = $data['status'] == Site\CommissionPerUser::FROZEN ? BlockChain\WalletKind::USDT_NOWITHDRAWABLE : BlockChain\WalletKind::USDT_TRC20;

    if(isset($data['buy_per_user_id']) && $data['buy_per_user_id'] != 0)
    {
        $catalog_payment_method_id = $BuyPerUser->findField("buy_per_user_id = ?",$data['buy_per_user_id'],"catalog_payment_method_id");

        if($catalog_payment_method_id)
        {
            $wallet_kind_id = $catalog_payment_method_id == Site\CatalogPaymentMethod::EWALLET_PROTECTED ? BlockChain\WalletKind::USDT_NOWITHDRAWABLE : BlockChain\WalletKind::USDT_TRC20;
        }
    } else {
        $last_buy_pay_business = $BuyPerUser->getLastBuyByType($data['user_login_id'],Site\CatalogPackageType::PAY_BUSINESS);

        if($last_buy_pay_business)
        {
            $wallet_kind_id = $last_buy_pay_business['catalog_payment_method_id'] == Site\CatalogPaymentMethod::EWALLET_PROTECTED ? BlockChain\WalletKind::USDT_NOWITHDRAWABLE : BlockChain\WalletKind::USDT_TRC20;
        }
    }

    if($ReceiverWallet = BlockChain\Wallet::getWallet($data['user_login_id'],$wallet_kind_id))
    {
        if($data['amount'])
        {
            $Wallet = BlockChain\Wallet::getWallet(BlockChain\Wallet::MAIN_EWALLET);

            if($transaction_per_wallet_id = $Wallet->createTransaction($ReceiverWallet->public_key,$data['amount'],BlockChain\Transaction::prepareData(['@optMessage'=>$data['message']]),true))
            {
                return $transaction_per_wallet_id;
            } 
        } 
    } 
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 