var route_line = "}`iuF`o}gN_@l@uCqBs@e@w@~BiAdDoBvFaHgCuDkAwIsCqBo@_@MOQw@Y_@UoA_AuAmA_@c@k@s@o@kA_DqGK?}LmX}AeDi@q@]c@g@_@sDmCiG{D{Bw@[GcB[QEQpCMnBQjAUp@_@fAo@~@YV_@Rs@Rq@Bm@Ei@KaAi@u@g@y@o@oAe@{@oAgAeA{OwO_D}Ce@YuCeAm@SeAQaBOqB@gCJcCj@eD`AoLxDiMpEyHhC_GxBwB|@_B|@oH~E{B|A{IhHm@h@wA`As@f@QNqBxAaDdBaD~@u@N_LtAqW~CyGp@qAJwA?yAIeBWyAc@gBq@wBoAuCsBgL_JwB}AeDeBwAg@oCe@wAIoBAkCViCv@uAj@wBhAuAdA_HhFuBlAc@Ne@Jm@NsANw@_@YWWc@GYIi@Aq@Lq@f@aA\\O\\G\\?l@Rf@f@Xz@Dd@Ex@OjBO~AaAjK?f@wBhWy@xJ]zFCvBEnH?fIGdFQxEm@tGa@pCg@hCaAjEmCfIsCzIgHdTkFdPuCpIyFjP{@rBuFdN}CtHyEbLmDpI}AhEwH|QiCtGeNr\\mKvWsCtF}B|CeBpBwBnBoCjBiBjA{InFmCdBeCjB_BjBwA|CSn@k@j@_@j@m@`BUfA[tCMZMVSPi@T_AQk@Ug@_@y@eAmCaEyA}BmAwC";
//TODO add 65-100 for 379
var cameras = {
    '550': {
        id:'550',
        lat: 40.363998,
        lng: -80.11875,
        next: '555'
    },
    '555': {
        id:'555',
        lat: 40.369420000000005,
        lng: -80.11842,
        next: '560'
    },
    '560': {
        id:'560',
        lat: 40.37228,
        lng: -80.11036,
        next: '565'
    },
    '565': {
        id:'565',
        lat: 40.373823,
        lng: -80.103885,
        next: '570'
    },
    '570': {
        id:'570',
        lat: 40.381718,
        lng: -80.096462,
        next: '575'
    },
    '575': {
        id:'575',
        lat: 40.388484,
        lng: -80.098403,
        next: '580'
    },
    '580': {
        id:'580',
        lat: 40.393255,
        lng: -80.100679,
        next: '585'
    },
    '585': {
        id:'585',
        lat: 40.399028,
        lng: -80.105154,
        next: '590'
    },
    '590': {
        id:'590',
        lat: 40.407167,
        lng: -80.107378,
        next: '595'
    },
    '595': {
        id:'595',
        lat: 40.414122,
        lng: -80.104731,
        next: '550'
    }
}
var lines = {
    '550-555': {
        polyline: "_rjuFje_hNuTLiCGeBQuC{@",
        labellat: 40.367932,
        labellon:-80.117369
    },
    '555-560': {
        polyline: "{skuFbc_hNcB}@uBeByAmBgAiBs@eBu@eCq@kFKuBGeBS{O",
        labellat: 40.370613,
        labellon: -80.113077
    },
    '560-565': {
        polyline: "yeluFfr}gNUePSaD]_Cg@cCc@aBk@}Ak@mAgAaB",
        labellat: 40.373097,
        labellon: -80.099688
    },
    '565-570': {
        polyline: "moluFjh|gNuAkBkCuCkGcG{@oAiAgAoSkS_Aw@_@QsDqAQC",
        labellat: 40.378852,
        labellon: -80.095224
    },
    '570-575': {
        polyline: "w`nuF`zzgNs@MaBOqB@gCJcCj@eD`AoLxD}EdB",
        labellat: 40.387089,
        labellon: -80.094366
    },
    '575-580': {
        polyline: "_kouF~e{gNkFjByHhC_GxBwCpA",
        labellat: 40.392319,
        labellon: -80.095396
    },
    '580-585': {
        polyline: "}hpuF`t{gNyEvCqGnEiKrIuBxAm@b@cBlA",
        labellat: 40.397418,
        labellon: -80.098658
    },
    '585-590': {
        polyline: "{lquFhp|gNGFaDdBaD~@u@N_LtA{XfD",
        labellat: 40.405523,
        labellon: -80.104237
    },
    '590-595': {
        polyline: "y_suFd~|gNaIt@wA?yAIeBWyAc@gBq@wBoAuCsByD}CiCoB",
        labellat: 40.411797,
        labellon: -80.102434
    }
};
window.cameraMarkers = {};
window.polylines = {};
window.labels = {};
window.MPH_TO_METERSMIN = (26.82);
window.NUM_LANES = 4;
window.a = setTimeout(undefined, 1000000000000000000000);
var currentcamera = 595;
var url_base = 'http://www.dot35.state.pa.us/public/Districts/District11/WebCams/D11-';
//plot the current (preprogrammed) route
function plot_route()
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
function getDirections(start, end, cb)
{
    if (!window.dir)
        window.dir = new google.maps.DirectionsService();
    dir.route({
        destination: end,
        origin: start,
        provideRouteAlternatives: false,
        unitSystem: google.maps.UnitSystem.METRIC,
        travelMode: google.maps.TravelMode.DRIVING 
    }, cb);
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
    return ((10*NUM_LANES - carcount) * 3);
}
//calculate the time between two cameras on the current I-79 route
function time_between(cam1, cam2)
{
    if (cam1 < 550 || cam2 < 550) throw new Error("Camera too low")
    if (cam1 > 595 || cam2 > 595) throw new Error("Camera too high")
    var mod1 = cam1%5;
    var mod2 = cam2%5;
    if (mod1 != 0 || mod2 != 0) throw new Error("Camera not a multiple of 5")
    var time = 0;
    var len = 0;
    for (var i = cam1; i < cam2; i+=5) {
        var curr_line = google.maps.geometry.encoding.decodePath(lines[i+ "-" + (i+5)].polyline);
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
        window.currentstats = data;
        for (var i in data) {
            if (i !== '595') {
                console.log('i is ' + i);
                var str = i+'-'+cameras[i].next;
                var line = polylines[str];
                var newColor = calcColor(data[i].count);
                if (newColor !== line.strokeColor) {
                    line.strokeColor = newColor;
                    line.changed();
                }
                labels[str].text = speed(data[i].count)+ "mph";
                labels[str].changed('text');
            }
        }
        document.getElementById("tt").innerText = Math.round(travel_time()) + " minutes";
        setTimeout(stats,10000);
    });
}
window.onload = function() {
    //setup map
    var latlng = new google.maps.LatLng(40.39286439546028,-80.10119845581056);
    var opt = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    window.map = new google.maps.Map(document.getElementById("map_canvas"),opt);
    //place camera markers & listen for their clicks
    for (var i in cameras) {
        cameraMarkers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(cameras[i].lat,cameras[i].lng),
            map: map,
            title: i
        });
        google.maps.event.addListener(cameraMarkers[i], 'click', function(event) {
            //on click, go to this camera right away
            newcamera(this.title);
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
    //plot the test route
    plot_route();
    //start pulling in stats
    stats();
    //start camera loop
    newcamera();
}
