<?php
	header('Content-Type: application/json');
	session_start();


	$response_array['status'] = 'error';



	if($_SESSION["ad"] == 'in'){
		$response_array['status'] = 'success';
	}else{
		$response_array['status'] = 'error';
	}



	echo json_encode($response_array);
	return;




?>