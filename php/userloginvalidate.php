<?php
	header('Content-Type: application/json');
	session_start();
	$_SESSION["on"] = "out";
	$_SESSION["id"] = "";
	$_SESSION["timeout"] = "";

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




		$login_email = $entree['loginemail'];
		$login_pword = $entree['loginword'];
		
		$sql = "SELECT * FROM LGC WHERE contactemail='$login_email'";
		$result = $conn->query($sql);



		if ($result->num_rows > 0) {	    
		    // login id exist, check password
		    //
		    $row = $result->fetch_assoc();
		    if($row["password"] == $login_pword){
		    	// login success
		    	$conn->close();
				$response_array['status'] = 'success';
				$_SESSION["on"] = "in";
				$_SESSION["id"] = $row["one_id"];
				$_SESSION["timeout"] = time();
				echo json_encode($response_array);
				return;
		    }else{
		    	// wrong password
		    	$conn->close();
				$response_array['status'] = 'password';
				echo json_encode($response_array);
				return;
		    }
		}else{
			// login email does not exist

			$conn->close();
			$response_array['status'] = 'email';
			echo json_encode($response_array);
			return;
		}



	}




?>