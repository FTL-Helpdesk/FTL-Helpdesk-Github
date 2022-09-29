/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_map_geolocation]
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

//initalize and add the map, center on FT leeds office location
function initMap() 
{
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53.772530, lng: -1.537364 }, //FT office co-ords
    zoom: 6,
  });
  //Load marker image library
  const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
  infoWindow = new google.maps.InfoWindow();
//INSERT NEW FUNCTION HERE
  //Create red Marker Positioned at FT Leeds Office
  const FT_office = { lat: 53.772530, lng: -1.537364 }; //creates constant for FT office marker
  const marker = new google.maps.Marker({
    position: FT_office,
    map: map,
    title: "FT Office Leeds"
  });

  //initalize buttons
  const locationButton = document.createElement("button"); //creates pin to location button

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;
// [END maps_map_geolocation]