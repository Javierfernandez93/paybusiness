<?php

namespace Unlimited;

use HCStudio\Orm;

use Unlimited\CatalogRange;

class CatalogRangePerUser extends Orm {
	protected $tblName = 'catalog_range_per_user';
	public function __construct() {
		parent::__construct();
	}

	public static function insertFirstRange(array $data = null) : bool
    {
        return self::insertRange($data);
    }

	public static function insertRange(array $data = null) : bool
    {
        if(!isset($data))
        {
            return false;
        }

        $CatalogRangePerUser = new self;
        
        if($CatalogRangePerUser->loadWhere('user_login_id = ? AND catalog_range_id = ?',[$data['user_login_id'],$data['catalog_range_id']]))
        {
            return false;
        }

        $CatalogRangePerUser->user_login_id = $data['user_login_id'];
        $CatalogRangePerUser->catalog_range_id = $data['catalog_range_id'];
        $CatalogRangePerUser->create_date = time();
        
        return $CatalogRangePerUser->save();
    }

	public function getNextRange(int $user_login_id = null)
	{
		$next_catalog_range_id = 1;

		if($catalog_range_id = $this->getLastTrange($user_login_id))
        {
            $next_catalog_range_id = $catalog_range_id + 1;
        }

        return (new CatalogRange)->getRange($next_catalog_range_id);
	}

	public function getLastTrange(int $user_login_id = null) : int
	{
        if(isset($user_login_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.catalog_range_id
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.user_login_id = '{$user_login_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    ORDER BY 
                        {$this->tblName}.catalog_range_id
                    DESC 
                    ";
            
            return $this->connection()->field($sql);
	    }

        return 0;
	}

	public function getLastRange(int $user_login_id = null) 
	{
        if(!isset($user_login_id))
        {
            return false;
        }

        return $this->connection()->row("SELECT 
            {$this->tblName}.catalog_range_id,
            catalog_range.image,
            catalog_range.title
        FROM 
            {$this->tblName}
        LEFT JOIN 
            catalog_range
        ON
            catalog_range.catalog_range_id = {$this->tblName}.catalog_range_id
        WHERE 
            {$this->tblName}.user_login_id = '{$user_login_id}'
        AND 
            {$this->tblName}.status = '1'
        ORDER BY 
            {$this->tblName}.catalog_range_id
        DESC 
        ");
	}
}