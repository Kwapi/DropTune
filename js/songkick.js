//todo: document filterFunction reusability
function sk_getArtistEvents(artistMusicbrainzID, filterFunction, filterParameter) {

    var args = {
        apikey: songkickAPIkey,
    };

    var url = "http://api.songkick.com/api/3.0/artists/mbid:" + artistInfo.musicbrainzID + "/calendar.json";

    $.ajax({
        dataType: "json",
        type: 'get',
        url: url,
        data: args,
        success: function (data) {
            //we've got entries
            if (data.resultsPage.totalEntries > 0) {
                eventsData = data.resultsPage.results.event;

                // FILTER RESULTS
                //check if the callback function is provided
                // if it is - call it
                if (typeof filterFunction == "function") {

                    filterFunction([filterParameter, eventsData]);
                } else {
                    dsp_artistEvents(fmt_sk_artistEvents(eventsData));
                }


            }

        },
        error: function () {
            console.log("SONGKICK FAILURE");
        }

    });

}


function sk_prepareRadiusFilter(parameters) {
    getBrowserLocation(function () {
        sk_filterArtistEventsByRadius(parameters)
    });
}
function sk_filterArtistEventsByRadius(parameters) {
  
    var eventFilterRadius = parameters[0];
    var eventsData = parameters[1];

    var filteredResults = [];
    for (var i = 0; i < eventsData.length; i++) {
        var location = eventsData[i].location;

        var notCancelled = (eventsData[i].status !== 'cancelled');
        var withinRadius = isWithinRadius(location.lat, location.lng, currentLocationLat, currentLocationLng, eventFilterRadius);

        if (withinRadius && notCancelled) {
            filteredResults.push(eventsData[i]);
        }
    }

    eventsData = fmt_sk_artistEvents(filteredResults);
    dsp_artistEvents(eventsData);

}

function fmt_sk_artistEvents(eventsData) {
    var result = [];

    for (var i = 0; i < eventsData.length; i++) {
        result[i] = {};
        result[i].name = eventsData[i].displayName;
        result[i].url = eventsData[i].uri;
        result[i].startTime = fmt_sk_startTime(eventsData[i].start.time);
        result[i].startDate = eventsData[i].start.date;
        result[i].location = eventsData[i].location.city;
        result[i].status = eventsData[i].status;
    }

    return result;
}
function dsp_artistEvents(eventsData) {


    var $artistEvents = $('#artistEvents');

    if (!exists(eventsData.length) || eventsData.length == 0) {
        $artistEvents.html("No events found for the specified radius");
    } else {

        //clear first
        $artistEvents.html("");
        var template = $('#artistEventTemplate').html();
        var output;

        output = Mustache.render(template, eventsData);

        $('#artistEvents').html(output);

    }
    console.log("Songkick - getArtistEvents - success");
}

function fmt_sk_startTime(startTime) {
    if (startTime == null) {
        startTime = "";
    } else {
        startTime = startTime.substr(0, 5);
    }

    return startTime;
}

