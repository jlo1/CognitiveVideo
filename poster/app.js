

var markerLocations = {
    'A': {
        lat: 40.4668,
        lng: -80.00
    },
    'B': {
        lat: 40.425,
        lng: -80.0815
    },
    'C': {
        lat: 40.425,
        lng: -79.919
    },
    'D': {
        lat: 40.367,
        lng: -80.00
    },
    'E': {
        lat: 40.376,
        lng: -80.145
    },
    'F': {
        lat:  40.385,
        lng: -79.869
    }
};
window.cameraMarkers = {};
window.textInfo = {
    'A' : {
        title: 'Project Overview',
        text: "<b>Objective</b>: The goal for this project is to provide users access to real-time traffic on the web and on their mobile devices. Our objective is to allow users to check the average travel time between points on major highways, based on the live web cams on Pittsburgh highways. " +
            "<br/><b>System Description</b>: Our web server runs the backend code, which processes the image via OpenCV. It then sends the information over to the front end, which displays the UI to the user.",
        width: 600
    }, 
    'B' : {
        title: 'Backend',
        text: "The backend process how many cars appear in the cameras via OpenCV. The code takes a contour of the image and uses bounding rectangles to identify where the cars are and how many cars there are. This processed information is sent to the web server which passes it to the frontend.",
        width: 350
    },
    'C' : {
        title: 'Frontend',
        text: "The frontend uses the camera id and the number of cars to project the speed and travel time on the highway. We utilized Google Maps to help display the UI and to allow users to enter start and end locations for real-time traffic. Users can also hover over the markers to see the live camera image.",
        width: 350
    },
    'D' : {
        title: 'Result',
        text: "<div class='float text' style='max-width: 290px;'>Users can successfully enter in start and end locations and our app provides a travel time between the two markers. The time is calculated based off of the number of cars and their speed.</div>" +
              "<img class='float' id='phone_computer' src='images/phone_computer.png'>" +
              "<div class='clear_float text'><b>Analysis</b>: Accuracy is dependant on the lighting, weather, and time of day. We set our number of cars threshold at 20 cars. When it is below that, we set the speed to 65 mph. When it is higher, the traffic is much slower; however, this is not a common situation.</div>",
        width: 400
    },
    'E' : {
        title: 'Applications',
        text: "Users can use this app to predict travel time anytime they are driving on highways. It can save them time! This project is scalable to include many more highways throughout Pittsburgh. Additionally, our user interface is easy to use and can allow users to study the statistics and patterns of Pittsburgh traffic.",
        width: 300
    },
    'F' : {
        title: 'References',
        text: "Professor Yang Cai<br/>TAs Dev Shah and Ajmal Thanikkal<br>Kerry Snyder, Matt Sebek, Andrew Bunn<br>Google Maps API",
        width: 300
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


    google.maps.event.addListener(map, "click", function (e) {
        console.log(e.latLng);
    });

    //place camera markers & listen for their clicks
    for (var i in markerLocations) {
        cameraMarkers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(markerLocations[i].lat,markerLocations[i].lng),
            map: map,
            title: i,
            draggable: true
        });
        var node = '<div class="infoWindow"><h1 class="title">' + textInfo[i].title + '</h1>' + 
                        '<p class="text">' + textInfo[i].text + '</p></div>';
        if (textInfo[i].image !== undefined) {
            node += textInfo[i].image;
        }
        cameraMarkers[i].info = new google.maps.InfoWindow({
            content:  node,
            maxWidth: textInfo[i].width,
        });
        $(".infoWindow").css("max-width", "100px");
        //$(".infoWindow").parent().parent().parent().css("background-color", "green");
        cameraMarkers[i].info.open(map, cameraMarkers[i]);
    }
    
}
