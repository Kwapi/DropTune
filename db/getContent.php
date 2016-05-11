<?php
require_once 'connect.php';
if($_GET["spotifyId"]) {

    $spotifyId = $_GET["spotifyId"];
    $orderBy = $_GET["orderBy"];
    $filter = $_GET["filter"];
    if($filter == 'all') {
        if ($orderBy == 'rank') {
             $stmt = $db->prepare("SELECT id,title,link,category,posted,rank,description,spotifyId FROM content WHERE spotifyId=?  ORDER BY rank DESC");
        }else{
            $stmt = $db->prepare("SELECT id,title,link,category,posted,rank,description,spotifyId FROM content WHERE spotifyId=? ORDER BY posted DESC");
        }
        $stmt->bind_param("s", $spotifyId);
    }else{
        if ($orderBy == 'rank') {

            $stmt = $db->prepare("SELECT id,title,link,category,posted,rank,description,spotifyId FROM content WHERE spotifyId=? AND category=? ORDER BY rank DESC");
        }else{
            $stmt = $db->prepare("SELECT id,title,link,category,posted,rank,description,spotifyId FROM content WHERE spotifyId=? AND category=? ORDER BY posted DESC");

        }
        $stmt->bind_param("ss", $spotifyId, $filter);
    }


    $stmt->execute();

    $stmt->bind_result($id,$title,$link,$category,$posted,$rank,$description,$spotifyId);

    $contentArr = array();

    //we've got some reviews
    while ($stmt->fetch()) {
        $contentArr[] = array("contentID"=>$id,"title"=>$title,"link" => $link,"category" =>$category, "posted"=>$posted,"rank"=>$rank, "description" => $description, "spotifyId" => $spotifyId);
    }

    $stmt->close();
    $db->close();

    echo $json_response = json_encode($contentArr);
}
?>