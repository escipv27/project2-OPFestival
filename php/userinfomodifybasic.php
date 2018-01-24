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

$namechange = FALSE;


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



        // check if user changed their name
        $sql = "SELECT name FROM BASIC WHERE one_id='$oneid'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        if( strcmp( $row['name'], $_POST['basic_name'] ) != 0 ){
            $namechange = TRUE;
        }



        // update basic

        $sql = "UPDATE BASIC SET name='$_POST[basic_name]', contactphone='$_POST[basic_contactphone]', contacttwitter='$_POST[basic_contacttwitter]', homeaddress='$_POST[basic_homeaddress]', webaddr1='$_POST[basic_webaddr1]', webaddr2='$_POST[basic_webaddr2]', webaddr3='$_POST[basic_webaddr3]' WHERE one_id='$oneid'";
        $conn->query($sql);

        $sql = "UPDATE LGC SET password='$_POST[basic_password]' WHERE one_id='$oneid'";
        $conn->query($sql);




        $sql = "SELECT contactemail FROM BASIC WHERE one_id='$oneid'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        // handle uploaded image files
        $filepath_banner1 = saveimage($_FILES['basic_webbanner1'], "basicwebbanner", 'banner1', $row['contactemail']);
        $filepath_banner2 = saveimage($_FILES['basic_webbanner2'], "basicwebbanner", 'banner2', $row['contactemail']);
        $filepath_banner3 = saveimage($_FILES['basic_webbanner3'], "basicwebbanner", 'banner3', $row['contactemail']);

        if($filepath_banner1 != NULL){
            $sql = "UPDATE BASIC SET webbanner1='$filepath_banner1' WHERE one_id='$oneid'";
            $conn->query($sql);
        }
        if($filepath_banner2 != NULL){
            $sql = "UPDATE BASIC SET webbanner2='$filepath_banner2' WHERE one_id='$oneid'";
            $conn->query($sql);
        }
        if($filepath_banner3 != NULL){
            $sql = "UPDATE BASIC SET webbanner3='$filepath_banner3' WHERE one_id='$oneid'";
            $conn->query($sql);
        }


        if($namechange){
            $sql = "UPDATE LGC SET name='$_POST[basic_name]' WHERE one_id='$oneid'";
            $conn->query($sql);

            $sql = "UPDATE BOOTH SET name='$_POST[basic_name]' WHERE one_id='$oneid'";
            $conn->query($sql);

            $sql = "UPDATE PORTRAIT SET name='$_POST[basic_name]' WHERE one_id='$oneid'";
            $conn->query($sql);

            $sql = "UPDATE TRADECARD SET name='$_POST[basic_name]' WHERE one_id='$oneid'";
            $conn->query($sql);

            $sql = "UPDATE ILLUST SET name='$_POST[basic_name]' WHERE one_id='$oneid'";
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