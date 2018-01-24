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


	// duplicate check on name

	if($entree["chk"] == 'duplicatename'){		

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

		$basic_name = $entree['basic_name'];
		$sql = "SELECT one_id, name FROM BASIC WHERE name='$basic_name'";
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();



		if ($result->num_rows > 0) {
		    // name already exist
			if($_SESSION["id"] == $row['one_id']){
				$response_array['status'] = 'successmod';
				// already logged in person checking for nick name duplicate
			}else{
				$response_array['status'] = 'duplicate';
			}		    

		}else {
		    // name is okay to use
		    $response_array['status'] = 'success';
		}

		$conn->close();		

		$return_array = array(
            'statusC' => $response_array,
         );

		echo json_encode($return_array);

		return;
	}

	// duplicate check on phone number
	if($entree["chk"] == 'duplicatephone'){		

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

		$basic_phone = $entree['basic_contactphone'];
		$sql = "SELECT * FROM BASIC WHERE contactphone='$basic_phone'";
		$result = $conn->query($sql);




		if ($result->num_rows > 0) {	    
		    //  already exist
		    $response_array['status'] = 'duplicate';

		} else {
		    // is okay to use
		    $response_array['status'] = 'success';
		}

		$conn->close();		

		$return_array = array(
            'statusC' => $response_array,
         );

		echo json_encode($return_array);

		return;
	}

	// duplicate check on phone  email
	if($entree["chk"] == 'duplicateemail'){		

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

		$basic_email = $entree['basic_contactemail'];
		$sql = "SELECT * FROM BASIC WHERE contactemail='$basic_email'";
		$result = $conn->query($sql);




		if ($result->num_rows > 0) {	    
		    // already exist
		    $response_array['status'] = 'duplicate';

		} else {
		    //  is okay to use
		    $response_array['status'] = 'success';
		}

		$conn->close();		

		$return_array = array(
            'statusC' => $response_array,
         );

		echo json_encode($return_array);

		return;
	}





?>