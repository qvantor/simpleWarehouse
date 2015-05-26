<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
    $_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
}

include 'lib/MysqliDb.php';
include 'lib/router.php';
include 'lib/class.php';
include 'lib/parent_protect.php';

$callHandler = new router();
$callHandler ->navigate();
?>