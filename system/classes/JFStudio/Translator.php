<?php

namespace JFStudio;

use JFStudio\Cookie;

use Site\Parser;

class Translator extends Parser
{
    public $ready = null;
    public $language = null;
    public $words = [];
    
    const LOAD_FROM_STORAGE = true;
    const ACCEPTED_LANGUAGES = ['en', 'es'];
    const DEFAULT_LANGUAGE = 'es';

	private static $instance;

	public static function getInstance(string $language = self::DEFAULT_LANGUAGE)
 	{
	    if(self::$instance instanceof self === false) {
	      self::$instance = new self($language);
	    }

	    return self::$instance;
 	}

	public function __construct(string $language = self::DEFAULT_LANGUAGE)
    {
        $this->init($language);
    } 

	public function __destruct() { }

	public function __clone() { }

    public function init(string $language = self::DEFAULT_LANGUAGE) {
        $this->getLanguage($language);
        $this->getWords();
    }

    public function changeLanguage(string $language = null) {
        $this->setLanguage($language);
        $this->init();
    }

    public function sanitizeLanguage(string $language = null) {
        return explode('-',$language)[0];
    }

    public function getWords() {
        if($this->words != null)
        {
            return $this->words;
        }
        
        $words = file_get_contents(getFullPath("src/languages/{$this->language}.json"));

        $this->words = json_decode($words, true);
    }


    public static function translate(string $word = null) {
        $Translator = self::getInstance();
        $Translator->getLanguage();
        $Translator->getWords();

        return $Translator->t($word);
    }
    
    public function getBrowserLanguage() {
        if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE']))
        {
            $language = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        } else {
            $language = 'es';
        }
        
        return in_array($language, self::ACCEPTED_LANGUAGES) ? $language : 'en';
    }

    public function getLanguage(string $language = self::DEFAULT_LANGUAGE) {
        $language = isset($language) ? $language : self::DEFAULT_LANGUAGE;
        $language = Cookie::get('language') ? Cookie::get('language') : $language;
        
        if($language == null)
        {
            $language = $this->sanitizeLanguage($this->getBrowserLanguage());
        }
        
        $this->setLanguage($language);

        return $this->language;
    }

    public function t(string $key,array $args = []) : string {
        return isset($this->words[$key]) ? self::doParser($this->words[$key],$args) : $key;
    }

    public function setLanguage($language) {
        $this->language = $language;
    }

    

    public function translateArray(array $data = null,array $fields = null) 
    {
        return array_map(function($row) use($fields){
            foreach($row as $key => $value)
            {
                if(in_array($key,$fields))
                {
                    if($value)
                    {
                        $row[$key] = $this->translatePharagraphFromString($value);
                    }
                }
            }

            return $row;
        },$data);
    }


    public function translatePharagraphFromString(string $word = null) {
        if(!$word)
        {
            return false;
        }
        
        return isset($this->words[$word]) && $word ? $this->words[$word] : $word;
    }

    public static function _translateArray(array $data = null,array $fields = null)
    {
        $Translator = self::getInstance();
        $Translator->changeLanguage($_COOKIE['language']);

        return $Translator->translateArray($data,$fields);
    }
}