<?php

require(dirname(__FILE__) . '/../libs/h2o/h2o.php');
 
class App {

	private $defaultRoute = '/index';
	private $notFoundRoute = '/404';
  
	function init($baseDir) {
		$this->cacheDir = $baseDir . '/.cache';
		$this->dataDir = $baseDir . '/data';
		$this->templateDir = $baseDir . '/templates';
	}

	function render($route) {
		
		$navigation = json_decode(file_get_contents(dirname(__FILE__) . '/navigation.json'));
		
		if (!isset($route) || !$route) {
			$route = $this->defaultRoute;
		} 
		else if (!$this->pageExists($route, $navigation)) {
			$route = $this->notFoundRoute;
		}
	
 
		// serve the content part only for ajax requests, the full page for regular requests
		$templateFile =  ($this->templateDir . '/pages/' . $route) . '/' . (isset($_SERVER['HTTP_X_REQUESTED_WITH']) ? 'content.html' : 'index.html');
 		if ($route == 'index') {
			return $this->templateDir . '/index.html';
		}

		// create h2o template
		$template = new H2o($templateFile, array(
		    'cache_dir' => $this->cacheDir,
		    'autoescape' => false
		)); 
 
 		// prepare template data
		$page = new stdClass();
		$page->id = $route;
		$page->nav = $navigation;
		$page->params = json_encode($_GET);

		// optionally add extra data from json
		$dataFile = $this->dataDir . '/' . $route . '.json';
		if (file_exists($dataFile)) {
			$page->data = json_decode(file_get_contents($dataFile), true);
		}

		// render template with data
		return $template->render(compact('page')); 
	}

	function pageExists($route, $navigation) {

		foreach ($navigation as $section) {
			foreach($section->items as $item) {
				if ($item->route == $route) {
					return true;
				}
			}
		}
 
		return false;
	}
  
 
}