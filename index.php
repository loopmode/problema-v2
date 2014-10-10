<?php

if (isset($_GET['clearcache'])) {
	require('clearcache.php');
	exit;
}
 
require('./libs/h2o/h2o.php');

// pageId - determine which page to show
//----------------------------------------------------------
$pageId = 'index';
if (isset($_GET['page'])) {
	$pageId = $_GET['page'];
	if (!file_exists(templateFile($pageId))) {
		$pageId = '404';
	}
}
 

// render page
//----------------------------------------------------------
$file = templateFile($pageId);
$data = templateData($pageId);
$template = new H2o($file, array(
    'cache_dir' => dirname(__FILE__) . '/.cache',
    'autoescape' => false
)); 

$page = $data; 
$html = $template->render(compact('page'));
echo $html;



// template helpers
//----------------------------------------------------------
function templateFile($pageId) {
	$isAjaxRequest = isset($_SERVER['HTTP_X_REQUESTED_WITH']);
	switch ($pageId) {
		case 'index':
			return './templates/index.html';
		default: 
			$dir = './pages/' . $pageId;
			$file = $isAjaxRequest ? 'content.html' : 'index.html';
			return $dir . '/' . $file;
	}	
} 
function templateData($pageId) {
	$data = array(
		'id' => $pageId,
		'params' => json_encode($_GET)
	);

	$file = './pages/' . $pageId . '/data.json';
	if (file_exists($file)) {
		$data['data'] = json_decode(file_get_contents($file), true);
	}
	return $data;
}
