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


        $sql = "SELECT contactemail FROM BASIC WHERE one_id='$oneid'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        // handle uploaded image files
        $filepath_portrait_sample1 = saveimage($_FILES['portrait_sample1'], "portraitsample", 'portrait_sample1', $row['contactemail']);
        $filepath_portrait_sample2 = saveimage($_FILES['portrait_sample2'], "portraitsample", 'portrait_sample2', $row['contactemail']);
        $filepath_portrait_sample3 = saveimage($_FILES['portrait_sample3'], "portraitsample", 'portrait_sample3', $row['contactemail']);






        if($filepath_portrait_sample1 != NULL){
            $sql = "UPDATE PORTRAIT SET portraitsample1='$filepath_portrait_sample1' WHERE one_id='$oneid'";
            $conn->query($sql);
        }
        if($filepath_portrait_sample2 != NULL){
            $sql = "UPDATE PORTRAIT SET portraitsample2='$filepath_portrait_sample2' WHERE one_id='$oneid'";
            $conn->query($sql);
        }
        if($filepath_portrait_sample3 != NULL){
            $sql = "UPDATE PORTRAIT SET portraitsample3='$filepath_portrait_sample3' WHERE one_id='$oneid'";
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