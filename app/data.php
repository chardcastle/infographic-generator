<?php



try {

	$url = "http://hienzblaze.iriscouch.com/little-bird/66c8bc041c4ae99fd9ae35dd82000f1a";

	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$data = curl_exec($ch);
	curl_close($ch);
	
	header('Content-type: application/json');

	// echo $data;
	$json = json_decode($data);
	
	$result = (isset($json->measurements) ? $json->measurements : array('error' => 'unknown'));
	echo json_encode($result);
	// var_dump(print_r(json_encode($result),true));
	// die('here');
	exit;

} catch (Exception $e) {
	echo $e->getMessage();
}
exit;

// $data = (isset($data['measurements'])) ? $data['measurements'] : array();
// echo json_encode($data);

// exit;