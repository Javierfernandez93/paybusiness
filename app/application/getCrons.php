<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Unlimited\UserSupport;

if($UserSupport->logged === true)
{
    $data["crons"] = format((new Unlimited\Cron)->getAll());
    $data["s"] = 1;
    $data["r"] = "DATA_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function format(array $crons = null) : array 
{
    return array_map(function($cron){
        $cron['status'] = $cron['status'] ? 'true' : 'false';

        return $cron;
    },$crons);
}

echo json_encode($data);