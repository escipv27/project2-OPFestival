<?php
header('Content-Type: application/json');
session_start();

require 'saveimage.php';



$response_array['status'] = 'error1';


// data base info
$servername = "localhost";
$username = "pieceonly";
$password = "oneon240";
$dbname = "pieceonly";



    if($_SESSION["on"] == 'in'){

        $oneid = $_SESSION["id"];

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



        // update 

        $sql = "UPDATE BOOTH SET circlename='$_POST[circle_name]', circlenicknames='$_POST[circle_nicknames]', circletype='$_POST[circle_contents]', circlegenre='$_POST[circle_genre]', circleinfo='$_POST[circle_info]', circlegrade='$_POST[circle_grade]', circledeposit='$_POST[circle_deposit]' WHERE one_id='$oneid'";
        $conn->query($sql);


        $sql = "SELECT contactemail FROM BASIC WHERE one_id='$oneid'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        // handle uploaded image files
        $filepath_circleimage = saveimage($_FILES['circle_image'], "circleimage", 'circle_image', $row['contactemail']);





        if($filepath_circleimage != NULL){
            $sql = "UPDATE BOOTH SET circleimage='$filepath_circleimage' WHERE one_id='$oneid'";
            $conn->query($sql);
        }

        $conn->close();


        $response_array['status'] = 'success';
        $return_array = array(
            'statusC' => $response_array
            );
        echo json_encode($return_array);
        
        return;


    }else{
        $response_array['status'] = 'loginerror';
        $return_array = array(
                'statusC' => $response_array);
        echo json_encode($return_array);
        return;
    }



?>