

var markerLocations = {
    'A': {
        lat: 40.473998,
        lng: -80.07875
    },
    'B': {
        lat: 40.473998,
        lng: -79.95875
    },
    'C': {
        lat: 40.473998,
        lng: -80.07875
    },
    'D': {
        lat: 40.473998,
        lng: -80.07875
    },
    'E': {
        lat: 40.473998,
        lng: -80.07875
    },
    'F': {
        lat: 40.473998,
        lng: -80.07875
    }, 
    'G': {
        lat: 40.473998,
        lng: -80.07875
    },
    'H': {
        lat: 40.473998,
        lng: -80.07875
    }
};
window.cameraMarkers = {};
window.textInfo = {
    'A' : {
        title: 'Project Objective',
        text: "The goal for this project is to provide users access to real-time traffic on the web and on their mobile devices. Our objective is to allow users to check the average travel time between points on major highways, based on the live web cams on Pittsburgh highways.",
    },   
    'B' : {
        title: 'System Description',
        text: "Our web server runs the backend code, which processes the image via OpenCV. It then sends the information over to the front end, which displays the UI to the user.",
        image: "images/system_description.png"
    },
    'C' : {
        title: 'Backend',
        text: "The backend process how many cars appear in the cameras via OpenCV. The code takes a contour of the image and uses bounding rectangles to identify where the cars are and how many cars there are. This processed information is sent to the web server which passes it to the frontend.",
    },
    'D' : {
        title: 'Frontend',
        text: "The frontend uses the camera id and the number of cars to project the speed and travel time on the highway. We utilized Google Maps API to help display the UI and to allow users to enter start and end locations for real-time traffic. Users can also hover over the markers to see the live camera image.",
    },
    'E' : {
        title: 'Result',
        text: "Users can successfully enter in start and end locations and our app provides a travel time between the two markers. The time is calculated based off of the number of cars and their speed.",
        image: "phone_computer_result.png"
    },
    'F' : {
        title: 'Result Analysis',
        text: "Accuracy is dependant on the lighting, weather, and time of day. We set our number of cars threshold at 20 cars. When it is below that, we set the speed to 65 mph. When it is higher, the traffic is much slower; however, this is not a common situation.",
    },
    'G' : {
        title: 'Applications',
        text: "Users can use this app to predict travel time anytime they are driving on highways. It can save them time! This project is scalable to include many more highways throughout Pittsburgh. Additionally, our user interface is easy to use and can allow users to study the statistics and patterns of Pittsburgh traffic.",
    },
    'H' : {
        title: 'References',
        text: "Yang Cai, Dev Shah, Ajmal Thanikkal<br>Kerry Snyder, Matt Sebek, Andrew Bunn<br>Google Maps API",
    }
};

window.onload = function() {
    //setup map
    var latlng = new google.maps.LatLng(40.444564, -79.992517);
    var opt = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    window.map = new google.maps.Map(document.getElementById("map_canvas"),opt);
    window.directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    //place camera markers & listen for their clicks
    for (var i in markerLocations) {
        cameraMarkers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(markerLocations[i].lat,markerLocations[i].lng),
            map: map,
            title: i
        });
        cameraMarkers[i].info = new google.maps.InfoWindow({
            content:    '<div class="infoWindow"><h1 class="title">' + textInfo[i].title + '</h1>' + 
                        '<p class="text">' + textInfo[i].text + '</p></div>'
        });
        $(".infoWindow").css("max-width", "100px");
        //$(".infoWindow").parent().parent().parent().css("background-color", "green");
        cameraMarkers[i].info.open(map, cameraMarkers[i]);
    }
    /*
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
*/
}
