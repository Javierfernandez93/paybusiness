<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{	
    if(isset($data['first_name']))
    {
        if(isset($data['last_name']))
        {
            if(isset($data['_password']))
            {   
                if(isset($data['_email']))
                {   
                    if(filter_var($data['_email'],FILTER_VALIDATE_EMAIL))
                    {   
                        if(isset($data['address']))
                        {   
                            if(isset($data['country']))
                            {   
                                if(isset($data['phone_number']))
                                {   
                                    $data['user_login_id'] = $UserLogin->company_id;

                                    $UserBridgeAccount = new Unlimited\UserBridgeAccount;

                                    if(true)
                                    {   
                                        if($user_bridge_account_id = Unlimited\UserBridgeAccount::add([
                                            ...$data,
                                            ...[
                                                'status'=>Unlimited\UserBridgeAccount::PENDING,
                                                'catalog_broker_id'=> (new Unlimited\CatalogBroker)->getBrokerByName('Bridge'),
                                            ]
                                        ]))
                                        {
                                            $ApiUnlimited = new Unlimited\ApiUnlimited;
                                            
                                            if($response = $ApiUnlimited->signupUser([
                                                'firstname' => $data['first_name'],
                                                'lastname' => $data['last_name'],
                                                'address' => $data['address'],
                                                'country' => $data['country'],
                                                'phonenumber' => $data['phone_number'],
                                                'email' => $data['_email'],
                                                'password' => $data['_password'],
                                                'workatfinancial' => $data['workatfinancial'],
                                                'knowcfd' => $data['knowcfd'],
                                                'financiallevel' => $data['financiallevel'],
                                                'politicallyexposed' => $data['politicallyexposed'],
                                                'fully_aware_trading_not_sut' => $data['fully_aware_trading_not_sut'],
                                                'fully_aware_underlying_assets' => $data['fully_aware_underlying_assets'],
                                                'fully_aware_trading_leveraged' => $data['fully_aware_trading_leveraged'],
                                            ]))
                                            {
                                                if($response['s'] == 1)
                                                {
                                                    $data['account'] = $response['account'];

                                                    if(Unlimited\UserBridgeAccount::attachAccount([
                                                        'user_bridge_account_id' => $user_bridge_account_id,
                                                        'account' => $data['account']
                                                    ]))
                                                    {
                                                        $data['r'] = 'DATA_OK';
                                                        $data['s'] = 1;
                                                    } else {
                                                        $data['r'] = 'NOT_SAVE_ACCOUNT';
                                                        $data['s'] = 0;
                                                    }
                                                } else {
                                                    $data['pid'] = 1;
                                                    $data['complete'] = false;
                                                    $data['r'] = 'DATA_OK';
                                                    $data['s'] = 1;
                                                }
                                            } else {
                                                $data['pid'] = 2;
                                                $data['complete'] = false;
                                                $data['r'] = 'DATA_OK';
                                                $data['s'] = 1;
                                            }
                                        } else {
                                            $data['r'] = 'NOT_SAVE_ACCOUNT';
                                            $data['s'] = 0;
                                        }
                                    } else {
                                        $data['r'] = 'ALREADY_EXIST';
                                        $data['s'] = 0;
                                    }
                                } else {
                                    $data['r'] = 'NOT_PHONE_NUMBER';
                                    $data['s'] = 0;
                                }
                            } else {
                                $data['r'] = 'NOT_COUNTRY';
                                $data['s'] = 0;
                            }
                        } else {
                            $data['r'] = 'NOT_ADDRESS';
                            $data['s'] = 0;
                        }
                    } else {
                        $data['r'] = 'NOT_EMAIL';
                        $data['s'] = 0;
                    }
                } else {
                    $data['r'] = 'NOT_EMAIL';
                    $data['s'] = 0;
                }
            } else {
                $data['r'] = 'NOT_PASSWORD';
                $data['s'] = 0;
            }
        } else {
            $data['r'] = 'NOT_LAST_NAME';
            $data['s'] = 0;
        }
    } else {
        $data['r'] = 'NOT_FIRST_NAME';
        $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 