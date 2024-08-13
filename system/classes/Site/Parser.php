<?php

namespace Site;

class Parser {
    public static function existArg(string $text = null, string $arg = null) : bool
    {   
        return strpos($text, "{{{$arg}}}") !== false;
    }

    public static function doParser(string $text = null,array $args = null,bool $validateArgs = true) : string
    {
        foreach ($args as $key => $arg)
        {
            if(isset($arg))
            {
                if($validateArgs)
                {
                    if(self::existArg($text,$key))
                    {
                        $text = str_replace("{{{$key}}}",$arg,$text);
                    }
                } else {
                    $text = str_replace("{{{$key}}}",$arg,$text);
                }
            }
        }
        
        return $text;
    }

    public static function parserArray(array $data = null) : string
    {
        $temp = [];

        foreach($data as $key => $value)
        {
            if($value)
            {
                $temp[] = "{$key} : {$value}";
            }
        }


        return implode(PHP_EOL,$temp);
    }

    public static function parserMultidimensionalArray(array $data = null) : string
    {
        $temp = [];

        foreach($data as $array)
        {
            if($array)
            {
                $temp[] = self::parserArray($array);
            }
        }

        return implode(PHP_EOL,$temp);
    }


    public static function do(string $text = null,array $args = null) : string
    {
        foreach ($args as $key => $arg)
        {
            if(self::existArg($text,$key))
            {
                if(isset($key,$arg,$text))
                {
                    $text = str_replace("{{{$key}}}",$arg,$text);
                }
            }
        }

        return $text;
    }
}