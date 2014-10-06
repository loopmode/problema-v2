<?php
$base = dirname(__FILE__) . '/../../';

require_once $base . 'vendor/less/Less.php';

if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}

try {
	header("Content-type: text/css");

	$options = array(
		'cache_dir' => $base . '.cache', 
		'import_dirs' => array(
			//$base . 'media/scripts/lib/bootstrap/less/' => ''
		),
		'compress'=>true 
	);
	
	//print_r($options);die;

	$less_files = array( $base . 'less/problema.less' => $base . 'media/styles/' );
	$css_file_name = Less_Cache::Get( $less_files, $options );

	$compiled = file_get_contents( $options['cache_dir'] . '/' . $css_file_name );
	echo $compiled;
}
catch (Exception $e) {
	echo $e->getMessage();
}
