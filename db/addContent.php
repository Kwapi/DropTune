<?php
require_once 'connect.php';
if(isset($_GET['link'])){
    $link = $_GET["link"];
    $spotifyId = $_GET["spotifyId"];
    $description = $_GET["description"];
    $category = $_GET["category"];
    $title = $_GET["title"];
    $rank = 0;
    $stmt = $db->prepare("INSERT INTO content (link,category,posted,rank,description,spotifyId,title)
		VALUES (?,?,NOW(),?,?,?,?)");

    $stmt->bind_param("ssisss",$link,$category,$rank,$description,$spotifyId,$title);

    $stmt->execute();
    $stmt->close();

    echo $json_response = json_encode('success');
}
?>