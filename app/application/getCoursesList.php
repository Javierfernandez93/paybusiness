<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$UserLogin = new Site\UserLogin;

if(!$UserLogin->logged) {
    endWebServiceWithError();
}

$data = HCStudio\Util::getHeadersForWebService();

$Course = new Site\Course;
$Course->connection()->stmtQuery("SET NAMES utf8mb4");

$data['catalog_course_type_id'] = isset($data['catalog_course_type_id']) ? $data['catalog_course_type_id'] : 1;

$filter = "AND course.catalog_course_type_id = '{$data['catalog_course_type_id']}'";

$courses = $Course->getList($filter);

if(!$courses) {
    endWebServiceWithError(Constants::RESPONSES['NOT_DATA']);
}

$courses = array_values(format(filter($courses,$UserLogin->company_id),$UserLogin->company_id));
$courses = Site\Course::filterCoursesBlocked($courses,$UserLogin->company_id);

if(empty($courses)) {
    endWebServiceWithError(Constants::RESPONSES['DATA_EMPTY']);
}

function filter(array $courses = null,int $user_login_id = null) : array
{
    $BuyPerUser = new Site\BuyPerUser;

    return array_filter($courses,function($course) use($BuyPerUser,$user_login_id) {
        $aviable = true;
        
        if($course['target'] != Site\Course::ALL)
        {    
            $aviable = $BuyPerUser->hasPackageBuy($user_login_id,$course['target']);
        }

        return $aviable;
    }); 
}

function format(array $courses = null,int $user_login_id = null) : array
{	
    $SessionTakeByUserPerCourse = new Site\SessionTakeByUserPerCourse;
    $UserEnrolledInCourse = new Site\UserEnrolledInCourse;
    $Course = new Site\Course;
    
	return array_map(function ($course) use($SessionTakeByUserPerCourse,$UserEnrolledInCourse,$Course,$user_login_id) {
        $course['isEnrolled'] = $UserEnrolledInCourse->isEnrolled($course['course_id'],$user_login_id);
        
        if($course['attach_to_course_id'])
        {
            $course['attach_to_course'] = $Course->findField("course_id = ?",$course['attach_to_course_id'],"title");
        }

        if($course['isEnrolled'])
        {
            $course['hasLessonTaked'] = $SessionTakeByUserPerCourse->hasLessonTaked($course['course_id'],$user_login_id);
            
            if($course['hasLessonTaked'])
            {
                $course['lastCourse'] = $SessionTakeByUserPerCourse->getLastSessionTaked($course['course_id'],$user_login_id);
            }
        }

        return $course;
    },$courses);
}

endWebServiceWithSuccess(null,[
    'courses' => $courses,
]);