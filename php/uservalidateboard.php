<?php
	header('Content-Type: application/json');
	session_start();

	$servername = "localhost";
	$username = "pieceonly";
	$password = "oneon240";
	$dbname = "pieceonly";

	$json = $_POST['json'];
	$entree = json_decode($json, true);


	$response_array['status'] = 'error1';


	/*
	if($entree['loginemail'] != "1pieceonly@naver.com"){
		$response_array['status'] = 'error';
		echo json_encode($response_array);
		return;
	}*/


	if($entree != NULL){
				

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die();
		    $response_array['status'] = 'error2';
			echo json_encode($response_array);
			return;
		} 

		$conn->query("set session character_set_connection=utf8");
		$conn->query("set session character_set_results=utf8");
		$conn->query("set session character_set_client=utf8");


		$boardtype = $entree["boardname"];
		$oneid = $_SESSION["id"];


		switch ($boardtype) {
		    case "booth":
		        
		        $sql = "SELECT * FROM BOOTH WHERE one_id='$oneid'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
					$row = $result->fetch_assoc();
		    		if($row["boothstatus"] == "승인"){
		    			$response_array['status'] = 'success';
		    		}
				}else{
					$response_array['status'] = 'errorbth';
				}				
		        break;
		    case "tcard":
		        $sql = "SELECT * FROM TRADECARD WHERE one_id='$oneid'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
					$row = $result->fetch_assoc();
		    		if($row["tradecardstatus"] == "승인"){
		    			$response_array['status'] = 'success';
		    		}
				}else{
					$response_array['status'] = 'errortc';
				}	
		        break;
		    case "portrait":
		        $sql = "SELECT * FROM PORTRAIT WHERE one_id='$oneid'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
					$row = $result->fetch_assoc();
		    		if($row["portraitstatus"] == "승인"){
		    			$response_array['status'] = 'success';
		    		}
				}else{
					$response_array['status'] = 'error2';
				}	
		        break;
		    case "illust":
		    	$sql = "SELECT * FROM ILLUST WHERE one_id='$oneid'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
					$row = $result->fetch_assoc();
		    		if($row["illuststatus"] == "승인"){
		    			$response_array['status'] = 'success';
		    		}
				}else{
					$response_array['status'] = 'error2';
				}	
		    	break;
		    default:
		    	$response_array['status'] = 'error2';	
		}


		

		$conn->close();
		echo json_encode($response_array);
		return;





	}else{

		$response_array['status'] = 'error2';
		echo json_encode($response_array);
		return;
	}




?>