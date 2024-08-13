<?php

namespace JFStudio;

use JFStudio\Translator;
use Site\Parser;    
use JFStudio\Mailer;
use \Exception;
use Site\CatalogMailController;

class EmailManager 
{
    protected static $instance = null;
    public $Translator = null;
    
	public static function getInstance(string $language = Translator::DEFAULT_LANGUAGE)
 	{
	    if(self::$instance instanceof self === false) {
	      self::$instance = new self($language);
	    }

	    return self::$instance;
 	}

    public function __construct(string $language = Translator::DEFAULT_LANGUAGE)
    {
        $this->Translator = Translator::getInstance($language);
    }

    public function getEmailTemplateData(string $status,array $data = []) : array
    {
        return match($status) {
            'welcome' => [
                'view' => 'welcome',
                'subject' => Parser::doParser($this->Translator->t('email.welcome'),$data),
            ],
            'academyPayment' => [
                'view' => 'academyPayment',
                'subject' => Parser::doParser($this->Translator->t('email.academyPayment'),$data),
            ]
        };
    }

    public function getEmailTemplate(string $email_name,array $data = [])
    {
        if(!$email_name)
        {
            throw new Exception('Email name is required');
        }

        $email_template = $this->getEmailTemplateData($email_name,$data);

        if(!$email_template)
        {
            throw new Exception('Email template not found');
        }
        
        return $email_template;
    }

    public function dispatch(string $email_name,array $data = [],int $catalog_mail_controller_id = CatalogMailController::DEFAULT_CATALOG_MAIL_CONTROLLER_ID)
    {
        if(!$email_name) {
            throw new Exception('Email name is required');
        }

        $email_template = self::getEmailTemplate($email_name,$data);

        return Mailer::send([
            'view' => $email_template['view'],
            'subject' => $email_template['subject'],
            'vars' => [
                ...['Translator' => $this->Translator],
                ...$data
            ],
        ],$catalog_mail_controller_id);
    }
}