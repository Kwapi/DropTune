<?php
require_once 'connect.php';
if($_GET["spotifyId"]) {

    $spotifyId = $_GET["spotifyId"];

    $stmt = $db->prepare("SELECT AVG(rating) as averageRating, COUNT(rating) as count FROM review WHERE spotifyId=?");

    $stmt->bind_param("s", $spotifyId);

    $stmt->execute();

    $stmt->bind_result($averageRating, $count);

    $reviewsArr = array();

    //we've got some reviews
    while ($stmt->fetch()) {
        $arr[] = array("averageRating"=>$averageRating,"count"=>$count);
    }

    $stmt->close();
    $db->close();

    echo $json_response = json_encode($arr);
}
?>