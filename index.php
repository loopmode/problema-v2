<?php
require('./includes/app/App.php');

$site = new App();
$site->init(getcwd());
//die('/' . $_GET['page']);
echo $site->render('/' . $_GET['route']);