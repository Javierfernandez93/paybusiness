<?php

namespace Unlimited;

use HCStudio\Orm;

class Banner extends Orm {
  protected $tblName  = 'banner';

  public function __construct() {
    parent::__construct();
  }
}