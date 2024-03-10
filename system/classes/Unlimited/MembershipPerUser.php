<?php

namespace Unlimited;

use HCStudio\Orm;
use HCStudio\Util;
use Unlimited\CatalogMembership;
use Unlimited\CommissionPerUser;

class MembershipPerUser extends Orm {
	protected $tblName = 'membership_per_user';

	const END = 2;
	const FILLED = 0;
	const DAYS_TO_EXPIRE_BINARY = 5;
	public function __construct() {
		parent::__construct();
	}

	public static function getDaysToExpireBinary(int $fill_date = null)
	{
		if(!isset($fill_date))
		{
			return false;
		}

		$fill_date = date('Y-m-d H:i:s',$fill_date);
		$fill_date = new \DateTime($fill_date);
		$now = new \DateTime(date('Y-m-d H:i:s'));

		$interval = $now->diff($fill_date);

		$days_to_expire = self::DAYS_TO_EXPIRE_BINARY - $interval->days;

		return $days_to_expire > 0 ? $days_to_expire : 0;
	}

	public static function getNextMembershipPackage(int $user_login_id = null) 
	{
		$MembershipPerUser = new self;
		
		$currentMembership = $MembershipPerUser->getCurrentMembership($user_login_id);

		if(!$currentMembership)
		{
			return CatalogMembership::FIRST_MEMBERSHIP_ID;
		}

		$CatalogMembership = new CatalogMembership;
		$catalogMembership = $CatalogMembership->findRow("catalog_membership_id  = ?",$currentMembership['catalog_membership_id']);
			
		if(!$catalogMembership)
		{
			return false;
		}

		if($currentMembership['target'] >= $catalogMembership['target'])
		{
			$catalogMembership = $CatalogMembership->getNextMembership($currentMembership['catalog_membership_id']);

			if(!$catalogMembership)
			{
				return false;
			}
			
			return $catalogMembership['catalog_membership_id'];
		}

		return false;
	}
	
	public function hasAmountExtra(int $user_login_id = null) 
	{
		if(!$user_login_id)
		{
			return false;
		}

		$membership = $this->getCurrentMembership($user_login_id);

		if(!$membership)
		{
			return false;
		}

		return $membership['amount'] >= $membership['target'];
	}

	public static function addPoints(array $data = null) 
	{
		if(!$data)
		{
			return false;
		}

		$MembershipPerUser = new self;
		
		if(!$MembershipPerUser->loadWhere("user_login_id = ? AND status = ?",[$data['user_login_id'],1]))
		{
			return false;
		}
		
		$CatalogMembership = new CatalogMembership;
		$catalogMembership = $CatalogMembership->findRow("catalog_membership_id  = ?",$MembershipPerUser->catalog_membership_id);

		if(!$catalogMembership)
		{
			return false;
		}

		$amountAux = $MembershipPerUser->amount + $data['amount'];

		if($amountAux >= $catalogMembership['target'])
		{
			$MembershipPerUser->amount = $catalogMembership['target'];
			$MembershipPerUser->amount_extra = $amountAux - $catalogMembership['target'];

			// todo set filled if not exist
			if(!$MembershipPerUser->fill_date)
			{
				$MembershipPerUser->fill_date = time();
				$MembershipPerUser->status = self::FILLED;
			}
		} else {
			$MembershipPerUser->amount = $MembershipPerUser->amount + $data['amount'];
		}

		if(isset($data['addPointsToRange']) && $data['addPointsToRange'] == true)
		{
			CatalogRangePerUser::addPoints($data);
		}

		return $MembershipPerUser->save();
	}

	public static function setAsTake(array $data = null) 
	{
		if(!isset($data))
		{
			return false;
		}

		$MembershipPerUser = new self;
		
		if(!$MembershipPerUser->loadWhere("membership_per_user_id = ?",$data['membership_per_user_id']))
		{
			return false;
		}

		$take = [];

		if(Util::isJson($MembershipPerUser->take))
		{
			$take = json_decode($MembershipPerUser->take,true);

			if(!in_array($data['user_login_id'],$take))
			{
				$take[] = $data['user_login_id'];
			} 
		} 


		$MembershipPerUser->take = json_encode($take);
		
		return $MembershipPerUser->save();
	}

	public static function getNetworkPoints(array $data = null,int $sponsor_id = null) 
	{
		if(!isset($data) && !is_array($data))
		{
			return [];
		}

		$UserData = new UserData;
		$MembershipPerUser = new self;

		// $data = [
		// 	611
		// ];
		
		$data = array_map(function($user_login_id) use($UserData,$MembershipPerUser,$sponsor_id){
			$membership = $MembershipPerUser->findRow("user_login_id = ? AND status = ?",[$user_login_id,1],['membership_per_user_id','point','catalog_membership_id','take'],['field' => 'membership_per_user_id', 'order' => 'DESC']);
			
			if(isset($membership['take']))
			{
				if(Util::isJson($membership['take']))
				{
					$membership['take'] = json_decode($membership['take'],true);
					
					if(is_array($membership['take']))
					{
						if(in_array($sponsor_id,$membership['take']))
						{
							$membership = false;
						} 
					}
				}
			} 

			return [
				'user_login_id' => $user_login_id,
				'names' => $UserData->findField("user_login_id = ?",[$user_login_id],"names"),
				'point' => $membership ? $membership['point'] : 0,
				'catalog_membership_id' => $membership ? $membership['catalog_membership_id'] : 0,
				'membership_per_user_id' => $membership ? $membership['membership_per_user_id'] : 0,
			];
		},$data);

		return array_filter($data,function($user){
			return $user['point'] > 0;
		});
	}

	public static function setMembershipAsEnd(int $membership_per_user_id = null) 
	{
		if(!isset($membership_per_user_id))
		{
			return false;
		}

		$MembershipPerUser = new self;
		
		if(!$MembershipPerUser->loadWhere("membership_per_user_id = ? AND status != ?",[$membership_per_user_id,1]))
		{
			return false;
		}

		$MembershipPerUser->status = self::END;
		
		return $MembershipPerUser->save();
	}

	public static function addPoint(array $data = null) 
	{
		if(!isset($data))
		{
			return false;
		}

		$MembershipPerUser = new self;
		
		if(!$MembershipPerUser->loadWhere("user_login_id = ? AND status = ?",[$data['user_login_id'],1]))
		{
			return false;
		}

		$MembershipPerUser->point = $MembershipPerUser->point + $data['point'];
		
		return $MembershipPerUser->save();
	}

	public static function add(array $data = null) 
	{
		if(!isset($data))
		{
			return false;
		}
		
		$MembershipPerUser = new self;

		// if($MembershipPerUser->loadWhere("user_login_id = ? AND catalog_membership_id = ? AND status = ?",[$data['user_login_id'],$data['catalog_membership_id'],1]))
		// {
		// 	return false;
		// }

		$amount = 0;
		$amount_extra = 0;

		$currentMembership = $MembershipPerUser->getCurrentMembershipOrFilled($data['user_login_id']);
		
		if($currentMembership)
		{
			// $amount = $currentMembership['amount'];
			$amount = $currentMembership['amount_extra'];

			self::setMembershipAsEnd($currentMembership['membership_per_user_id']);
		}
		
		$MembershipPerUser->user_login_id = $data['user_login_id'];
		$MembershipPerUser->amount = $amount;
		$MembershipPerUser->amount_extra = $amount_extra;
		$MembershipPerUser->point = $data['point'];
		$MembershipPerUser->catalog_membership_id = $data['catalog_membership_id'];
		$MembershipPerUser->create_date = time();

		CommissionPerUser::liberatePendingComissions($data['user_login_id']);
		
		return $MembershipPerUser->save();
	}

	public function getCurrentMembership(int $user_login_id = null) 
	{
		if(!isset($user_login_id))
		{
			return false;
		}

		return $this->connection()->row("
			SELECT 
				{$this->tblName}.{$this->tblName}_id,
				{$this->tblName}.amount,
				{$this->tblName}.point,
				{$this->tblName}.user_login_id,
				{$this->tblName}.amount_extra,
				catalog_membership.catalog_membership_id,
				catalog_membership.target,
				catalog_membership.title
			FROM
				{$this->tblName}
			LEFT JOIN 
				catalog_membership
			ON 
				catalog_membership.catalog_membership_id = {$this->tblName}.catalog_membership_id
			WHERE 
				{$this->tblName}.user_login_id = '{$user_login_id}'
			AND 
				{$this->tblName}.status = '1'
		");
	}
	
	public function getCurrentMembershipOrFilled(int $user_login_id = null) 
	{
		if(!isset($user_login_id))
		{
			return false;
		}

		return $this->connection()->row("
			SELECT 
				{$this->tblName}.{$this->tblName}_id,
				{$this->tblName}.amount,
				{$this->tblName}.point,
				{$this->tblName}.user_login_id,
				{$this->tblName}.amount_extra,
				catalog_membership.catalog_membership_id,
				catalog_membership.target,
				catalog_membership.title
			FROM
				{$this->tblName}
			LEFT JOIN 
				catalog_membership
			ON 
				catalog_membership.catalog_membership_id = {$this->tblName}.catalog_membership_id
			WHERE 
				{$this->tblName}.user_login_id = '{$user_login_id}'
			AND 
				{$this->tblName}.status IN('1','0')
		");
	}
	
	public function hasMembershipSpace(int $user_login_id = null) : bool
	{
		if(!isset($user_login_id))
		{
			return false;
		}
		
		$membership = $this->getCurrentMembership($user_login_id);

		if(!$membership)
		{
			return false;
		}

		return $membership['amount_extra'] < ($membership['point'] * 20);
	}
	
	public function _hasMembershipSpace(int $user_login_id = null) : bool
	{
		if(!isset($user_login_id))
		{
			return false;
		}
		
		$membership = $this->getCurrentMembership($user_login_id);

		if(!$membership)
		{
			return false;
		}

		return $membership['amount_extra'] + $membership['amount'] < $membership['target'];
	}

	public function getCurrentMembershipAmount(int $user_login_id = null) 
	{
		if(!isset($user_login_id))
		{
			return false;
		}

		return $this->connection()->field("
			SELECT 
				SUM({$this->tblName}.amount) as amount
			FROM
				{$this->tblName}
			LEFT JOIN 
				catalog_membership
			ON 
				catalog_membership.catalog_membership_id = {$this->tblName}.catalog_membership_id
			WHERE 
				{$this->tblName}.user_login_id = '{$user_login_id}'
			AND 
				{$this->tblName}.status IN('1','2')
		");
	}

	public function getMembershipsPaybusiness(int $user_login_id = null) 
	{
		if(!isset($user_login_id))
		{
			return false;
		}

		return $this->connection()->rows("
			SELECT 
				{$this->tblName}.point,
				{$this->tblName}.amount,
				{$this->tblName}.amount_extra,
				{$this->tblName}.take,
				{$this->tblName}.fill_date,
				{$this->tblName}.create_date,
				{$this->tblName}.status,
				{$this->tblName}.take_old,
				catalog_membership.title,
				catalog_membership.target
			FROM
				{$this->tblName}
			LEFT JOIN 
				catalog_membership
			ON 
				{$this->tblName}.catalog_membership_id = catalog_membership.catalog_membership_id 
			WHERE 
				{$this->tblName}.user_login_id = '{$user_login_id}'
			AND 
				{$this->tblName}.status != -1
		");
	}

	public function getActiveMemberships(int $user_login_id = null) 
	{
		if(!isset($user_login_id))
		{
			return false;
		}

		return $this->connection()->column("
			SELECT 
				{$this->tblName}.{$this->tblName}_id
			FROM
				{$this->tblName}
			WHERE 
				{$this->tblName}.user_login_id = '{$user_login_id}'
			AND 
				{$this->tblName}.status = '1'
		");
	}

	public static function setOldMembershipAsTaked(array $data = null) 
	{
		if(!isset($data))
		{
			return false;
		}
		
		$MembershipPerUser = new MembershipPerUser;
		
		if($memberships = $MembershipPerUser->getActiveMemberships($data['user_login_id']))
		{
			foreach($memberships as $membership_per_user_id)
			{
				self::setAsTake([
					'membership_per_user_id' => $membership_per_user_id,
					'user_login_id' => $data['sponsor_id']
				]);
			}
		}
	}
}	