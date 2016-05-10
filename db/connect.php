<?php
$db = new mysqli('localhost', 'root', '', 'droptune');

if ($db->connect_errno){
	die('Sorry, we are having some problems.');
}
?>