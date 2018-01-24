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




        // update 

        $sql = "UPDATE TRADECARD SET tctypeA='$_POST[tc_typeA]', tctypeB='$_POST[tc_typeB]', tcdesirechar='$_POST[tc_desirechar]', tcpassword='$_POST[tc_password]' WHERE one_id='$oneid'";
        $conn->query($sql);


        $sql = "SELECT contactemail FROM BASIC WHERE one_id='$oneid'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        // handle uploaded image files
        $filepath_tradecard_sample1 = saveimage($_FILES['tc_sample1'], "tcsample", 'tc_sample1', $row['contactemail']);
        $filepath_tradecard_sample2 = saveimage($_FILES['tc_sample2'], "tcsample", 'tc_sample2', $row['contactemail']);
        $filepath_tradecard_sample3 = saveimage($_FILES['tc_sample3'], "tcsample", 'tc_sample3', $row['contactemail']);


        if($filepath_tradecard_sample1 != NULL){
            $sql = "UPDATE TRADECARD SET tcsample1='$filepath_tradecard_sample1' WHERE one_id='$oneid'";
            $conn->query($sql);
        }
        if($filepath_tradecard_sample2 != NULL){
            $sql = "UPDATE TRADECARD SET tcsample2='$filepath_tradecard_sample2' WHERE one_id='$oneid'";
            $conn->query($sql);
        }
        if($filepath_tradecard_sample3 != NULL){
            $sql = "UPDATE TRADECARD SET tcsample3='$filepath_tradecard_sample3' WHERE one_id='$oneid'";
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