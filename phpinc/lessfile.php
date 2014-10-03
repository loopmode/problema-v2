<?php
/**
 * a lessc wrapper
 *
 * @author Jovica Aleksic
*/

require_once '../vendor/less/Less.php';

class lessfile {
	
	function __construct($lessc, $inputFile, $cacheDir="cache") {		
		$this->lessc = $lessc;
		$this->inputFile = $this->realpath($inputFile);
 		$this->cacheDir = $this->realpath(__DIR__ . '/' . str_replace(__DIR__, '', $cacheDir));
		$this->cacheFile = $this->realpath($this->cacheDir . '/' . basename($inputFile) . '.cache');
	}

	private function realpath($path) {
 		return str_replace(array("\\", '/'), '/', $path);
	}

	public function getContents() {

		if (!is_dir($this->cacheDir)) { 
			mkdir($this->cacheDir, 0777, true); 
		}

		if (file_exists($this->cacheFile)) {
			$cache = unserialize(file_get_contents($this->cacheFile));
		} else {
			$cache = $this->inputFile;
		}

		$buffer = $this->lessc->cachedCompile($cache);
		$compiled = $buffer['compiled'];

		if (!is_array($cache) || $buffer['updated'] > $cache['updated']) {
			file_put_contents($this->cacheFile, serialize($buffer));
			$compiled = '/* --- compiled ' . date("Y-m-d H:i:s") . ' --- */' . PHP_EOL . $compiled;
		}

		return $compiled;

	}
 
}