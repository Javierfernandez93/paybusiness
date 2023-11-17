<?php

namespace Unlimited;

use HCStudio\Orm;

class CatalogMembership extends Orm {
	protected $tblName = 'catalog_membership';

	const FIRST_MEMBERSHIP_ID = 1;
	public function __construct() {
		parent::__construct();
	}
	
	public function getNextMembership(int $catalog_membership_id = null) {
		if(!isset($catalog_membership_id))
		{
			return false;
		}

		$catalog_membership_id += 1;
		
		$catalogMembership = $this->findRow("catalog_membership_id = ?",$catalog_membership_id);

		if(!$catalogMembership)
		{
			return false;
		}

		return $catalogMembership;
	}

	public function getCatalogMembershipId(int $package_id = null) {
		if(!isset($package_id))
		{
			return false;
		}

		return $this->connection()->field("
				SELECT
					{$this->tblName}.{$this->tblName}_id
				FROM 
					{$this->tblName}
				WHERE  
					{$this->tblName}.package_id = '{$package_id}'
		");
	}
}