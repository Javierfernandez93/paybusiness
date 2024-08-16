<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "system/core.php";

$users = (new Site\UserLogin(false,false))->getAllUsersData();

if(!$users) {
    endWebServiceWithError('NOT_USERS');
}

d($users);