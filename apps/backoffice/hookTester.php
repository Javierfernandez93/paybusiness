<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";


// $res = Evox\HookManager::sendHook([
// 	'hook_url' => 'https://cpipn.auiro.com/capital-payments/handle-webhook',
// 	'api_key' => 'pE5jheozAG1LlST9',
// 	'ipn_secret' => '13laJWQToqku5dctv',
// 	'status' => 100,
// 	'invoice_id' => 1260
// ]);

// $HookManagerState = Evox\HookManagerStates::ORDER_PAID;

// $res = Evox\HookManager::sendHook([
//     'hook_url' => 'https://cpipn.auiro.com/capital-payments/handle-webhook',
// 	'api_key' => 'pE5jheozAG1LlST9',
// 	'ipn_secret' => '13laJWQToqku5dctv',
//     'invoice_id' => 1296,
//     'status' => $HookManagerState->value,
//     'message' => $HookManagerState->label()
// ]);

$HookManagerState = Evox\HookManagerStates::ORDER_CANCELED;

$res = Evox\HookManager::sendHook([
    'hook_url' => 'https://cpipn.auiro.com/capital-payments/handle-webhook',
	'api_key' => 'pE5jheozAG1LlST9',
	'ipn_secret' => '13laJWQToqku5dctv',
    'invoice_id' => 1297,
    'status' => $HookManagerState->value,
    'message' => $HookManagerState->label()
]);

d($res);