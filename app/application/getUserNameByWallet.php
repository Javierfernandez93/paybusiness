<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
    if($data['wallet'])
    {
        if($Wallet = BlockChain\Wallet::getWalletByPublicKey($data['wallet']))
        {
            if($names = (new Site\UserData)->getNames($Wallet->user_login_id))
            {
                 $data['names'] = $names;
                 $data['r'] = 'DATA_OK';
                 $data['s'] = 1;
            } else {
                $data['r'] = 'NOT_NAME';
                $data['s'] = 0;
            }
        } else {
            $data['r'] = 'NOT_WALLET';
            $data['s'] = 0;
        }
    } else {
        $data['r'] = 'NOT_WALLET';
        $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 