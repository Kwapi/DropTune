<?php
require_once 'connect.php';
if($_GET["spotifyId"]) {

    $spotifyId = $_GET["spotifyId"];
    $orderBy = $_GET["orderBy"];

    if($orderBy == 'rank') {


        $stmt = $db->prepare("SELECT id,text,posted,rating,rank FROM review WHERE spotifyId=? ORDER BY rank DESC");
    }

    if($orderBy == 'posted'){
        $stmt = $db->prepare("SELECT id,text,posted,rating,rank FROM review WHERE spotifyId=? ORDER BY posted DESC");
    }
    $stmt->bind_param("s", $spotifyId);

    $stmt->execute();

    $stmt->bind_result($id,$text,$posted,$rating,$rank);

    $reviewsArr = array();

    //we've got some reviews
    while ($stmt->fetch()) {
        $reviewsArr[] = array("reviewID"=>$id,"text" => $text,"posted"=>$posted,"rating"=>$rating,"rank"=>$rank);
    }

    $stmt->close();
    $db->close();

    echo $json_response = json_encode($reviewsArr);
}
?>