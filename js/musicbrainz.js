
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

    for(var i=0; i<relations.length; i++){
        var relation = relations[i];
        switch(relation.type){
            case "soundcloud":
                $("#soundcloud").addClass("active");
                $("#soundcloud").attr("href",relations[i].url.resource);
                break;
            case "wikipedia":
                $("#wikipedia").addClass("active");
                $("#wikipedia").attr("href",relations[i].url.resource);
                break;
            case "youtube":
                $("#youtube").addClass("active");
                $("#youtube").attr("href",relations[i].url.resource);
                break;
        }
    }
}