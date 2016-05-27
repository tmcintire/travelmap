
/* Declar initMap function */
    function initMap() {
        /* Declare in inital latlng variable to center map on */
        var latlng = new google.maps.LatLng(42.2847009,-33.720468 );
        var myOptions = {
            zoom: 3,
            center: latlng,
        };

    /* Define the google map */
    var map = new google.maps.Map(document.getElementById("map"),myOptions);

    /* Wait til map is loaded, then load Legend into map */
    google.maps.event.addListenerOnce(map, 'idle', function(){
        $('#legend').show();
    });


    /* Define information windows to show name of markers */
    var infowindow = new google.maps.InfoWindow(), marker, i;

    /* Loop through django variable "marker" and "type".  Type checks for "Visited" or "Want to Visit" and defines the icon
    type to be used based on the variable outcome */
    for (i = 0; i < markers.length; i++) {
            if (type[i] == "Visited") {
                var iconVar = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            } else if (type[i] == "Want to Visit") {
                var iconVar = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            }

        /* Defines markers on each part of the map using the markers variable defined in the django template */
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i][1], markers[i][2]),
            map: map,
            icon: iconVar
        });

        /*Creates the information window on mouse click */
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(markers[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.getElementById('legend'));
}

$('.error').find(':input').css({'border-color': '#b03535', 'box-shadow': '0 0 5px #d45252'});

function capitalize(str) {
    strVal = '';
    str = str.split(' ');
    for (var chr = 0; chr < str.length; chr++) {
        strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
    }
    return strVal
}

$(function() {
    $('.submitBtn').on('click', function() {
        $('.error').remove();
        var allowSubmit = true;
        $.each($('#locationForm input:text'), function(index, formField) {
            field = formField.name;
            fieldname = capitalize(field);
            if($(formField).val().trim().length == 0) {
                console.log(fieldname + ' field is empty!')
                $('.form').prepend('<p class="error" style="color:red">' + fieldname + ' is empty! </p>')
                allowSubmit = false;
            }
        });
        return allowSubmit;
    });
});


$(document).ready(function() {
    formwidth = $('.form').width();
    formheight = $('.form').height();
    mapwidth = $('#map').width();
    mapheight = $('#map').height();
    displaywidth = $(document).width();
    margin = 130;

    $('#map').css({'height': formheight, 'width': displaywidth-formwidth-margin})

});