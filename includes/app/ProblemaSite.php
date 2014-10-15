<?php

require(dirname(__FILE__) . '/../libs/h2o/h2o.php');
 
class ProblemaSite {

	private $PAGE_ID_DEFAULT = 'index';
	private $PAGE_ID_ERROR = '404';

	private $baseDir;
	private $navigation;

	function __construct($baseDir) {
		$this->baseDir = $baseDir;		
		$this->navigation = json_decode(file_get_contents(dirname(__FILE__) . '/outline.json'));
	}

	public function render($route) {
		
		if (!isset($route) || !$route) $route = $this->PAGE_ID_DEFAULT;
		if (!$this->pageExists($route)) $route = $this->PAGE_ID_ERROR;
 
		$template = new H2o($this->getPageTemplate($route), array(
		    'cache_dir' => $this->baseDir . '/.cache',
		    'autoescape' => false
		)); 

		$page = $this->getPageData($route);
		return $template->render(compact('page'));;

 
	}

	private function pageExists($route) {
		if ($route == 'index') {
			return true;
		}
		foreach ($this->navigation as $section) {
			foreach($section->items as $item) {
				if ($item->route == $route) {
					return true;
				}
			}
		}
	 
		return false;
	}

	
	private function getPageTemplate($route) {
		
		$isAjaxRequest = isset($_SERVER['HTTP_X_REQUESTED_WITH']);

		switch ($route) {
			case 'index':
				return $this->baseDir . '/templates/index.html';
			default: 
				return $this->baseDir . '/templates/pages/' . $route . '/' . ($isAjaxRequest ? 'content.html' : 'index.html');
		}	
	} 

	private function getPageData($route) {
		
		$dataFile = $this->baseDir . '/pages/' . $route . '/data.json';

		$data = array(
			'id' 			=> $route,
			'navigation' 	=> $this->navigation,
			'params' 		=> json_encode($_GET),
			'data'			=> file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : array()
		);

		return $data;
	}



}