<?php
	header('Content-Type: application/json');
	session_start();

	$_SESSION["ad"] = "out";



	$servername = "localhost";
	$username = "pieceonly";
	$password = "oneon240";
	$dbname = "pieceonly";

	$json = $_POST['json'];
	$entree = json_decode($json, true);


	$response_array['status'] = 'error1';



		

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

		
	$sql = "SELECT * FROM LGC WHERE one_id='100'";
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();


	if($row["password"] === $_POST['admin_password']){
		$conn->close();		
		$_SESSION["ad"] = 'in';

		$response_array['status'] = 'success';
		echo json_encode($response_array);
		return;
	}else{
		// login email does not exist
		$conn->close();
		$response_array['status'] = 'error';
		echo json_encode($response_array);
		return;
	}






?>