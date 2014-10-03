<?php

require './vendor/h2o/h2o.php';

// pageId - determine which page to show
//----------------------------------------------------------
$pageId = 'index';
$isAjaxRequest = isset($_GET['ajax']);

if (isset($_GET['page'])) {
	$pageId = $_GET['page'];
	if (!file_exists(templatePath($pageId))) {
		$pageId = '404';
	}
}





// render page
//----------------------------------------------------------
$template = new H2o(templatePath($pageId, $isAjaxRequest), array(
    'cache_dir' => './tmp'
)); 
$page = templateData($pageId);
$html = $template->render(compact('page'));
echo $html;






// helper functions
//----------------------------------------------------------
function templatePath($pageId, $isAjaxRequest=false) {
	$dir = './';
	$file = '';

	switch ($pageId) {
		case 'index':
		case '404':
			$dir .= 'templates';
			$file = $pageId . '.html';
			break;
		default: 
			$dir .= 'pages/' . $pageId;
			$file = $isAjaxRequest ? 'content.html' : 'index.html';
	}	

	return $dir . '/' . $file;
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
