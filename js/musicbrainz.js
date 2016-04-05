
function getMusicbrainzLinks(musicbrainzID) {

    var url = 'http://musicbrainz.org/ws/2/artist/' + musicbrainzID;

    var args = {
        inc: "url-rels",
        fmt: "json"
    };

    $.getJSON(url, args,
        function (data) {
            explodeMusicbrainzLinks(data.relations);
        },
        function () {
            alert("Error obtaining musicbrainz data");
        }
    )
}

function explodeMusicbrainzLinks(relations){

    //REMEMBER TO REMOVE ACTIVE AND ADD DISABLED TO ALL LINKS FIRST

    var found = false;
    for(var i=0; i<relations.length; i++){
        var relation = relations[i];
        var found = false;
        var url = relations[i].url.resource;
        switch(relation.type){
            case "soundcloud":
                $("#soundcloud").addClass("active");
                $("#soundcloud").attr("href",url);
                found=true;
                break;
            case "wikipedia":
                $("#wikipedia").addClass("active");
                $("#wikipedia").attr("href",url);
                found=true;
                break;
            case "youtube":
                $("#youtube").addClass("active");
                $("#youtube").attr("href",url);
                found=true;
                break;
        }

        if(!found){
            if(url.indexOf("instagram")){
                $("#instagram").addClass("active");
                $("#instagram").attr("href",url);
            }else if(url.indexOf("rateyourmusic")){
                if(url.indexOf("rateyourmusic")){
                    $("#rateyourmusic").addClass("active");
                    $("#rateyourmusic").attr("href",url);
                }
            }
        }
    }
}