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


	if($_SESSION["ad"] != 'in'){
		$response_array['status'] = 'notin';
		$return_array = array(
               'statusC' => $response_array);
            echo json_encode($return_array);
      	return;
	}



	
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




	$list = array();

	$sql_bth = "SELECT * FROM BOOTH WHERE one_id > 101 ORDER BY one_id ASC";
	$result_bth = $conn->query($sql_bth);
	
	if($result_bth->num_rows > 0){		

		while($booth = $result_bth->fetch_assoc()) {
			$sql = "SELECT * FROM BASIC where one_id ='$booth[one_id]'";
			$result = $conn->query($sql);
			$basic = $result->fetch_assoc();

			$userdata = array(
				'basic' => $basic,
				'booth' => $booth				
			);

			array_push($list, $userdata);

		}

	}			

	$response_array['status'] = 'success';		
	

	$return_array = array(
        'statusC' => $response_array,
        'list' => $list
    );
	echo json_encode($return_array);
	return;





?>