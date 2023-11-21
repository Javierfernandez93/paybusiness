<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    if(updateUserLogin($data['user']))
    {
        if(updateUserData($data['user']))
        {
            if(updateUserContact($data['user']))
            {
                if(updateUserAccount($data['user']))
                {
                    if(updateUserAddress($data['user']))
                    {
                        if(updateUserReferral($data['user']))
                        {
                            $data["s"] = 1;
                            $data["r"] = "UPDATED_OK";
                        } else {
                            $data["s"] = 0;
                            $data["r"] = "NOT_UPDATED_USER_REFERRAL";
                        }  
                    } else {
                        $data["s"] = 0;
                        $data["r"] = "NOT_UPDATED_USER_ADDRESS";
                    }  
                } else {
                    $data["s"] = 0;
                    $data["r"] = "NOT_UPDATED_USER_ACCOUNT";
                }            
            }  else {
                $data["s"] = 0;
                $data["r"] = "NOT_UPDATED_USER_CONTACT";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_UPDATED_USER_DATA";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_UPDATED_USER_LOGIN";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function updateUserData($data = null) : bool
{
    $UserData = new Unlimited\UserData;   
        
    if($UserData->loadWhere("user_login_id = ?",$data['user_login_id']))
    {
        $UserData->names = $data['names'];
        
        return $UserData->save();
    }

    return false;
}

function updateUserContact($data = null) : bool
{
    $UserContact = new Unlimited\UserContact;   
        
    if($UserContact->loadWhere("user_login_id = ?",$data['user_login_id']))
    {
        $UserContact->phone = $data['phone'];

        return $UserContact->save();    
    }

    return false;
}


function updateUserAccount($data = null) : bool
{
    $UserAccount = new Unlimited\UserAccount;   
        
    if($UserAccount->loadWhere("user_login_id = ?",$data['user_login_id']))
    {
        $UserAccount->landing = $data['user_account']['landing'];
        
        return $UserAccount->save();
    }

    return false;
}

function updateUserAddress($data = null) : bool
{
    $UserAddress = new Unlimited\UserAddress;   
        
    if($UserAddress->loadWhere("user_login_id = ?",$data['user_login_id']))
    {
        $UserAddress->country_id = $data['country_id'];
        
        return $UserAddress->save();
    }

    return false;
}

function updateUserLogin($data = null) : bool
{
    $UserLogin = new Unlimited\UserLogin(false,false);   
        
    if($UserLogin->loadWhere("user_login_id = ?",$data['user_login_id']))
    {
        $UserLogin->email = $data['email'];
        $UserLogin->password = $data['password'] ? sha1($data['password']) : $UserLogin->password;
        // $UserLogin->signup_date = isset($data['signup_date']) && !empty($data['signup_date']) ? strtotime($data['signup_date']) : $UserLogin->signup_date;
        
        return $UserLogin->save();
    }

    return false;
}

function updateUserReferral($data = null) : bool
{
    $UserReferral = new Unlimited\UserReferral;   
        
    if(!$UserReferral->loadWhere("user_login_id = ?",$data['user_login_id']))
    {
        return true;
    }

    $UserReferral->sponsor_id = $data['sponsor']['user_login_id'];
    $UserReferral->referral_id = $data['referral']['user_login_id'];
    
    return $UserReferral->save();
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 