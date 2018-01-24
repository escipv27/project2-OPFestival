<?php
	header('Content-Type: application/json');
	session_start();


	$response_array['status'] = 'error';

	
	if($_SESSION["timeout"] + 59 * 60 < time()){
		$response_array['status'] = 'timeout';
		$_SESSION["on"] == 'out';
		echo json_encode($response_array);
		return;
	}

	if($_SESSION["on"] == 'in'){
		$response_array['status'] = 'in';
	}else{
		$response_array['status'] = 'out';
	}



	echo json_encode($response_array);
	return;




?>