<?php
require_once 'connect.php';
if(isset($_GET['vote'])){
    $vote = $_GET['vote'];
    $id = $_GET['review_id'];
    $stmt = $db->prepare("UPDATE review SET rank=rank+? WHERE id=?");

    $stmt->bind_param("ii",$vote,$id);

    $stmt->execute();
    $stmt->close();

    echo $json_response = json_encode('success');
}
?>