<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
	$type = 'jpg';
	
	if($target_path = uploadUserImageBase64($data['image'],$type))
	{
		if(uploadUserImage($UserLogin->company_id,$target_path))
		{
			$data['target_path'] = $target_path.'?t='.time();
			$data['r'] = 'SAVE_OK';
			$data['s'] = 1;
		} else {
			$data['r'] = 'NOT_UPLOAD';
			$data['s'] = 0;
		}
	} else {
		$data['r'] = 'NOT_UPLOAD';
		$data['s'] = 0;
	}
} else {
	$data['r'] = 'INVALID_CREDENTIALS';
	$data['s'] = 0;
}

function uploadUserImageBase64(string $data = null,string $type = null) 
{
	if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
		$data = substr($data, strpos($data, ',') + 1);
		$type = strtolower($type[1]); // jpg, png, gif
	
		if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
			throw new \Exception('invalid image type');
		}
		$data = str_replace( ' ', '+', $data );
		$data = base64_decode($data);
	
		if ($data === false) {
			throw new \Exception('base64_decode failed');
		}
	} else {
		throw new \Exception('did not match data URI with image data');
	}
	

	$target_path = TO_ROOT.'src/files/img/user/' .time().'.'.$type;

	file_put_contents($target_path, $data);

	return $target_path;
}

function uploadUserImage(int $company_id = null,string $image = null) : bool 
{
	$UserAccount = new Site\UserAccount;
	
	if($UserAccount->loadWhere("user_login_id = ?",$company_id))
	{
		$UserAccount->image = $image;
		
		return $UserAccount->save();
	}

	return false;
}


echo json_encode(HCStudio\Util::compressDataForPhone($data));  