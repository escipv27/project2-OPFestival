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

	if($_SESSION["timeout"] + 59 * 60 < time()){
		$_SESSION["on"] == 'out';
		$response_array['status'] = 'timeout';
		$return_array = array(
	            'statusC' => $response_array);
	    echo json_encode($return_array);
		return;
	}

	if($_SESSION["on"] == 'in'){

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

		$oneid = $_SESSION["id"];

		$sql = "SELECT * FROM BASIC WHERE one_id='$oneid'";
		$result = $conn->query($sql);

		if($result->num_rows > 0){


			$basic = $result->fetch_assoc();		
		

			$pass = array();
			$sql_pw = "SELECT password FROM LGC WHERE one_id='$oneid'";
			$result_pw = $conn->query($sql_pw);
			$pass = $result_pw->fetch_assoc();



    		$booth = array();
			if ($basic["boothstatus"] != ""){
				$sql_bth = "SELECT * FROM BOOTH WHERE one_id='$oneid'";
				$result_bth = $conn->query($sql_bth);
				$booth = $result_bth->fetch_assoc();
				$circleinfo = nl2br($booth['circleinfo'], false);
				$booth['circleinfo'] = $circleinfo;
			}

			$portrait = array();
			if ($basic["portraitstatus"] != ""){
				$sql_prt = "SELECT * FROM PORTRAIT WHERE one_id='$oneid'";
				$result_prt = $conn->query($sql_prt);
				$portrait = $result_prt->fetch_assoc();
			}

			$tcard = array();
			if ($basic["tradecardstatus"] != ""){
				$sql_tcard = "SELECT * FROM TRADECARD WHERE one_id='$oneid'";
				$result_tcard = $conn->query($sql_tcard);
				$tcard = $result_tcard->fetch_assoc();
			}

			$illust = array();
			if ($basic["illuststatus"] != ""){
				$sql_ilst = "SELECT * FROM ILLUST WHERE one_id='$oneid'";
				$result_ilst = $conn->query($sql_ilst);
				$illust = $result_ilst->fetch_assoc();
			}

			$response_array['status'] = 'success';			

			$userdata = array(
				'basic' => $basic,
				'pass' => $pass,
				'booth' => $booth,
				'portrait' => $portrait,
				'tcard' => $tcard,
				'illust' => $illust
			);

			$return_array = array(
	            'statusC' => $response_array,
	            'userdata' => $userdata
	        );
			echo json_encode($return_array);
			return;



		}else{
			$response_array['status'] = 'iddoesnotexist';
			$return_array = array(
	            'statusC' => $response_array);
	    	echo json_encode($return_array);
	    	return;
		}

	}else{
		$response_array['status'] = 'loginerror';
		$return_array = array(
	            'statusC' => $response_array);
	    echo json_encode($return_array);
	    return;
	}





?>