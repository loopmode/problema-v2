<?php

if (isset($_GET['clearcache'])) {
	array_map('unlink', glob(dirname(__FILE__) . '/.cache/*'));
	die('cache cleared');
}


require './vendor/h2o/h2o.php';


// pageId - determine which page to show
//----------------------------------------------------------
$pageId = 'index';
$isAjaxRequest = isset($_SERVER['HTTP_X_REQUESTED_WITH']);
if (isset($_GET['page'])) {
	$pageId = $_GET['page'];
	if (!file_exists(templateFile($pageId))) {
		$pageId = '404';
	}
}
 

// render page
//----------------------------------------------------------
$file = templateFile($pageId, $isAjaxRequest);
$data = templateData($pageId);
$template = new H2o($file, array(
    'cache_dir' => dirname(__FILE__) . '/.cache'
)); 

$page = $data;
$html = $template->render(compact('page'));
echo $html;



// template helpers
//----------------------------------------------------------
function templateFile($pageId, $isAjaxRequest=false) {
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
		'id' => $pageId
	);
	$file = './pages/' . $pageId . '/data.json';
	if (file_exists($file)) {
		$data['data'] = json_decode(file_get_contents($file), true);
	}
	return $data;
}
