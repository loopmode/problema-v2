<?php
$path = dirname(__FILE__) . '/../../';
$configFile = $path . 'config.json';
$config = json_decode(file_get_contents($configFile)); 
$webroot = $config->root;
 
require_once $path . 'libs/less/Less.php';
 

if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}

try {
	header("Content-type: text/css");

	$options = array(
		'cache_dir' => $path . '.cache', 
		'import_dirs' => array(
			$path . 'media/fonts/' => $webroot . '/media/fonts/',
			$path . 'less/libs/',
		),

		'compress'=>true,	
		
		'sourceMap' => true,
		
		'sourceMapWriteTo'  => $path . '/media/styles/problema.min.map',
    	'sourceMapURL'      => $webroot . '/media/styles/problema.min.map',

    	'sourceMapBasepath' => str_replace('\\', '/', realpath($path)),
    	'sourceMapRootpath' => $webroot,
	);
 
	//print_r($options);die;

	$less_files = array(
		$path . 'less/problema.less' => $webroot. 'media/styles/'
	);
	$css_file_name = Less_Cache::Get( $less_files, $options );

	$compiled = file_get_contents( $options['cache_dir'] . '/' . $css_file_name );
	echo $compiled;
}
catch (Exception $e) {
	echo $e->getMessage();
}
