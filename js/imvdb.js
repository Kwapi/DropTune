
function imvdb_getSongOfficialVideo(songTitle, artistName) {

    var url = 'https://imvdb.com/api/v1/search/videos';
    var artist = artistInfo.name;
    var track = songInfo.name;
    var query = artist + " " + track;
    // replace white space with "+"
    query = whiteSpaceTo(query,'+');

    var args = {
        'q': query
    };

    $.getJSON(url, args,
        //works
        function (data) {
            if (data.total_results > 0) {
                var musicVideoInfo = data.results[0]; //best match

                //  make sure we got the right video
                //  todo: document that IMVDB is unreliable as fuck

                if(musicVideoInfo.artists[0].name == artistInfo.name
                    && musicVideoInfo.song_title == songInfo.name){

                    songInfo.imvdbID = musicVideoInfo.id.toString();
                    dsp_songOfficialVideo(songInfo.imvdbID);

                    console.log("IMVDB - getSongOfficialVideo - success");


                }





            } else {
                console.log("query: " + query);
                console.error("Can't find music video for " + artist + " " + track);
            }
        },
        //doesn't work
        function () {
            console.error("Trouble accessing imvdb API");
        }
    );


}

function dsp_songOfficialVideo(songIMVDBID){
    // clear
    $("#IMVDBModal").html("");

    $('<div/>', {
        'id': 'imvdbEmbed',
        'class': 'imvdb-embed',
        'data-embed-type': 'video',
        'data-id': songInfo.imvdbID,
        'data-include-credits': 'y'
    }).appendTo("#IMVDBModal");

    // todo: document dynamic script insertion

    $('<script/>',{
        'type':"text/javascript",
        'src':"//s3.amazonaws.com/static.imvdb.com/embed.min.js",
        'charset':"utf-8"
    }).insertAfter("#imvdbEmbed");


    $('#imvdbVidButton').removeClass("disabled").addClass("active");

}




/**
 * Deprecated
 * @param musicVideoInfo
 */
function getYouTubeMusicVideoByIMVDBInfo(musicVideoInfo) {

    var trackID = musicVideoInfo.id;
    var url = "https://imvdb.com/api/v1/video/" + trackID + "?include=sources";
    var corsFixedUrl = corsPrefixHack + url;

    //get sources for the music video
    $.getJSON(corsFixedUrl,
        //works
        function (data) {
            console.log(data);
            var youtubeID = extractFirstYouTubeId(data.sources);

            embedYouTubeVideo(youtubeID, "musicVIdeoIMVDBYouTubeEmbedded")
        },
        //doesn't work
        function () {
            console.error("Trouble accessing imvdb API");
        }
    );
}

function extractFirstYouTubeId(sources) {

    //loop through all sources
    //return first youtubeID found
    for (var i = 0; i < sources.length; i++) {

        var currSource = sources[i];

        if (currSource.source === "youtube") {
            return youtubeID = currSource.source_data;

        }
    }
}





