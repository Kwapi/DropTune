var artistBuckets = ['biographies', 'hotttnesss', 'familiarity', 'artist_location', 'urls',
    'years_active', 'songs', 'id:facebook', 'id:twitter', 'genre', 'id:musicbrainz', 'id:whosampled'];


function en_getSongInfo(songSpotifyID, songTitle, artistName) {
    // try obtaining info through ID - it it doesn't work try searching
    en_getSongInfoBySpotifyID(songSpotifyID, en_getSongInfoBySearch);
}

function en_getArtistInfo(artistSpotifyID, artistName) {
    en_getArtistInfoBySpotifyID(artistSpotifyID, en_getArtistInfoByName);
}


function en_getSongInfoBySpotifyID(songSpotifyID, callback) {

    var args = {
        api_key: echoNestAPIKey,
        track_id: generateSpotifyURI("track", songSpotifyID),
        bucket: ['audio_summary', 'id:spotify']
    };

    var url = "http://developer.echonest.com/api/v4/song/profile";

    // not using getJSON because of serialization error with bucket parameter
    $.ajax({
        dataType: "json",
        type: 'get',
        url: url,
        data: args,
        traditional: true,
        success: function (data) {
            if (data.response.status.code == 5) {
                console.log("Echonest - getSongInfo - spotifyID failed - trying songTitle + artistName");
                callback(songInfo.name, artistInfo.name);
                return false;
            }
            en_explodeAudioSummary(data.response.songs[0].audio_summary);
        },
        error: function () {
            console.error("ECHONEST FAILURE");
        }

    });


}

function en_getSongInfoBySearch(songTitle, artistName) {

    var args = {
        api_key: echoNestAPIKey,
        format: 'json',
        results: 1,
        artist: artistName,
        title: songTitle,
        bucket: 'audio_summary'

    };

    var url = "http://developer.echonest.com/api/v4/song/search";

    $.getJSON(url, args,
        function (data) {
            en_explodeAudioSummary(data.response.songs[0].audio_summary);
        },
        function () {
            console.error("ECHONEST FAILURE");
        })


}

function en_getArtistInfoBySpotifyID(artistSpotifyID, callback) {
    var args = {
        api_key: echoNestAPIKey,
        id: generateSpotifyURI("artist", artistSpotifyID),
        bucket: artistBuckets
    };

    var url = "http://developer.echonest.com/api/v4/artist/profile";

    // not using getJSON because of serialization error with bucket parameter
    $.ajax({
            dataType: "json",
            type: 'get',
            url: url,
            data: args,
            traditional: true,
            success: function (data) {

                if (data.response.status.code == 5) {
                    console.log("Echonest - getArtistInfo - spotifyID failed - trying artistName");
                    callback(artistInfo.name);
                    return false;
                }

                en_explodeArtistInfo(data.response.artist);
            },
            error: function () {
                console.error("ECHONEST FAILURE");
            }
        }
    );
}

function en_getArtistInfoByName(artistName) {
    var url = 'http://developer.echonest.com/api/v4/artist/search';
    var args = {
        'api_key': echoNestAPIKey,
        'name': artistName,
        'bucket': artistBuckets,
        'results': 1,
    };

    $.ajax({
            dataType: "json",
            type: 'get',
            url: url,
            data: args,
            traditional: true,
            success: function (data) {
                if (data.response.status.code == 0) {
                    if (data.response.artists.length > 0) {
                        artistInfo = data.response.artists[0];
                        en_explodeArtistInfo(artistInfo);
                    } else {
                        alert("Can't find " + name);
                    }
                } else {
                    alert("Trouble getting the artist info");
                }
            },
            error: function () {
                alert("Trouble getting the artist info for " + spotifyData.artist);
            }
        }
    );
}

function en_explodeAudioSummary(audioSummary) {
    //todo: document in drive sheets

    songInfo.danceability = audioSummary.danceability;
    // dynamic display - progressbar.js
    songInfo.energy = audioSummary.energy;
    // dynamic display - progressbar.js
    songInfo.valence = audioSummary.valence;
    // dynamic display - progressbar.js

    songInfo.tempo = audioSummary.tempo;
    dsp_songTempo(songInfo.tempo);

    songInfo.key = audioSummary.key;
    dsp_songKey(fmt_en_songKey(songInfo.key));

    songInfo.loudness = audioSummary.loudness;
    dsp_songLoudness(fmt_en_songLoudness(songInfo.loudness));

    songInfo.mode = audioSummary.mode;
    dsp_songMode(fmt_en_songMode(songInfo.mode));


    songInfo.timeSignature = audioSummary.time_signature;
    dsp_songTimeSignature(songInfo.timeSignature);

    songInfo.duration = audioSummary.duration;
    dsp_songDuration(fmt_en_songDuration(songInfo.duration));

    songInfo.acousticness = audioSummary.acousticness;
    //  currently not used todo: future implementation


    console.log("Echonest - getSongInfo - success");


}


function en_explodeArtistInfo(data) {
    if(exists(data.foreign_ids)) {
        applyArtistForeignIDs(data.foreign_ids);
    }

    artistInfo.biography2 = data.biographies[0].text;
    //  currently not used

    artistInfo.yearsActive = data.years_active;
    dsp_artistYearsActive(fmt_artistYearsActive(artistInfo.yearsActive));

    artistInfo.links = data.urls;
    dsp_en_artistLinks(artistInfo.links);

    artistInfo.location = data.artist_location;
    if (exists(artistInfo.location)) {
        dsp_artistLocation(fmt_artistLocation(artistInfo.location));
    }

    artistInfo.familiarity = data.familiarity;
    // dynamic display - progressbar.js

    artistInfo.hotness = data.hotttnesss;
    // dynamic display - progressbar.js

    console.log("Echonest - getArtistInfo - success");
}




function applyArtistForeignIDs(artistForeignIDs) {
    for (var i = 0; i < artistForeignIDs.length; i++) {
        var curr = artistForeignIDs[i];
        switch (curr.catalog) {
            case "facebook":
                artistInfo.facebookID = (curr.foreign_id).slice(16); //get only the ID
                activateMediaLink("#facebookLink","http://www.facebook/"+artistInfo.facebookID);
                break;
            case "musicbrainz":
                if (!exists(artistInfo.musicbrainzID)) {
                    artistInfo.musicbrainzID = (curr.foreign_id).slice(19); //get only the ID
                    mb_getArtistLinks(artistInfo.musicbrainzID);
                }
                break;
            case "whosampled":
                artistInfo.whosampledID = (curr.foreign_id).slice(18); //get only the ID
                dsp_artistSongWhosampled(artistInfo.whosampledID);
                break;
            case "twitter":
                artistInfo.twitterID = (curr.foreign_id).slice(15); //get only the ID
                break;
        }
    }
}

function dsp_artistSongWhosampled(whosampledID){
    //ARTIST todo: document that the id is not useful at all
    activateMediaLink("#whosampledLink","http://www.whosampled.com/"+whiteSpaceTo(artistInfo.name,'-'));
    // SONG
    activateMediaLink("#whoSampledButton","http://www.whosampled.com/"+whiteSpaceTo(artistInfo.name,'-') +"/" +whiteSpaceTo(songInfo.name,'-'));

}

function dsp_artistYearsActive(yearsActive) {
    $('#yearsActive').html(yearsActive);
}

function dsp_songDuration(duration) {
    $('#songDuration').html(duration);
}

function dsp_songLoudness(loudness) {
    $('#songLoudness').html(loudness);
}

function dsp_songKey(key) {
    $('#songKey').html(key);
}

function dsp_songTempo(tempo) {
    $("#songBPM").html(tempo);
}

function dsp_songTimeSignature(timeSignature) {
    //todo: document and say it's a shit estimate
    $('#songTimeSignature').html(timeSignature);
}

function dsp_songMode(mode) {
    $('#songMode').html(mode);
}

function dsp_artistLocation(location) {
    $('#artistLocation').html(location);
}

function dsp_en_artistLinks(artistLinks) {
    //todo: consolidate with musicbrainz links?

    //todo: document which links we get from where
    if (exists(artistLinks.lastfm_url)) {
        activateMediaLink("#lastFmLink", artistLinks.lastfm_url);
    }
    if (exists(artistLinks.myspace_url)) {
        activateMediaLink("#myspaceLink", artistLinks.myspace_url);
    }
    if (exists(artistLinks.official_url)) {
        activateMediaLink("#officialLink", artistLinks.official_url);
    }
    if (exists(artistLinks.twitter_url)) {
        activateMediaLink("#twitterLink", artistLinks.twitter_url);
    }
    if (exists(artistLinks.mb_url)) {
        activateMediaLink("#musicbrainzLink", artistLinks.mb_url);
    }

}

function fmt_en_songKey(key) {
    var sharp = "&#x266f";
    var flat = "&#x266d";
    switch (key) {
        case 0:
            return "C";
            break;
        case 1:
            return "C" + sharp;
            break;
        case 2:
            return "D";
            break;
        case 3:
            return "E" + flat;
            break;
        case 4:
            return "E";
            break;
        case 5:
            return "F";
            break;
        case 6:
            return "F" + sharp;
            break;
        case 7:
            return "G";
            break;
        case 8:
            return "A" + flat;
            break;
        case 9:
            return "A";
            break;
        case 10:
            return "B" + flat;
            break;
        case 11:
            return "B";
            break;

    }
}

function fmt_en_songMode(mode) {
    if (mode == 0) {
        return "Minor";
    } else {
        return "Major";
    }
}

function fmt_en_songDuration(time) {
    //todo: document - custom implementation
    var hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;


    var finalTime = "";
    if (hours > 0) {
        finalTime = hours + ":";
    }


    if (minutes < 10) {
        finalTime = finalTime + "0";
    }
    finalTime = finalTime + minutes + ":";

    if (seconds < 10) {
        finalTime = finalTime + "0";
    }
    finalTime = finalTime + seconds.toFixed();

    return finalTime;

}

function fmt_en_songLoudness(loudness) {
    return loudness + " dB";
}

function fmt_artistYearsActive(yearsActive) {
    var out = "";
    $.each(yearsActive, function (i, ya) {
        if ('start' in ya) {
            out += ya.start;
        }
        out += '-';
        if ('end' in ya) {
            out += ya.end;
        }
        if (i < yearsActive.length - 1) {
            out += ", ";
        }
    });
    return out;
}

function fmt_artistLocation(location) {
    var locationFormatted = "";
    if (exists(location.city)) {
        locationFormatted = locationFormatted + location.city + ", ";
    } else if (exists(location.region)) {
        locationFormatted = locationFormatted + location.region + ", ";
    }

    locationFormatted = locationFormatted + location.country;

    return locationFormatted;
}




