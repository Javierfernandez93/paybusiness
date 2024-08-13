<?php

namespace JFStudio;

use JFStudio\Layout;

use Site\CatalogMailController;
use Site\EmailLogger;

use \Exception;

class Mailer
{
    const DEFAULT_LAYOUT = 'mail';
    const DEFAULT_VIEW = 'mail';
    const DEFAULT_CATALOG_MAIL_CONTROLLER_ID = 1;

    public static function send(array $data = null,int $catalog_mail_controller_id = self::DEFAULT_CATALOG_MAIL_CONTROLLER_ID) : bool
    {
        $pass = true;

        if(!isset($data)) {
            return false;
        }

        if(isset($data['logger'])) {
            $exist = (new EmailLogger)->findField("user_login_id = ? AND email_id = ?",[$data['logger']['user_login_id'],$data['logger']['email_id']],"email_logger_id");

            if($exist)
            {
                $pass = false;
            }
        }
            
        if(!$pass) {
            return true;
        }

        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $data['layout'] = isset($data['layout']) ? $data['layout'] : self::DEFAULT_LAYOUT;
            $data['view'] = isset($data['view']) ? $data['view'] : self::DEFAULT_VIEW;

            $Layout = Layout::getInstance();
            $Layout->init("",$data['view'],$data['layout'],TO_ROOT.'/apps/mail/',TO_ROOT.'/');

            $Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
            $Layout->setScript(['']);

            $CatalogMailController = CatalogMailController::init($catalog_mail_controller_id ?? self::DEFAULT_CATALOG_MAIL_CONTROLLER_ID,$data['vars']['language'] ?? 'es');

            $Layout->setVar($data['vars']);

            $mail->SMTPDebug = \PHPMailer\PHPMailer\SMTP::DEBUG_OFF; 
            $mail->isSMTP(); 

            $mail->Host = $CatalogMailController->host;
            $mail->SMTPAuth = true; 
            $mail->Username = $CatalogMailController->mail;
            $mail->Password =  $CatalogMailController->password;
            $mail->SMTPSecure =  $CatalogMailController->protocol;
            // $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; 
            $mail->Port = $CatalogMailController->port; 

            //Recipients
            $mail->setFrom($CatalogMailController->mail, $CatalogMailController->sender);
            $mail->addAddress($data['vars']['email'], $data['vars']['names'] ?? 'user');    

            //Content
            $mail->isHTML(true);                                  
            $mail->CharSet = 'UTF-8';
            $mail->Subject = $data['subject'];
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());
            
            $send = $mail->send();

            if($send)
            {
                if(isset($data['logger']))
                {
                    EmailLogger::add([
                        'user_login_id' => $data['logger']['user_login_id'],
                        'email_id' => $data['logger']['email_id']
                    ]);
                }

                return true;
            }
        } catch (Exception $e) {
            d($e);
            return false;
        }
    }
}