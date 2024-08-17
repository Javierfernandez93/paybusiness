<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    endWebServiceWithUnauthorized();
}

if(!isset($data['course_id'])) {
    endWebServiceWithError('NOT_COURSE_ID');
}

$course = (new Site\Course)->getCourse($data['course_id']);

if(!$course) {
    endWebServiceWithError('NOT_COURSE');
}

endWebServiceWithSuccess(null,[
    'course' => $course
]);