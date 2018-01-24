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





	if($entree["chk"] == 'adloadpollvisitor'){		

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die();
		    $response_array['status'] = 'error2';
			$return_array = array(
	               'statusC' => $response_array);
	        echo json_encode($return_array);
	        return;
		} 

		$conn->query("set session character_set_connection=utf8");
		$conn->query("set session character_set_results=utf8");
		$conn->query("set session character_set_client=utf8");


		$sql_one = "SELECT * FROM GuestSurvey WHERE answer='one'";
		$result_one = $conn->query($sql_one);
		$num_one = $result_one->num_rows;


		$sql_two = "SELECT * FROM GuestSurvey WHERE answer='two'";
		$result_two = $conn->query($sql_two);
		$num_two = $result_two->num_rows;


		$sql_three = "SELECT * FROM GuestSurvey WHERE answer='three'";
		$result_three = $conn->query($sql_three);
		$num_three = $result_three->num_rows;


		$num = array(
		    		'one' => $num_one,
		    		'two' => $num_two,
		    		'three' => $num_three
		    	);


		$conn->close();

		$response_array['status'] = 'success';

		$return_array = array(
            'statusC' => $response_array,
            'num' => $num
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