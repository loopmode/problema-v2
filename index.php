<?php

require('./includes/app/ProblemaSite.php');
$site = new ProblemaSite(getcwd());
echo $site->render($_GET['page']);