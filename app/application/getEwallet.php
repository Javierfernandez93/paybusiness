<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
    $data['wallet_kind_id'] = isset($data['wallet_kind_id']) ? $data['wallet_kind_id'] : 1;

    if($data['wallet_kind_id'])
    {
        if($Wallet = BlockChain\Wallet::getWallet($UserLogin->company_id,$data['wallet_kind_id']))
        {
            $data['ewallet'] = $Wallet->data();
            $data['ewallet']['recipientAdress'] = '';
            $data['ewallet']['kind'] = (new BlockChain\WalletKind)->findRow("wallet_kind_id = ?",$data['ewallet']['wallet_kind_id']);
            $data['ewallet']['amount'] = $Wallet->getBalance();
            $data['ewallet']['link'] = (new Site\ShortUrl)->getLink($Wallet);
            $data['ewallet']['holder'] = $UserLogin->getNames();
            $data['ewallet']['addressLenght'] = BlockChain\Wallet::ADDRESS_LENGTH;

            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        } else {
            $data['r'] = 'NOT_WALLET';
            $data['s'] = 1;
        }
    } else {
        $data['r'] = 'NOT_WALLET_KIND_ID';
        $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 