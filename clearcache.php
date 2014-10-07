<?php
	
	$response = array(
		'before' => array(
			'files' => 0,
			'size' => 0
		), 
		'after' => array(
			'files' => 0,
			'size' => 0
		)
	);

	$paths = array(
		dirname(__FILE__) . '/.cache/*',
		dirname(__FILE__) . '/media/styles/*.min.map'
	); 

	foreach ($paths as $path) {
 
		$response['before']['files'] += (int) array_sum( array_map('count',  glob($path)));
		$response['before']['size'] += (int) array_sum( array_map('filesize',  glob($path)));
 
		array_map('unlink', glob($path));

		$response['after']['files'] += (int) array_sum( array_map('count',  glob($path)));
		$response['after']['size'] += (int) array_sum( array_map('filesize',  glob($path)));
		  
	}
 

	header("HTTP/1.1 200 OK");
	header('Content-Type: application/json');
	print_r(json_encode($response));
	exit;