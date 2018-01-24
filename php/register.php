<?php

require 'saveimage.php';




$thatdate = date_create("2016-03-18 22:00:00");
$ddaytime = date_timestamp_get($thatdate);

$timenow = time();



if ($timenow >= $ddaytime) {
    $response_array['status'] = 'timeyet';
    $return_array = array(        
                    'statusC' => $response_array);
    echo json_encode($return_array);
    return;
}






// handle uploaded image files
// webbanner 1, 2, 3
// circle image
// portrait sample 1 2 3
// tradecare sample 1 2 3
$filepath_banner1 = saveimage($_FILES['basic_webbanner1'], "basicwebbanner", 'banner1', $_POST['basic_contactemail']);
$filepath_banner2 = saveimage($_FILES['basic_webbanner2'], "basicwebbanner", 'banner2', $_POST['basic_contactemail']);
$filepath_banner3 = saveimage($_FILES['basic_webbanner3'], "basicwebbanner", 'banner3', $_POST['basic_contactemail']);
$filepath_circleimage = saveimage($_FILES['circle_image'], "circleimage", 'circle_image', $_POST['basic_contactemail']);
$filepath_portrait_sample1 = saveimage($_FILES['portrait_sample1'], "portraitsample", 'portrait_sample1', $_POST['basic_contactemail']);
$filepath_portrait_sample2 = saveimage($_FILES['portrait_sample2'], "portraitsample", 'portrait_sample2', $_POST['basic_contactemail']);
$filepath_portrait_sample3 = saveimage($_FILES['portrait_sample3'], "portraitsample", 'portrait_sample3', $_POST['basic_contactemail']);
$filepath_tradecard_sample1 = saveimage($_FILES['tc_sample1'], "tcsample", 'tc_sample1', $_POST['basic_contactemail']);
$filepath_tradecard_sample2 = saveimage($_FILES['tc_sample2'], "tcsample", 'tc_sample2', $_POST['basic_contactemail']);
$filepath_tradecard_sample3 = saveimage($_FILES['tc_sample3'], "tcsample", 'tc_sample3', $_POST['basic_contactemail']);




$response_array['status'] = 'error1';


// data base info
$servername = "localhost";
$username = "pieceonly";
$password = "oneon240";
$dbname = "pieceonly";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die();
    $response_array['status'] = 'error';
    $response_array['statusmsg'] = "erroratconnection";
    $return_array = array(        
                    'statusC' => $response_array);
    echo json_encode($return_array);
    return;
} 

// set korean utf8 connection
$conn->query("set session character_set_connection=utf8");
$conn->query("set session character_set_results=utf8");
$conn->query("set session character_set_client=utf8");


// check for email duplicate
$basic_email = $_POST['basic_contactemail'];
$sql = "SELECT * FROM BASIC WHERE contactemail='$basic_email'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {        
    // already exist
    $response_array['status'] = "erroremaildup";
    $response_array['statusmsg'] = "Error BASIC: " . $conn->error;
    $return_array = array(        
                    'statusC' => $response_array);
    echo json_encode($return_array);
    $conn->close();
    return;
} 



// insert into basic

$sql = "INSERT INTO BASIC (submittime, name, birthdate, contactphone, contactemail, contacttwitter, homeaddress, webaddr1, webbanner1, webaddr2, webbanner2, webaddr3, webbanner3, boothstatus, portraitstatus, tradecardstatus, illuststatus)
VALUES (NOW(), '$_POST[basic_name]', '$_POST[basic_birthdate]', '$_POST[basic_contactphone]', '$_POST[basic_contactemail]', '$_POST[basic_contacttwitter]', '$_POST[basic_homeaddress]', '$_POST[basic_webaddr1]', '$filepath_banner1', '$_POST[basic_webaddr2]', '$filepath_banner2', '$_POST[basic_webaddr3]', '$filepath_banner3', '$_POST[booth_a]', '$_POST[portrait_a]', '$_POST[tradecard_a]', '$_POST[illust_a]')";


if ($conn->query($sql) === TRUE) {
    
    $response_array['statusbasic'] = 'success';

} else {
    $response_array['status'] = "error";
    $response_array['statusmsg'] = "Error BASIC: " . $conn->error;
    $return_array = array(        
                    'statusC' => $response_array);
    echo json_encode($return_array);
    $conn->close();
    return;
}


// login credential 

$sql = "INSERT INTO LGC (one_id, name, contactemail, password)
VALUES ( (SELECT one_id from BASIC WHERE name='$_POST[basic_name]'), '$_POST[basic_name]', '$_POST[basic_contactemail]', '$_POST[basic_password]')";

if ($conn->query($sql) === TRUE) {
    $response_array['statuslgc'] = 'success';

} else {
    $response_array['status'] = "error";
    $response_array['statusmsg'] = "Error LGC: " . $conn->error;
    $return_array = array(        
                    'statusC' => $response_array);
    echo json_encode($return_array);
    $conn->close();
    return;
}





$bstatus = "미신청";
$pstatus = "미신청";
$tstatus = "미신청";
$istatus = "미신청";
$returncat = "";


if(isset($_POST['booth_a'])){
	$bstatus = "승인대기";
    // insert into booth
    $sql = "INSERT INTO BOOTH (one_id, name, boothstatus, circlename, circlenicknames, circlesize, circletype, circlegenre, circleinfo, circlegrade, circleimage, circledeposit)
    VALUES ( (SELECT one_id from BASIC WHERE name='$_POST[basic_name]'), '$_POST[basic_name]', '$bstatus', '$_POST[circle_name]', '$_POST[circle_nicknames]', '$_POST[circle_size]', '$_POST[circle_contents]', '$_POST[circle_genre]', '$_POST[circle_info]', '$_POST[circle_grade]', '$filepath_circleimage', '$_POST[circle_deposit]')";

    if ($conn->query($sql) === TRUE) {
        $response_array['statusbooth'] = 'success';
        $returncat = $returncat . "부스 / ";


    } else {
        $response_array['status'] = "error";
        $response_array['statusmsg'] = "Error Booth: " . $conn->error;
        $return_array = array(        
                        'statusC' => $response_array);
        echo json_encode($return_array);
        $conn->close();
        return;
    }

    // update basic status

}


if(isset($_POST['portrait_a'])){
	$pstatus = "승인대기";
    // insert into booth

    $sql = "INSERT INTO PORTRAIT (one_id, name, portraitstatus, portraitexp, portraitdesirechar, portraitavgworktime, portraitexpworktime, portraitsample1, portraitsample2, portraitsample3)
    VALUES ( (SELECT one_id from BASIC WHERE name='$_POST[basic_name]'), '$_POST[basic_name]', '$pstatus', '$_POST[portrait_exp]', '$_POST[portrait_desirechar]', '$_POST[portrait_avgworktime]', '$_POST[portrait_expworktime]', '$filepath_portrait_sample1', '$filepath_portrait_sample2', '$filepath_portrait_sample3')";

    if ($conn->query($sql) === TRUE) {
        $response_array['statusportrait'] = 'success';
        $returncat = $returncat . "등신대 / ";

    } else {
        $response_array['status'] = "error";
        $response_array['statusmsg'] = "Error Portrait: " . $conn->error;
        $return_array = array(        
                        'statusC' => $response_array);
        echo json_encode($return_array);
        $conn->close();
        return;
    }

    // update basic status
}


if(isset($_POST['tradecard_a'])){
	$tstatus = "승인대기";
    // insert into booth

    $sql = "INSERT INTO TRADECARD (one_id, name, tradecardstatus, tctypeA, tctypeB, tcdesirechar, tcavgworktime, tcexpworktime, tcsample1, tcsample2, tcsample3, tcpassword)
    VALUES ( (SELECT one_id from BASIC WHERE name='$_POST[basic_name]'), '$_POST[basic_name]', '$tstatus', '$_POST[tc_typeA]', '$_POST[tc_typeB]', '$_POST[tc_desirechar]', '$_POST[tc_avgworktime]', '$_POST[tc_expworktime]', '$filepath_tradecard_sample1', '$filepath_tradecard_sample2', '$filepath_tradecard_sample3', '$_POST[tc_password]')";

    if ($conn->query($sql) === TRUE) {
        $response_array['statustc'] = 'success';
        $returncat = $returncat . "트레카 / ";

    } else {
        $response_array['status'] = "error";
        $response_array['statusmsg'] = "Error Tradecard: " . $conn->error;
        $return_array = array(        
                        'statusC' => $response_array);
        echo json_encode($return_array);
        $conn->close();
        return;
    }

    // update basic status
}


if(isset($_POST['illust_a'])){
	$istatus = "승인대기";
    // insert into booth

    $sql = "INSERT INTO ILLUST (one_id, name, illuststatus, illusttype, illustminprice, illustmaxprice, illustbankaccount, illustaccountnumber, illustaccountname, illustpassword)
    VALUES ( (SELECT one_id from BASIC WHERE name='$_POST[basic_name]'), '$_POST[basic_name]', '$istatus', '$_POST[illust_type]', '$_POST[illust_minprice]', '$_POST[illust_maxprice]', '$_POST[illust_bankaccount]', '$_POST[illust_accountnumber]', '$_POST[illust_accountname]', '$_POST[illust_password]')";

    if ($conn->query($sql) === TRUE) {
        $response_array['statusillust'] = 'success';
        $returncat = $returncat . "일러스트 / ";

    } else {
        $response_array['status'] = "error";
        $response_array['statusmsg'] = "Error Illust: " . $conn->error;
        $return_array = array(        
                        'statusC' => $response_array);
        echo json_encode($return_array);
        $conn->close();
        return;
    }

    // update basic status
}





$returndata_array['category'] = $returncat;
$returndata_array['basic_name'] = $_POST['basic_name'];
$returndata_array['basic_contactemail'] = $_POST['basic_contactemail'];
$returndata_array['basic_password'] = $_POST['basic_password'];

$response_array['status'] = 'success';


echo json_encode($response_array);
$conn->close();
return;


?>