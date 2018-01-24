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
		    $response_array['status'] = 'error3';
			echo json_encode($response_array);
			return;
		} 

		$sql = "INSERT INTO GuestSurvey (id, answer)
		VALUES ('$entree[surveyid]', '$entree[surveyansw]')";

		if ($conn->query($sql) === TRUE) {
		    //echo "New record created successfully";
		    $conn->close();
			$response_array['status'] = 'success';
			echo json_encode($response_array);
			return;
		} else {
			$conn->close();
		    $response_array['status'] = 'duplicate';
			echo json_encode($response_array);
			return;
		}		

	}else{

		$response_array['status'] = 'error3';
		echo json_encode($response_array);
		return;

	}



?>