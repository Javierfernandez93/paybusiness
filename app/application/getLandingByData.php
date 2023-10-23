<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($data['path'])
{
    if($data['landing'])
    {
        if($landing = (new Evox\Landing)->getLandingByPath($data['path']))
        {
            if($user_login_id = (new Evox\UserAccount)->getIdByLanding($data['landing']))
            {
                $data['userData'] = [
                    'landing' => $data['landing'],
                    'whatsApp' => (new Evox\UserContact)->getWhatsApp($user_login_id),
                    'names' => (new Evox\UserData)->getNames($user_login_id),
                ];
                
                $landing['content'] = Evox\Parser::doParser($landing['content'],$data['userData']);
            }

            $data['landing'] = $landing;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_DATA";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_LANDING_PER_USER_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 