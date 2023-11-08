<?php
/**
 * Created by PhpStorm.
 * User: imal365
 * Date: 9/12/17
 * Time: 10:39 AM
 */

namespace Treinetic\ImageArtist\lib\Helpers;


class ImageHelper
{
    public function createTransparentTemplate(float $width,float $height){
 
        $copy = imagecreatetruecolor((int)$width,(int)$height);
        $color = imagecolorallocatealpha($copy, 0, 0, 0, 127);
        imagefill($copy, 0, 0, $color);
        imagesavealpha($copy, true);
        return $copy;
    }
}