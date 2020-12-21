class MyMap {
    constructor() {
        this.map = L.map('mapid').setView([43.60, 1.44], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoidWx0cmFvbmUzMSIsImEiOiJjazVyM2phcmswOGZtM21wOWIzNDdpMnhpIn0.R9Zb92B8fn7-x_kWBiB5Pw'
        }).addTo(this.map);

        this.stationsDatas();
        document.querySelector('.btn-reserv').style.visibility = 'hidden';

    }
    // Recuperation des donneés de chaque staton 
    stationsDatas() {
        getAjax("https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=1277276d41d2cf4563ff4a8e229ad69a384053c5", function (response) {
            let dataStations = JSON.parse(response);
            this.markers = L.markerClusterGroup();
            dataStations.forEach((station) => {
                let datas = {
                    lat: station.position.lat,
                    lng: station.position.lng,
                    name: station.name,
                    address: station.address,
                    status: station.status,
                    bikeStands: station.bike_stands,
                    availableBikes: station.available_bikes
                }
                this.redIcon = L.icon({
                    iconUrl: "images/marker_red.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34]
                });
                this.orangeIcon = L.icon({
                    iconUrl: "images/marker_orange.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34]
                });
                this.greenIcon = L.icon({
                    iconUrl: "images/marker_green.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34]
                });
                this.putMarkers(datas);
            });

        }.bind(this));

    }
    
    // Dispositions des marqueurs de chaque station sur la carte
    putMarkers(datas) {
        this.map.addLayer(this.markers);
        let marker = L.marker([datas.lat, datas.lng], {});
        if (datas.status === "CLOSED") {
            marker = L.marker([datas.lat, datas.lng], { icon: this.redIcon });
            this.markers.addLayer(marker);
        }
        if (datas.status === "OPEN" && datas.availableBikes === 0) {
            marker = L.marker([datas.lat, datas.lng], { icon: this.orangeIcon });
            this.markers.addLayer(marker);
        }
        if (datas.status === "OPEN" && datas.availableBikes > 0) {
            marker = L.marker([datas.lat, datas.lng], { icon: this.greenIcon });
            this.markers.addLayer(marker);
        }
        this.stationsInfos(marker, datas)
    };

    // Afffichage des données dans l'espace dedié 
    stationsInfos(marker, datas) {
        marker.addEventListener('click', function () {
            document.getElementById('station_name').innerHTML = "Station : " + datas.name;
            document.getElementById('station_address').innerHTML = "Adresse : " + datas.address;
            document.getElementById('station_emplacement').innerHTML = datas.bikeStands + " Places";
            document.getElementById('station_dispo').innerHTML = datas.availableBikes + " Velos disponibles ";


            if (datas.status === 'CLOSED') {
                document.getElementById('status').innerHTML = "Status: La station est fermée.";
                document.querySelector('.btn-reserv').style.visibility = 'hidden';
            } if (datas.availableBikes === 0) {
                document.getElementById('status').innerHTML = "Il n'y a pas de vélos disponibles.<br>Vous ne pouvez pas effectuer de reservation.";
                document.querySelector('.btn-reserv').style.visibility = 'hidden';
            } else if (datas.status === 'OPEN' & datas.availableBikes > 0) {
                document.getElementById('status').innerHTML = "";
                document.querySelector('.btn-reserv').style.visibility = 'visible';
            };
            if (window.screen.width <= 600) {
                window.scrollBy(0, 500);
            }
        })
    }

}
const newMap = new MyMap();
