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



	$sql = "SELECT * FROM BASIC WHERE one_id > 101 ORDER BY one_id ASC";
	$result = $conn->query($sql);

	$list = array();
	$boothnum = 0;
	$circleone = 0;
	$portnum = 0;
	$tcardnum = 0;
	$illustnum = 0;

	if($result->num_rows > 0){

		while($basic = $result->fetch_assoc()) {

			$oneid = $basic['one_id'];
			$cat = "";
			$cat = $basic['boothstatus'] . "/" . $basic['portraitstatus'] . "/" . $basic['tradecardstatus'] . "/" . $basic['illuststatus'];

			$booth = array();
			$boothsize = "";
			if ($basic["boothstatus"] != ""){
				$sql_bth = "SELECT circlesize FROM BOOTH WHERE one_id='$oneid'";
				$result_bth = $conn->query($sql_bth);
				$booth = $result_bth->fetch_assoc();
				$boothsize = $booth['circlesize'];
				$boothnum++;
				if($boothsize === '한부스'){
					$circleone++;
				}
			}

			$portrait = array();
			$portraitchar = "";
			if ($basic["portraitstatus"] != ""){
				$sql_prt = "SELECT portraitdesirechar FROM PORTRAIT WHERE one_id='$oneid'";
				$result_prt = $conn->query($sql_prt);
				$portrait = $result_prt->fetch_assoc();
				$portraitchar = $portrait['portraitdesirechar'];
				$portnum++;
			}

			$tcard = array();
			$tcardtype = "";
			$tcardchar = "";
			if ($basic["tradecardstatus"] != ""){
				$sql_tcard = "SELECT tctypeA, tctypeB, tcdesirechar FROM TRADECARD WHERE one_id='$oneid'";
				$result_tcard = $conn->query($sql_tcard);
				$tcard = $result_tcard->fetch_assoc();
				$tcardtype = $tcard['tctypeA'] . "  " . $tcard['tctypeB'];
				$tcardchar = $tcard['tcdesirechar'];
				$tcardnum++;
			}

			$illust = array();
			$illusttype = "";
			if ($basic["illuststatus"] != ""){
				$sql_ilst = "SELECT illusttype FROM ILLUST WHERE one_id='$oneid'";
				$result_ilst = $conn->query($sql_ilst);
				$illust = $result_ilst->fetch_assoc();
				$illusttype = $illust['illusttype'];
				$illustnum++;
			}


			$userdata = array(
				'oneid' => $basic['one_id'],
				'submittime' => $basic['submittime'],
				'name' => $basic['name'],
				'birthdate' => $basic['birthdate'],
				'email' => $basic['contactemail'],
				'phone' => $basic['contactphone'],
				'categories' => $cat,
				'boothsize' => $boothsize,
				'portraitchar' => $portraitchar,
				'tcardtype' => $tcardtype,
				'tcardchar' => $tcardchar,
				'illtype' => $illusttype
			);


			array_push($list, $userdata);



    	} // end of while loop	
		

		$numbers = array(
			'boothnum' => $boothnum,
			'circleone' => $circleone,
			'portnum' => $portnum,
			'tcardnum' => $tcardnum,
			'illustnum' => $illustnum
		);

		$response_array['status'] = 'success';		
		

		$return_array = array(
            'statusC' => $response_array,
            'numbers' => $numbers,
            'list' => $list
        );
		echo json_encode($return_array);
		return;

	}else{
		$response_array['status'] = 'error';
		$return_array = array(
            'statusC' => $response_array);
    	echo json_encode($return_array);
    	return;
	}







?>