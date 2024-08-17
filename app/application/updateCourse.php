<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    endWebServiceWithUnauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

$data['user_support_id'] = 1;

$data['tag'] = $data['tagsFormatted'];
unset($data['tagsFormatted']);

$course_id = Site\Course::addCourse($data);

if(!$course_id)	 {
	endWebServiceWithError('COURSE_ALREADY_EXIST');
}

endWebServiceWithSuccess(null,[
	'course_id' => $course_id	
]);