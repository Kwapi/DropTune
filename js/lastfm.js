
function lfm_getArtistInfo(artistName){
    var url = 'http://ws.audioscrobbler.com/2.0/';

    var args = {
        method:     'artist.getinfo',
        api_key:    lastFMApiKey,
        artist:     artistName,
        format:     'json',
    };

    $.getJSON(url,args,
        function(data){


            artistInfo.musicbrainzID = data.artist.mbid;
            mb_getArtistLinks(artistInfo.musicbrainzID);
            //todo: document
            if(exists(artistInfo.musicbrainzID)) {
                $('#artistGigsSection').show();
            }
            
            artistInfo.onTour = data.artist.ontour;
            dsp_artistOnTour(artistInfo.onTour);

            artistInfo.biography = data.artist.bio.summary;
            dsp_artistBiography(artistInfo.biography);

            artistInfo.photo_2 = data.artist.image[data.artist.image.length -2]['#text'];
            dsp_artistPhoto2(artistInfo.photo_2);

            artistInfo.tags = data.artist.tags.tag;
            dsp_artistTags(artistInfo.tags);

            artistInfo.similarArtists = fmt_lfm_similarArtists(data.artist.similar.artist);
            dsp_artistSimilarArtists(artistInfo.similarArtists);

            artistInfo.listeners = data.artist.stats.listeners;
            dsp_artistListeners(artistInfo.listeners);

            artistInfo.playcount = data.artist.stats.playcount;
            dsp_artistPlaycount(artistInfo.playcount);

            console.log("Last.fm - getArtistInfo - success");

        },
        function(){
            alert("Error obtaining last.fm data");
        }
    )
}

function dsp_artistOnTour(onTour){

    if (onTour == '1') {
        $('#artistOnTour').html("ON TOUR");
        $('#artistOnTour').addClass("onTour");

    } else {
        $('#artistOnTour').html("NOT ON TOUR");
        $('#artistOnTour').removeClass("onTour");
    }


}

function dsp_artistBiography(biography){
    $('#artistBiography').html(biography);
}

function dsp_artistTags(artistLastFMTags){

    var template = $('#artistTagTemplate').html();
    var output;

    output = Mustache.render(template,artistLastFMTags);

    $('#artistTags').html(output);


}

function dsp_artistSimilarArtists(artistSimilarArtists){
    var template = $('#artistSimilarArtistTemplate').html();
    var output;

    output = Mustache.render(template, _.toArray(artistSimilarArtists));

    $('#artistSimilarArtists').html(output);

}

function dsp_artistListeners(listeners){
    var listenersFormatted = numbro(listeners).format('0a');
    $('#artistListeners').html(listenersFormatted);
}

function dsp_artistPlaycount(playcount){
    var playcountFormatted = numbro(playcount).format('0a');
    $('#artistPlaycount').html(playcountFormatted);
}

function dsp_artistPhoto2(photo2){
    $('.artistPhotoIMG').attr("src", photo2);
}

function fmt_lfm_similarArtists(similarArtists_temp){
    var similarArtists = {};

    for(var i=0; i<similarArtists_temp.length; i++){
        similarArtists[i] = {"name":similarArtists_temp[i].name,
            "url": similarArtists_temp[i].url,
            "photo":similarArtists_temp[i].image[0]["#text"]};
    }
    return similarArtists;
}
