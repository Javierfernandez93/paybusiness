<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{	
    if($data['whatsapp_campaign_id'])
    {
        if($campaign = (new Unlimited\WhatsAppCampaign)->getSingle($data['whatsapp_campaign_id']))
        {
            $data['campaign'] = $campaign;
            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        } else {
            $data['r'] = 'NOT_SCHEDULES';
            $data['s'] = 0;
        }
    } else {
        $data['r'] = 'NOT_WHATSAPP_CAMPAIGN_ID';
        $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 