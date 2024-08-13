<?php define('TO_ROOT', '../../');

require_once TO_ROOT. '/system/core.php';

$data = HCStudio\Util::getHeadersForWebService();

if($data['email'])
{
    $UserLogin = new Site\UserLogin;

    if($UserLogin->isUniqueMail($data['email']))
    {
        if($UserLogin->isUniqueLanding($data['user_account']['landing']))
        {
            if($user_login_id = $UserLogin->doSignup($data))
            {
                $secret = Site\UserLogin::updateSecret($data['email']);

                JFStudio\EmailManager::getInstance('es')->dispatch('welcome',[
                    'email' => $data['email'],
                    'names' => $data['names'],
                    'password' => $data['password'],
                    'secret' => $secret
                ]);

                if(sendPushUser($user_login_id,$data['names'])) {
                    $data['push_sent'] = true;
                }

                if(sendPushSponsor($data['referral']['user_login_id'],$data['names'])) {
                    $data['push_sponsor_sent'] = true;
                }

                // if($UserLogin->login($data['email'],sha1($data['password'])))
                if(true)
                {
                    $data['s'] = 1;
                    $data['r'] = 'LOGGED_OK';
                } else {
                    $data['s'] = 0;
                    $data['r'] = 'NOT_LOGGED';
                }
            } else {
                $data['s'] = 0;
                $data['r'] = 'ERROR_ON_SIGNUP';
            }
        } else {
            $data['s'] = 0;
            $data['r'] = 'USER_NAME_EXIST';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'MAIL_ALREADY_EXISTS';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'NOT_FIELD_SESSION_DATA';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 