<?php
$db = new mysqli('localhost', 'root', '', 'musicbox');

if ($db->connect_errno){
	die('Sorry, we are having some problems.');
}
?>