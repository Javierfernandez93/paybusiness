<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($data['password']) $_POST['password'] = $data['password'];
if($data['password']) $_GET['password'] = $data['password'];

if($data['email']) $_POST['email'] = $data['email'];
if($data['email']) $_GET['email'] = $data['email'];

if($data["email"])
{
	if($data["password"])
	{		
		$UserSupport = new Unlimited\UserSupport;

		if($UserSupport->logged === true)
		{
			if(filter_var($data['rememberMe'], FILTER_VALIDATE_BOOLEAN) == true)
			{
				JFStudio\Cookie::set(Unlimited\UserSupport::PID_NAME,$UserSupport->getPid());
			}

			$data["s"] = 1;
			$data["r"] = "LOGGED_OK";
		} else {
		    $data["s"] = 0;
	  		$data["r"] = "INVALID_PASSWORD";
		}
	} else {
		$data["s"] = 0;
		$data["r"] = "NOT_PASSWORD";
	}
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 