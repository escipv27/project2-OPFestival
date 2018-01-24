<?php
	header('Content-Type: application/json');
	session_start();

	$json = $_POST['json'];
	$entree = json_decode($json, true);

	$response_array['status'] = 'error1';


	$servername = "localhost";
	$username = "pieceonly";
	$password = "oneon240";
	$dbname = "pieceonly";


	if($_SESSION["ad"] != 'in'){
		$response_array['status'] = 'notin';
		$return_array = array(
               'statusC' => $response_array);
            echo json_encode($return_array);
      	return;
	}

	

	if($entree["chk"] == 'adloadcheer'){		

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


		$sql = "SELECT * FROM GuestCheer ORDER BY id DESC";
		$result = $conn->query($sql);


		$list = array();

		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		    	$line = array(
		    		'chname' => $row["cheername"],
		    		'chtext' => $row["cheertext"]
		    		);
		    	array_push($list, $line);		        
		    }
		} else {
		    $response_array['status'] = 'error2';
			$return_array = array(
	               'statusC' => $response_array);
	        echo json_encode($return_array);
	    	return;
		}
		$conn->close();




		$response_array['status'] = 'success';

		$return_array = array(
            'statusC' => $response_array,
            'list' => $list
         );

		echo json_encode($return_array);

		return;


	}else{
		$response_array['status'] = 'error3';
		$return_array = array(
               'statusC' => $response_array);
            echo json_encode($return_array);
      	return;
	}



?>