<?php

namespace BlockChain;

use HCStudio\Orm;

class WalletKind extends Orm
{
	protected $tblName = 'wallet_kind';

	public $BlockChain = null;
	public $balance = null;

	const USDT_TRC20 = 1;
	const USDT_NOWITHDRAWABLE = 2;

	public function __construct() 
	{
		parent::__construct('blockchain');
	}
}