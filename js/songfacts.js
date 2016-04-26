

function sf_getSongFacts(songTitle, artistName){

    var baseUrl = "HTTPS://apiv3.songfacts.com/?go=";

    //todo: document
    // switches are like parameters (see songfacts api documentation for explanation)
    var switches = "0:1:3:4:5:6:7:8:0:1";

    var url = baseUrl+songFactsAPIKey+
        ":"
        +
        switches
        +
        ":"
        +
        artistInfo.name
        +
        ":"
        +
        songInfo.name;

    $.getJSON(url,
        function(data){

            if(data.apidata.result.code =="0"){

               console.log("Songfacts - songFact unavailable");
            }else{
                songFactsData = data.apidata;
                explodeSongFacts(songFactsData);
                dsp_songFacts(songInfo.songFact);

            }
        },
        function(data){
            alert("Error retrieving songfacts - song");
        });

}

function sf_getArtistFacts(songTitle,artistName){
    var baseUrl = "HTTPS://apiv3.songfacts.com/?go=";

    // switches are like parameters (see songfacts api documentation for explanation)

    var switches = "2:1:3:4:5:6:7:8:0:1";

    var url = baseUrl+songFactsAPIKey+
        ":"
        +
        switches
        +
        ":"
        +
        artistInfo.name;
        +
        ":"
        +
        songInfo.name;

    $.getJSON(url,
        function(data){

            if(data.apidata.result.code =="0"){

               console.log("Songfacts - getArtistFact - no artist facts available");
            }else{
                artistFactsData = data.apidata;
                explodeArtistFacts(artistFactsData);
                dsp_artistFacts(artistInfo.artistFact);
                console.log("Songfacts - getArtistFact - success");
            }

        },
        function(data){
            //todo: change all alerts to this
            console.error("Songfacts - getArtistFact - error processing API request");
        });
}

function explodeSongFacts(songFacts){
    //todo: document object structure
    var generalInfo = songFacts.generalinfo;
    var facts = songFacts.factsquery.facts;
    songInfo.songFact = {};
    songInfo.songFact.url = generalInfo.detailpageurl;
    songInfo.songFact.text = facts.fact;
}

function explodeArtistFacts(artistFacts){
    //todo document the hack
    artistInfo.artistFact = {};
    artistInfo.artistFact.text = artistFacts.factsquery.facts.fact;
    artistInfo.artistFact.url = 'http://www.songfacts.com/facts-' + whiteSpaceTo(artistInfo.name,'-') + '.php';
}



function dsp_songFacts(songFacts){
    $('#songFactRow').show();
    $('#songFactText').html(songInfo.songFact.text);
    $('#songFactURL').attr('href',songInfo.songFact.url);
}

function dsp_artistFacts(artistFacts){
    $('#artistFactRow').show();
    $('#artistFactText').html(artistInfo.artistFact.text);
    $('#artistFactURL').attr('href',artistInfo.artistFact.url);
}