<?php

namespace Unlimited;

use HCStudio\Orm;

class UserKyc extends Orm {
  protected $tblName  = 'user_kyc';

  const NOT_UPLOADED = 0;
  const PENDING = 1;
  const INCOMPLETE =-1;
  const PASS = 2;

  public function __construct() {
    parent::__construct();
  }
  
  public static function approbeKyc(int $user_kyc_id = null) : bool
  {
    if(!isset($user_kyc_id))
    {
      return false;
    }

    $UserKyc = new self;
    
    if(!$UserKyc->loadWhere("user_kyc_id = ?",$user_kyc_id))
    {
      return false;
    }

    $UserKyc->status = self::PASS;
    $UserKyc->aprobation_date = time();
    
    return $UserKyc->save();
  }
  
  public static function rejectKyc(array $data = null) : bool
  {
    if(!isset($data))
    {
      return false;
    }

    $UserKyc = new self;
    
    if(!$UserKyc->loadWhere("user_kyc_id = ?",$data['user_kyc_id']))
    {
      return false;
    }

    $UserKyc->feedback = $data['feedback'];
    $UserKyc->status = self::INCOMPLETE;
    
    return $UserKyc->save();
  }

  public function getKyCForAprobation(string $filter = null) : array|bool
  {
    if(!isset($filter))
    {
      return false;
    }

    return $this->connection()->rows("
      SELECT
        {$this->tblName}.{$this->tblName}_id,
        {$this->tblName}.document_front,
        {$this->tblName}.document_back,
        {$this->tblName}.selfie,
        {$this->tblName}.dni,
        {$this->tblName}.feedback,
        {$this->tblName}.status,
        {$this->tblName}.create_date,
        user_data.names
      FROM 
        {$this->tblName}
      LEFT JOIN 
        user_data 
      ON 
        user_data.user_login_id =  {$this->tblName}.user_login_id
        {$filter}
    ");
  }
}