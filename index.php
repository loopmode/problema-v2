<?php

require './vendor/h2o/h2o.php';

// setup pageId
//-----------------------------
$pageId = 'index';
$isAjaxRequest = isset($_GET['ajax']);

if (isset($_GET['page'])) {
	$pageId = $_GET['page'];
	if (!file_exists(templatePath($pageId))) {
		$pageId = '404';
	}
}





// render page
//-----------------------------
$template = new H2o(templatePath($pageId, $isAjaxRequest), array(
    'cache_dir' => '/.cache'
)); 
$page = templateData($pageId);
echo $template->render(compact('page'));



// helper functions
//-----------------------------

function templatePath($pageId, $isAjaxRequest=false) {
	$dir = './';

	switch ($pageId) {
		case 'index':
		case '404':
			$dir .= 'templates';
			break;
		default: 
			$dir .= 'content/' . $pageId;
	}	

	return $dir . '/' . ($isAjaxRequest ? 'content' : $pageId) . '.html';
}

 
function templateData($pageId) {
	$data = array(
		'id' => $pageId
	);
	$file = './content/' . $pageId . '/' . $pageId . '.json';
	if (file_exists($file)) {
		$data['data'] = json_decode(file_get_contents($file), true);
	}
	return $data;
}
