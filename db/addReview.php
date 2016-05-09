<?php
require_once 'connect.php';
if(isset($_GET['review'])){
    $review = $_GET["review"];
    $spotifyId = $_GET["spotifyId"];
    $rating = $_GET["rating"];
    $rank = 0;
    $stmt = $db->prepare("INSERT INTO review (spotifyId,text,rating,rank,posted)
		VALUES (?,?,?,?,NOW())");

    $stmt->bind_param("ssii",$spotifyId,$review,$rating,$rank);

    $stmt->execute();
    $stmt->close();

    echo $json_response = json_encode('success');
}
?>