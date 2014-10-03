<?php
require_once '../vendor/less/Less.php';

if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}

try {
	header("Content-type: text/css");

	$cache_dir = '.cache';
	$import_dirs = array(
		'../scripts/vendor/bootstrap/less/' => ''
	);
	$less_files = array( './less/problema.less' => '/styles/' );
	$options = array(
		'cache_dir' => $cache_dir, 
		'import_dirs' => $import_dirs,
		'compress'=>true 
	);
	$css_file_name = Less_Cache::Get( $less_files, $options );
	$compiled = file_get_contents( $cache_dir . '/' . $css_file_name );
	echo $compiled;
}
catch (Exception $e) {
	echo $e->getMessage();
}


