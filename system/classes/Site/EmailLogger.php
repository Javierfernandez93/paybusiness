<?php

namespace Site;

use HCStudio\Orm;

class EmailLogger extends Orm {
	protected $tblName = 'email_logger';

	public function __construct() {
		parent::__construct();
	}

	public static function add(array $data = null) : bool
	{
		if(!isset($data))
		{
			return false;
		}

		$EmailLogger = new self;
		$EmailLogger->user_login_id = $data['user_login_id'];
		$EmailLogger->email_id = $data['email_id'];
		$EmailLogger->create_date = time();
		
		return $EmailLogger->save();
	}
}
