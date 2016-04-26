function mb_getArtistLinks(artistMusicbrainzID) {

    if (exists(artistInfo.musicbrainzID)) {
        if (!mb_artistLinksObtained) {

            var url = 'http://musicbrainz.org/ws/2/artist/' + artistInfo.musicbrainzID;

            var args = {
                inc: "url-rels",
                fmt: "json"
            };

            $.getJSON(url, args,
                function (data, textStatus, xhr) {
                    if (xhr.status == 503) {
                        console.log("Musicbrainz is not responding. Trying again...");
                        setTimeout(function () {
                                mb_getArtistLinks(artistInfo.musicbrainzID);
                            },5000);
                        return
                    } else {
                        dsp_mb_artistLinks(data.relations);
                        console.log("Musicbrainz - getArtistLinks - success");
                        mb_artistLinksObtained = true;
                    }
                },
                function () {
                    alert("Error obtaining musicbrainz data");
                }
            )
        } else {
            console.log("Musicbrainz ArtistLinks have already been obtained - quitting");
        }
    } else {
        console.log("No musicbrainzID for this artist was found");
    }
}

function dsp_mb_artistLinks(relations) {

    var found = false;
    for (var i = 0; i < relations.length; i++) {
        var relation = relations[i];
        var found = false;
        var url = relations[i].url.resource;
        switch (relation.type) {
            case "soundcloud":
                artistInfo.links.soundcloud_url = url;
                activateMediaLink("#soundcloudLink", url);
                found = true;
                break;
            case "wikipedia":
                artistInfo.links.wikipedia_url = url;
                activateMediaLink("#wikipediaLink", url);
                found = true;
                break;
            case "youtube":
                artistInfo.links.youtube_url = url;
                activateMediaLink("#youtubeLink", url);
                found = true;
                break;
        }

        if (!found) {
            if (url.indexOf("instagram") != -1) {
                artistInfo.links.instagram_url = url;
                activateMediaLink("#instagramLink", url);
            }
            if (url.indexOf("rateyourmusic") != -1) {
                artistInfo.links.rateyourmusic_url = url;
                activateMediaLink("#rateyourmusicLink", url);
            }
        }
    }
}
