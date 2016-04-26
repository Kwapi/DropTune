
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
