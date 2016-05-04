
var spotifyApi = new SpotifyWebApi(); //instantiate the wrapper

function sp_getSongInfo(songSpotifyID,callback){

    spotifyApi.getTrack(songSpotifyID,function(err,data){
        if(err){
            console.error(err);
        }else{

            artistInfo.spotifyID = data.artists[0].id;

            artistInfo.name = data.artists[0].name;
            dsp_artistName(artistInfo.name);

            sp_getArtistInfo(artistInfo.spotifyID);

            songInfo.name = data.name;
            dsp_songTitle(songInfo.name);

            songInfo.popularity = data.popularity;
            //  dynamic display using progressbar.js

            albumInfo.name = data.album.name;
            dsp_albumTitle(albumInfo.name);

            albumInfo.albumArt = data.album.images[0].url;
            dsp_albumArt(albumInfo.albumArt);

            console.log("Spotify - getSongInfo - success");

            // continue with other API calls
            callback();
        }
    });
}

function sp_getArtistInfo(artistSpotifyID){

    spotifyApi.getArtist(artistSpotifyID,function(err,data){
        if(err){
            console.error(err);
        }else{
            artistInfo.popularity = data.popularity;
            //  dynamic display using progressbar.js
            artistInfo.followers = data.followers.total;
            //  currently not used todo: implement in the future

            artistInfo.profilePhoto = {"url": data.images[0].url,
                                    "width": data.images[0].width,
                                    "height": data.images[0].height};
            //  dynamic display when switching between two views



            console.log("Spotify - getArtistInfo - success");
        }
    });
}

function sp_getArtistTopTracks(artistSpotifyID){
    // Country code required https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    // GB - UK
    countryCode = "GB"; //todo: think how to get that info - browser location?
    spotifyApi.getArtistTopTracks(artistSpotifyID,countryCode,function(err,data){
        if(err){
            console.error(err);
        }else{
           data.tracks;
            dsp_artistTopTracks(fmt_sp_artistTopTracks(data.tracks));
        }
    })
}

function dsp_artistTopTracks(artistTopTracks){
    var $topTracks = $('#artistTopTracksList');

    //clear first
    $topTracks.html("");
    var template = $('#topTrackTemplate').html();
    var output;

    output = Mustache.render(template, _.toArray(artistTopTracks));

    $topTracks.html(output);
}

function fmt_sp_artistTopTracks(artistTopTracks){
    var topTracksFMT = {};

    for (var i = 0; i < artistTopTracks.length; i++){
        var track = {};
        var orgTrack = artistTopTracks[i];
        track.spotifyID = orgTrack.id;
        track.name = orgTrack.name;
        track.album = orgTrack.album.name;
        track.albumArt = orgTrack.album.images[orgTrack.album.images.length - 1].url; // the last one is the smallest
        track.songProfile = "?" +  orgTrack.id; //link to DropTune
        topTracksFMT[i] = track;

        //only get maximum of 5 top tracks;
        if(i ==4){
            break;
        }
    }

    artistInfo.topTracks = topTracksFMT;
    return topTracksFMT;
}
function generateSpotifyURI(type, id){
    return "spotify:" + type + ":" + id;
}


function dsp_artistName(artistName){
    $('.artistName').html(artistName);
}

function dsp_songTitle(songTitle){
    $('.songTitle').html(songTitle);
}

function dsp_albumTitle(albumTitle){
    $('.albumTitle').html(albumTitle);
}

function dsp_albumArt(albumArt){
    $('.albumArtIMG').attr('src',albumArt);
}

function dsp_spotifyPlayButton(songSpotifyID){
    var src="https://embed.spotify.com/?uri=spotify:track:"+songSpotifyID;

    $('#spotifyPlayButton').html("");

    $('<iframe />', {
        src: src,
        width: "731",
        height: "80",
        frameborder: "0",
        allowtransparency: "true"
    }).appendTo("#spotifyPlayButton");


}
