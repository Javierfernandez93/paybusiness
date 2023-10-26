<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{	
	if($progress = (new Unlimited\Exercise)->getCurrentExercise($UserLogin->company_id))
    {
        $data['status'] = (new Unlimited\Exercise)->_getStatus($UserLogin->company_id);
        $data['progress'] = $progress;
        $data['r'] = 'DATA_OK';
	    $data['s'] = 1;
    } else {
        $data['r'] = 'NOT_PROGRESS';
	    $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 