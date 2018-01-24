<?php
header('Content-Type: application/json');
session_start();



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

        $sql = "UPDATE ILLUST SET illustminprice='$_POST[illust_minprice]', illustmaxprice='$_POST[illust_maxprice]', illustbankaccount='$_POST[illust_bankaccount]', illustaccountnumber='$_POST[illust_accountnumber]', illustaccountname='$_POST[illust_accountname]', illustpassword='$_POST[illust_password]' WHERE one_id='$oneid'";
        $conn->query($sql);





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