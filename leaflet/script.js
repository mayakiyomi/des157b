(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([42.351139, -71.131439], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var quint = L.marker([42.352462, -71.134355]).addTo(map);
    var metcalf = L.marker([42.348399, -71.100259]).addTo(map);
    var maruichi = L.marker([42.342858, -71.123030]).addTo(map);

    quint.bindPopup("<b>This is where my friend Mark lives in Boston!</b>");
    metcalf.bindPopup("<b>This is the science lab where Mark works!</b>");
    maruichi.bindPopup("<b>When I visited Mark in Boston, we got really good matcha here!</b>");
    
}());