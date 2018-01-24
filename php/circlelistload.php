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


		$circlelistid = $entree['section'];

		$list = array();
		$sql_bth = "SELECT * FROM BOOTH ORDER BY circlename ASC";

		if ($circlelistid == 100){
			$sql_bth = "SELECT * FROM BOOTH WHERE (circlename RLIKE '^[ㄱㄲㄴㄷㄸ]' OR (circlename >=  '가' AND circlename <  '라')) ORDER BY circlename ASC";
		}
		elseif ($circlelistid == 200){
			$sql_bth = "SELECT * FROM BOOTH WHERE (circlename RLIKE '^[ㄹㅁㅂㅃㅅㅆㅇ]' OR (circlename >=  '라' AND circlename <  '자')) ORDER BY circlename ASC";
		}
		elseif ($circlelistid == 300){
			$sql_bth = "SELECT * FROM BOOTH WHERE (circlename RLIKE '^[ㅈㅉㅊㅋㅍㅌㅎ]' OR (circlename >=  '자')) ORDER BY circlename ASC";
		}
		elseif ($circlelistid == 400){
			$sql_bth = "SELECT * FROM BOOTH WHERE circlename < '가' ORDER BY circlename ASC";
		}

		
		$result_bth = $conn->query($sql_bth);
		
		if($result_bth->num_rows > 0){		

			while($booth = $result_bth->fetch_assoc()) {
				$sql = "SELECT webaddr1, webbanner1, webaddr2, webbanner2 FROM BASIC where one_id ='$booth[one_id]'";
				$result = $conn->query($sql);
				$basic = $result->fetch_assoc();
				
				$circleinfo = nl2br($booth['circleinfo'], false);
				$booth['circleinfo'] = $circleinfo;

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


	}else{

		$response_array['status'] = 'error4';
		echo json_encode($response_array);
		return;

	}








	





?>