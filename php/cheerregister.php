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

		$sql = "INSERT INTO GuestCheer (cheername, cheertext)
		VALUES ('$entree[cheername]', '$entree[cheertext]')";

		if ($conn->query($sql) === TRUE) {
		    //echo "New record created successfully";
		    $conn->close();
			$response_array['status'] = 'success';
			echo json_encode($response_array);
			return;
		} else {
			$conn->close();
		    $response_array['status'] = 'error3';
			echo json_encode($response_array);
			return;
		}		

	}else{

		$response_array['status'] = 'error4';
		echo json_encode($response_array);
		return;

	}



?>