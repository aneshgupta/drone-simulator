import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../Marker/Marker";
import Simulate from "../Simulate/Simulate";
import MapForm from "../MapForm/MapForm";

let interval;
let googleMap;
let flightPath;

const Map = () => {
    const defaultLocation = {
        lat: 22.7196,
        lng: 75.8577,
    };
    const defaultZoom = 12;
    const timeInterval = 1000;

    const [location, setLocation] = useState({
        lat: null,
        lng: null,
    });
    const [locations, setLocations] = useState([]);
    const [isPlay, setIsPlay] = useState(false);
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {}, []);

    const handlePlayPause = (isPlay) => {
        setIsPlay(isPlay);

        if (isPlay === true) {
            startSimulating();
        } else {
            stopSimulating();
        }
    };

    const startSimulating = () => {
        let increment =
            locations.findIndex((loc) => loc.lat === location.lat) ?? 0;

        interval = setInterval(() => {
            if (increment >= locations.length) {
                stopSimulating();
                flightPath.setMap(null);
                return;
            }

            setLocation((prevLocation) => ({
                ...prevLocation,
                lat: locations[increment].lat,
                lng: locations[increment].lng,
            }));

            drawPolyLine(increment);
            increment++;
        }, timeInterval);
    };

    const stopSimulating = () => {
        clearInterval(interval);

        setIsPlay(false);
    };

    const handleFormSubmit = () => {
        setIsPlay(true);
        startSimulating();
    };

    const handleFormClose = (isShow) => {
        setShowForm(isShow);

        if (isShow === true) {
            resetData();
        }
    };

    const addLocation = (location) => {
        const locObj = {
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lng),
        };
        setLocations((prevLocations) => [...prevLocations, locObj]);
    };

    const removeLocation = (lat) => {
        setLocations((prevLocations) =>
            prevLocations.filter((prevLoc) => prevLoc.lat !== parseFloat(lat))
        );
    };

    const handleGoogleMapApi = (google) => {
        googleMap = google;
    };

    const drawPolyLine = (increment) => {
        if (increment === 0) {
            return;
        }

        const path = [locations[increment - 1], locations[increment]];

        flightPath = new googleMap.maps.Polyline({
            path,
            geodesic: true,
            strokeColor: " #4A89F3",
            strokeOpacity: 1.0,
            strokeWeight: 3,
        });

        flightPath.setMap(googleMap.map);
    };

    const resetData = () => {
        setLocations([]);
        setLocation({ ...location, lat: null, lng: null });
        flightPath.setMap({ lat: null, lng: null });
    };

    return (
        <div style={{ height: "90vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultLocation}
                defaultZoom={defaultZoom}
                center={location.lat ? location : defaultLocation}
                zoom={defaultZoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={handleGoogleMapApi}
            >
                <Marker lat={location.lat} lng={location.lng} isPlay={isPlay} />
            </GoogleMapReact>
            <MapForm
                showForm={showForm}
                locations={locations}
                handleFormClose={handleFormClose}
                addLocation={addLocation}
                removeLocation={removeLocation}
                handleFormSubmit={handleFormSubmit}
            />
            <Simulate
                isPlay={isPlay}
                showForm={showForm}
                handlePlayPause={handlePlayPause}
                handleFormClose={handleFormClose}
            />
        </div>
    );
};

export default Map;
