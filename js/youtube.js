
function yt_getSongVideo(artistName, songTitle){
    var query = artistInfo.name + "+" + songInfo.name;
    var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q:    query,
        maxResults: 1
    });

    //execute the request
    request.execute(function(response){


        songInfo.youtubeID = response.items[0].id.videoId; //best match

        dsp_songVideo(songInfo.youtubeID);
    });
}

/**
 * Called when google client is ready and the script is loaded
 */
function googleAPIinit(){
    gapi.client.setApiKey(youTubeAPIKey);
    gapi.client.load('youtube','v3',function(){
        if(exists(songInfo.name) && exists(artistInfo.name)){
            yt_getSongVideo(songInfo.name, artistInfo.name);
        }else{
            setTimeout(function(){
                yt_getSongVideo(songInfo.name, artistInfo.name);
            },5000);
        }
    })
}

function dsp_songVideo(songYoutubeID){

    var src="https://www.youtube.com/embed/"+songYoutubeID;

    var $modalContent = $('#YouTubeVideoModal').children('.modal-content');
    $modalContent.html("");

    $('<iframe />', {
        src: src,
        width: "560",
        height: "315",
        frameborder: "0",
        allowfullscreen: "true"
    }).appendTo($modalContent);

    $('#youtubeButton').removeClass("disabled").addClass("active");
}