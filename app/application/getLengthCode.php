<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Evox\UserLogin;

if($UserLogin->logged === true)
{
    for($i = 0; $i < Evox\AuthorizationPerUser::LENGTH_CODE; $i++)
    {
        $data['codes'][] = [
            'value' => null,
            'valid' => false,
        ];
    }

    $data['s'] = 1;
    $data['r'] = 'DATA_OK';   
} else {
    $data['status'] = Evox\UserApiCodes::INVALID_CREDENTIALS;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));