
// Capitalise the first character of a string
function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

/**
 * Check if URL is valid
 * @param url
 * @returns {boolean}
 */
function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

function exists(object){
    return ((typeof(object) != 'undefined') && (object != null));
}

function dsp_artistProfilePhoto(profilePhoto){

    var $img =  $('#sidenav-header img');
    $img.attr("src", artistInfo.profilePhoto.url);

    if(profilePhoto.width < profilePhoto.height){
        $img.addClass("portrait");
    }else{
        $img.removeClass("portrait");
    }




}

function whiteSpaceTo(string,character){
    // g is global modifier
    // JavaScript by default replaces only the first occurrence
    return string.replace(/ /g,character);
}

function getBrowserLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            currentLocationLat = position.coords.latitude;
            currentLocationLng = position.coords.longitude;
            callback();
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


function isWithinRadius(targetLat, targetLng, centerLat, centerLng, radius){
    var targetLoc = new google.maps.LatLng(targetLat,targetLng);
    var center = new google.maps.LatLng(centerLat,centerLng);

    var distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(center, targetLoc) / 1000;
    return (distanceInKm < radius);
}


function extractSpotifyIdFromSpotifyURL(url){
    //remove "http://
    url_short = url.substring(8,url.length);
    var res = url_short.split("/");
    return res[2];
}