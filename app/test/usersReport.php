<?php define("TO_ROOT", "../../");
require_once TO_ROOT. "system/core.php";

use BlockChain\WalletKind;
use Site\MembershipPerUser;
use Site\UserLogin;
use BlockChain\Wallet;

$memberships = (new MembershipPerUser)->getAllMemberships();

$filter = " AND user_login.user_login_id IN (".implode(',',$memberships).")";
$users = (new UserLogin(false,false))->getAllUsersData($filter);

if(!$users) {
    endWebServiceWithError('NOT_USERS');
}

$_data = [];

// set eleemnt at first position
$_data[] = [
    'user_login_id' => 'ID de usuario',
    'names' => 'Nombre de usuario',
    'email' => 'Correo electrónico',
    'sponsor_names' => 'Nombre de patrocinador',
    'balance_alternative' => 'Balance W. Alt.',
    'balance_main' => 'Balance W. Principal',
];

foreach($users as $key => $user) {
    $WalletAlternative = Wallet::getWallet($user['user_login_id'],WalletKind::USDT_NOWITHDRAWABLE);
    $WalletMain = Wallet::getWallet($user['user_login_id'],WalletKind::USDT_TRC20);

    $_data[] = [
        'user_login_id' => $user['user_login_id'],
        'names' => $user['names'],
        'email' => $user['email'],
        'sponsor_names' => $user['sponsor_names'],
        'balance_alternative' => $WalletAlternative->getBalance(),
        'balance_main' => $WalletMain->getBalance(),
    ];
}


saveFile($_data);

function saveFile($data) {
    header("Content-Disposition: attachment; filename=\"report.xls\"");
    header("Content-Type: application/vnd.ms-excel;");
    header("Pragma: no-cache");
    header("Expires: 0");

    $out = fopen("php://output", 'w');
    
    foreach ($data as $value) {
        fputcsv($out, $value,"\t");
    }
    fclose($out);
}