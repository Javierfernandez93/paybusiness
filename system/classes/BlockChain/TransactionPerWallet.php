<?php

namespace BlockChain;

use HCStudio\Orm;

use JFStudio\Constants;

class TransactionPerWallet extends Orm 
{
	protected $tblName = 'transaction_per_wallet';

	public function __construct() 
	{
		parent::__construct('blockchain');
	}
	
	public static function attachWalletKind(array $data = null) 
    {
        if(!$data)
        {
            return false;
        }

        $TransactionPerWallet = new self;
        
        d($data);
        return array_map(function($item) use($TransactionPerWallet){
            if(isset($item['transaction_per_wallet']))
            {
                $item['kind'] = $TransactionPerWallet->getWallet($item['transaction_per_wallet']);
            }

            return $item;
        }, $data);
    }

	public function getWallet(int $transaction_per_wallet = null) 
    {
        if(!$transaction_per_wallet)
        {
            return false;
        }

        return $this->connection()->rows("SELECT
                {$this->tblName}.{$this->tblName}_id,
                wallet.public_key,
                wallet_kind.title
            FROM 
                {$this->tblName}
            LEFT JOIN
                wallet
            ON 
                {$this->tblName}.wallet_id = wallet.wallet_id
            LEFT JOIN
                wallet_kind
            ON 
                wallet_kind.wallet_kind_id = wallet.wallet_kind_id
            ON
                transaction.transaction_id = {$this->tblName}.transaction_id
            WHERE
                {$this->tblName}.transaction_per_wallet = '{$transaction_per_wallet}'
        ");
    }

	public static function create(int $create_date = null,int $wallet_id = null,int $to_wallet_id = null,int $block_id = null,int $transaction_id = null) 
    {
        $TransactionPerWallet = new TransactionPerWallet;
        $TransactionPerWallet->transaction_id = $transaction_id;
        $TransactionPerWallet->block_id = $block_id;
        $TransactionPerWallet->to_wallet_id = $to_wallet_id;
        $TransactionPerWallet->wallet_id = $wallet_id;
        $TransactionPerWallet->create_date = $create_date;
        $TransactionPerWallet->hash = self::hash($create_date,$wallet_id,$block_id,$transaction_id);

        if($TransactionPerWallet->save())
        {
            return $TransactionPerWallet->getId();
        }

        return false;
    }

    public static function hash(int $time_stamp = null,int $wallet_id = null,int $to_wallet_id = null,int $block_id = null,int $transaction_id = null)
	{
		return hash("sha256",serialize([$time_stamp,$wallet_id,$to_wallet_id,$block_id,$transaction_id]));
	}
    
	public function getLastTransactions(int $wallet_id = null,string $limit = '') 
	{
        if(isset($wallet_id) === true)
        {
            $sql = "SELECT
                        {$this->tblName}.{$this->tblName}_id,
                        transaction.hash,
                        transaction.input,
                        transaction.output,
                        transaction.unix_date
                    FROM 
                        {$this->tblName}
                    LEFT JOIN
                        transaction 
                    ON
                        transaction.transaction_id = {$this->tblName}.transaction_id
                    WHERE
                        {$this->tblName}.wallet_id = '{$wallet_id}'
                    AND 
                        {$this->tblName}.status = '".Constants::AVIABLE."'
                    ORDER BY 
                        {$this->tblName}.create_date
                    DESC 
                        {$limit}
                    ";

            return $this->connection()->rows($sql);
	    }

        return false;
	}
	
    public function getCountTransactions(int $wallet_id = null) 
	{
        if(isset($wallet_id) === true)
        {
            $sql = "SELECT
                        COUNT({$this->tblName}.{$this->tblName}_id) as c
                    FROM 
                        {$this->tblName}
                    WHERE
                        (
                            {$this->tblName}.wallet_id = '{$wallet_id}'
                            OR 
                            {$this->tblName}.to_wallet_id = '{$wallet_id}'
                        )
                    AND 
                        {$this->tblName}.status = '".Constants::AVIABLE."'
                    ";

            return $this->connection()->field($sql);
	    }

        return false;
	}

    public function geTransactions(int $wallet_id = null) 
	{
        if(isset($wallet_id) === true)
        {
            $sql = "SELECT
                        {$this->tblName}.{$this->tblName}_id,
                        transaction.hash,
                        transaction.input,
                        transaction.output,
                        transaction.unix_date
                    FROM 
                        {$this->tblName}
                    LEFT JOIN
                        transaction 
                    ON
                        transaction.transaction_id = {$this->tblName}.transaction_id
                    WHERE
                        ( 
                            {$this->tblName}.wallet_id = '{$wallet_id}'
                        OR 
                            {$this->tblName}.to_wallet_id = '{$wallet_id}'
                        )
                    AND 
                        {$this->tblName}.status = '".Constants::AVIABLE."'
                    ";

            return $this->connection()->rows($sql);
	    }

        return false;
	}
}