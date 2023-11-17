<?php

namespace Unlimited;

use HCStudio\Orm;

class MembershipPerUser extends Orm {
	protected $tblName = 'membership_per_user';

	public function __construct() {
		parent::__construct();
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

		$MembershipPerUser->amount = $MembershipPerUser->amount + $data['amount'];
		
		return $MembershipPerUser->save();
	}

	public static function setAsTake(int $membership_per_user_id = null) 
	{
		if(!isset($membership_per_user))
		{
			return false;
		}

		$MembershipPerUser = new self;
		
		if(!$MembershipPerUser->loadWhere("membership_per_user_id = ?",$membership_per_user_id))
		{
			return false;
		}

		$MembershipPerUser->take = 1;
		
		return $MembershipPerUser->save();
	}

	public static function getNetworkPoints(array $data = null) 
	{
		if(!isset($data) && !is_array($data))
		{
			return [];
		}

		$UserData = new UserData;
		$MembershipPerUser = new self;

		$data = array_map(function($user_login_id) use($UserData,$MembershipPerUser){
			$membership = $MembershipPerUser->findRow("user_login_id = ? AND status = ?",[$user_login_id,1],['membership_per_user_id','point','catalog_membership_id']);
			
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

	public static function add(array $data = null) 
	{
		if(!isset($data))
		{
			return false;
		}
		
		$MembershipPerUser = new self;
		
		if($MembershipPerUser->loadWhere("user_login_id = ? AND catalog_membership_id = ?",[$data['user_login_id'],$data['catalog_membership_id']]))
		{
			return false;
		}
		
		$MembershipPerUser->user_login_id = $data['user_login_id'];
		$MembershipPerUser->point = $data['point'];
		$MembershipPerUser->catalog_membership_id = $data['catalog_membership_id'];
		$MembershipPerUser->create_date = time();
		
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
				{$this->tblName}.amount_extra,
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
}