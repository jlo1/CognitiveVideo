var route_line = "}`iuF`o}gN_@l@uCqBs@e@w@~BiAdDoBvFaHgCuDkAwIsCqBo@_@MOQw@Y_@UoA_AuAmA_@c@k@s@o@kA_DqGK?}LmX}AeDi@q@]c@g@_@sDmCiG{D{Bw@[GcB[QEQpCMnBQjAUp@_@fAo@~@YV_@Rs@Rq@Bm@Ei@KaAi@u@g@y@o@oAe@{@oAgAeA{OwO_D}Ce@YuCeAm@SeAQaBOqB@gCJcCj@eD`AoLxDiMpEyHhC_GxBwB|@_B|@oH~E{B|A{IhHm@h@wA`As@f@QNqBxAaDdBaD~@u@N_LtAqW~CyGp@qAJwA?yAIeBWyAc@gBq@wBoAuCsBgL_JwB}AeDeBwAg@oCe@wAIoBAkCViCv@uAj@wBhAuAdA_HhFuBlAc@Ne@Jm@NsANw@_@YWWc@GYIi@Aq@Lq@f@aA\\O\\G\\?l@Rf@f@Xz@Dd@Ex@OjBO~AaAjK?f@wBhWy@xJ]zFCvBEnH?fIGdFQxEm@tGa@pCg@hCaAjEmCfIsCzIgHdTkFdPuCpIyFjP{@rBuFdN}CtHyEbLmDpI}AhEwH|QiCtGeNr\\mKvWsCtF}B|CeBpBwBnBoCjBiBjA{InFmCdBeCjB_BjBwA|CSn@k@j@_@j@m@`BUfA[tCMZMVSPi@T_AQk@Ug@_@y@eAmCaEyA}BmAwC";
//TODO add 65-100 for 379


window.cameraMarkers = {};
window.polylines = {};
window.labels = {};
window.MPH_TO_METERSMIN = (26.82);
window.NUM_LANES = 4;
window.a = setTimeout(undefined, 1000000000000000000000);
window.start_id = null;
window.end_id = null;
window.numcameras = 28;

window.showDetails = true;
var currentcamera = 595;
var url_base = 'http://www.dot35.state.pa.us/public/Districts/District11/WebCams/D11-';
//plot the current (preprogrammed) route
function plot_preprogrammed_route()
{
    var route = google.maps.geometry.encoding.decodePath(route_line)
    var start = route[0];
    var end = route[route.length - 1];
    var start = new google.maps.Marker({
        position: start,
        map: map,
        title: "Route Start"
    });
    var end = new google.maps.Marker({
        position: end,
        map: map,
        title: "Route End"
    });
    var poly = new google.maps.Polyline({
        map: map,
        path: route,
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 3
    });
}

//plot the route given by start and end
function plot_route() 
{
    if (start_id == null || end_id == null) {
        console.log("Cannot calculate; empty start and end");
        return;
    }
    start_latlng = new google.maps.LatLng(cameras[start_id].lat, cameras[start_id].lng);
    end_latlng = new google.maps.LatLng(cameras[end_id].lat, cameras[end_id].lng);
    getDirections(start_latlng, end_latlng);
}

//calculate the travel time of the current route
function travel_time()
{
    //waypoints 50-90 are on I-79 and have camera coverage
    var route = google.maps.geometry.encoding.decodePath(route_line);
    var time = 0;
    for (var i = 0; i < route.length - 1; i++) {
        if (i >= 50 && i < 90) {
            for (var j = 550; j < 595; j+=5) {
                var cam1 = new google.maps.LatLng(cameras[j].lat,cameras[j].lon);
                var cam2 = new google.maps.LatLng(cameras[j+5].lat,cameras[j+5].lon);
                var d1 = google.maps.geometry.spherical.computeDistanceBetween(route[i],cam1)
                var d2 = google.maps.geometry.spherical.computeDistanceBetween(route[i],cam2)
                var cam = d1 < d2 ? j : j+5;
                var s = currentstats[cam].count;
                var dist = google.maps.geometry.spherical.computeDistanceBetween(route[i], route[i+1])/10
                time += dist/(speed(s) * MPH_TO_METERSMIN);
            }
        } else {
            //no camera, just guess
            var s = 35;
            var dist = google.maps.geometry.spherical.computeDistanceBetween(route[i], route[i+1])
            time += (dist)/(s * MPH_TO_METERSMIN);
        }
    }
    return time;
}
// Use the google directions api to obtain a route between two locations
function getDirections(start, end)
{
    if (!window.dir)
        window.dir = new google.maps.DirectionsService();
    dir.route({
        destination: end,
        origin: start,
        provideRouteAlternatives: false,
        unitSystem: google.maps.UnitSystem.METRIC,
        travelMode: google.maps.TravelMode.DRIVING, 
        avoidHighways: false,
        avoidTolls: false
    }, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
    });

}
//callback invoked when we need to update the camera image and marker
//if id is given, go directly there. otherwise, move to next
function newcamera(id)
{
    cameraMarkers[currentcamera].setIcon(null);
    id = id || cameras[currentcamera].next;
    cameraMarkers[id].setIcon('http://www.google.com/uds/samples/places/temp_marker.png');
    currentcamera = id;
    var img = document.getElementById('camera_image');
    img.src = url_base + id + '.jpg?v=' + new Date().getTime();
    if (a)
        clearTimeout(a);
    window.a = setTimeout(newcamera,5000);
}
//calculate the road line color for a given car count
function calcColor(carcount)
{
    if (carcount > 30)
        return '#FF0000';
    if (carcount > 20 && carcount <= 30)
        return '#FFFF00';
    else
        return '#00FF00';
}
//calculate the speed given the car count
function speed(carcount)
{
    if (carcount <= 20) return 65;
    var speed = ((10*NUM_LANES - carcount) * 3);
    return speed >= 5 ? speed : 5;
}
//calculate the time between two cameras on the current I-79 route
function time_between(cam1, cam2)
{
    if (cameras[cam1] === undefined || cameras[cam2] === undefined)
        throw new Error ("Camera not in range");
    var time = 0;
    var len = 0;
    for (var i = parseInt(cam1); i < parseInt(cam2); i = cameras[i].next) {
        var curr_line = google.maps.geometry.encoding.decodePath(lines[i+ "-" + cameras[i].next].polyline);
        var line_len = google.maps.geometry.spherical.computeLength(curr_line)
        len += line_len
        time += line_len/(speed(window.currentstats[cam1].count) * MPH_TO_METERSMIN);
    }
    return time;
}
//pull updated stats from the server side processor
function stats()
{
    $.getJSON('/endpoint?callback=?', function(data) {
        var start_stats_time = new Date().getTime();
        window.currentstats = data;
        for (var i in data) {
            if (cameras[i] === undefined) continue;
            if (cameras[i].last === undefined && i.indexOf('-') < 0) {
                var str = i+'-'+cameras[i].next;
                var line = polylines[str];
                var newColor = calcColor(data[i].count);
                if (newColor !== line.strokeColor) {
                    /*line.strokeColor = newColor;
                    line.changed();*/
                    line.setOptions({strokeColor: newColor});
                }
                labels[str].text = showDetails
                    ? speed(data[i].count)+ "mph (" + data[i].count + " cars)"
                    : "";
                labels[str].changed('text');
            }
        }

        /************/
        // Check runtime vs num cameras
        if(start_program_time !== null) {
            var end_time = new Date().getTime();
            console.log('Num Cameras: ' + Object.size(cameras));
            console.log('Program start time: ' + (end_time - start_program_time) + 'ms');
            console.log('Stats runtime: ' + (end_time - start_stats_time) + 'ms');
            start_program_time = null;
        }
        /************/

        if (start_id == null || end_id == null) {
            return;
        }
        document.getElementById("tt").innerText = Math.round(time_between(start_id, end_id)) + " minutes";

    });
}
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function handle_events()
{
    // If input cleared, change to .input_highlighted; clear text
    $("#clear").click(function() {
        $(".textbox").val("");
        $(".textbox#start").addClass("input_highlighted");
        window.start_id = null;
        window.end_id = null;
        directionsDisplay.setMap(null); 
        directionsDisplay = null;
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
    });

    // Handle expanding and collapsing input details on arrow click
    $(".arrow").click(function(e) {
        console.log(e.target);
        if ($(".arrow").hasClass("minimized")) {
            $("#input_block").removeClass("hidden");
            $(".arrow").removeClass("minimized");
        } else {
            $("#input_block").addClass("hidden");
            $(".arrow").addClass("minimized");
        }
    })

    // When calculate, rerun plot_route and recalculate travel time
    $("#calculate").click(function() {
        plot_route();
        stats();
    });

    $("#showDetails").click(function() {
        if ($("input:checked").length > 0) 
            window.showDetails = true;
        else
            window.showDetails = false;
    })

}

function get_camera_name(id) {
    var all_cameras = cams['Location Name'].cameras;
    for( var i = 0; i < all_cameras.length; i++) {
        if (all_cameras[i].id == id)
            return all_cameras[i].name;
    }
}

window.onload = function() {
    /*************/
    // For testing and limiting number of cars to load
    var tmp = {};
    var count = 0;
    for (var i in cameras) {
        tmp[i] = cameras[i];
        count++;
        if (count === numcameras) {
            tmp[i].last = true;
            break;
        }
    }
    window.cameras = tmp;
    console.log(Object.size(cameras));

    tmp = {};
    count = 0;
    for (var i in lines) {
        tmp[i] = lines[i];
        count++;
        if (count === numcameras - 1) break;
    }
    window.lines = tmp;
    console.log(Object.size(lines));
    /************/

    window.start_program_time = new Date().getTime();

    //setup map
    var latlng = new google.maps.LatLng(40.39286439546028,-80.10119845581056);
    var opt = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    window.map = new google.maps.Map(document.getElementById("map_canvas"),opt);
    window.directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    //place camera markers & listen for their clicks
    for (var i in cameras) {
        cameraMarkers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(cameras[i].lat,cameras[i].lng),
            map: map,
            title: i
        });
        cameraMarkers[i].info = new google.maps.InfoWindow({
            content:    '<img border="0" align="left" src='+
                        url_base+i+'.jpg?v='+new Date().getTime() + '>'
        })


        google.maps.event.addListener(cameraMarkers[i], 'click', function(event) {
            $(".input_highlighted").val(get_camera_name(this.title));
            var this_input = $(".input_highlighted");
            var next_input = this_input.nextAll(".textbox");
            if (next_input.size() > 0) {
                window.start_id = this.title;
                next_input.addClass("input_highlighted");
            } else {
                window.end_id = this.title;
            }
            this_input.removeClass("input_highlighted");

        });

        // Temporarily Open camera image if hover over marker
        google.maps.event.addListener(cameraMarkers[i], 'mouseover', function(event) {
            cameraMarkers[this.title].info.open(map, cameraMarkers[this.title]);

            if (a)
                clearInterval(a);
            window.a = setInterval(
                function() {
                    cameraMarkers[this.title].info.setContent(
                        '<img border="0" align="left" src='+url_base+this.title+'.jpg?v='+new Date().getTime() + '>'
                    );
                }.bind(this),5000);
        });

        // Close camera image when leave marker
        google.maps.event.addListener(cameraMarkers[i], 'mouseout', function(event) {
            if (a) clearInterval(a);
            cameraMarkers[this.title].info.close();
        });
    }

    for (var i in lines) {
        //draw camera to camera lines
        polylines[i] = new google.maps.Polyline({
            map: map,
            path: google.maps.geometry.encoding.decodePath(lines[i].polyline),
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 7
        });
        //set up speed labels for each roadway
        labels[i] = new MapLabel({
            text: '',
            position: new google.maps.LatLng(lines[i].labellat,lines[i].labellon),
            map: map,
            fontSize: 15,
            align: 'left'
        })
    }
    $.get('/static/cameras.xml', function(data) {
        $(data).find("camera").each(function(i, elem) {
            console.log("ID: " + $(this).find("id").text());
            console.log("LAT: " + $(this).find("lat").text());
            console.log("LON: " + $(this).find("lng").text());
        })
    });

    //setup click handlers
    handle_events();
    //plot the test route
    plot_route();
    //start pulling in stats
    stats();
    setInterval(function() {stats()}, 5000);
}
