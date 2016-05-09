<?php
require_once 'connect.php';
if($_GET["spotifyId"]) {

    $spotifyId = $_GET["spotifyId"];

    $stmt = $db->prepare("SELECT id,title,link,category,posted,rank,description,spotifyId FROM content WHERE spotifyId=? ORDER BY rank DESC");

    $stmt->bind_param("s", $spotifyId);

    $stmt->execute();

    $stmt->bind_result($id,$title,$link,$category,$posted,$rank,$description,$spotifyId);

    $contentArr = array();

    //we've got some reviews
    while ($stmt->fetch()) {
        $contentArr[] = array("id"=>$id,"title"=>$title,"link" => $link,"category" =>$category, "posted"=>$posted,"rank"=>$rank, "description" => $description, "spotifyId" => $spotifyId);
    }

    $stmt->close();
    $db->close();

    echo $json_response = json_encode($contentArr);
}
?>