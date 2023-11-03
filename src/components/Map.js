import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "../App.css";
import Search from "../components/Search";
import Info from "../components/Info";
import Accommodations from "../components/Accommodations";
import { markers } from "../data/markers";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [map, setMap] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const [zoom, setZoom] = useState(11);
  const [searchQuery, setSearchQuery] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [startPosition, setStartPosition] = useState({
    title: "",
    address: "Rome",
    photo: null,
    lat: 41.9027835,
    lng: 12.4963655,
  });
  const [searchResult, setSearchResult] = useState({
    title: "",
    address: "",
    photo: null,
    lat: null,
    lng: null,
    error: "",
  });

  useEffect(() => {
    if (isLoaded && map) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          /*
          const bounds = new window.google.maps.LatLngBounds();
          markers.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
          map.fitBounds(bounds);*/
        }, 700);
      });
    }
  }, [isLoaded, map]);

  const handleMarkerClick = (id, lat, lng, title, address, photo) => {
    setIsOpen(false);
    setTimeout(() => {
      if (title) {
        map.panTo({ lat, lng, duration: 1000 });
        setInfoWindowData({ id, title, address, photo });
        setIsOpen(true);
        setZoom(13);
        setStartPosition({ lat, lng });
      }
    }, 70);
  };

  const handleSearch = () => {
    if (searchQuery) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          const result = results[0];
          const address = result.formatted_address;

          const newSearchResult = {
            address: address,
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            error: "",
          };

          setStartPosition(newSearchResult);
          setSearchResult(newSearchResult);

          setStartSearch(true);
        } else {
          const newSearchResult = {
            address: "",
            lat: null,
            lng: null,
            error: "Location not found",
          };
          setSearchResult(newSearchResult);
        }
      });
    }
  };

  return (
    <>
      <div className="colMap">
        <Search
          searchQuery={searchQuery}
          setStartSearch={setStartSearch}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          searchResult={searchResult}
        />
        <Info/>
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={{ lat: startPosition.lat, lng: startPosition.lng }}
            zoom={zoom}
            onLoad={(map) => setTimeout(() => setMap(map))}
            onClick={() => setIsOpen(false)}
          >
            {map && searchQuery && startSearch && searchResult.lat !== null && (
              <Marker
                position={{ lat: searchResult.lat, lng: searchResult.lng }}
                onClick={() => {}}
              />
            )}

            {map &&
              markers &&
              markers.map(({ title, address, photo, lat, lng }, i) => (
                <Marker
                  key={i}
                  position={{ lat, lng }}
                  onClick={() => {
                    handleMarkerClick(i, lat, lng, title, address, photo);
                  }}
                >
                  {isOpen &&
                    infoWindowData.id === i &&
                    infoWindowData.address !== null && (
                      <InfoWindow
                        onCloseClick={() => {
                          setIsOpen(false);
                          setInfoWindowData();
                        }}
                      >
                        <div className="cardTooltip">
                          <div className="imgContanier">
                            <img
                              src={infoWindowData.photo}
                              alt={infoWindowData.title}
                              className="img"
                            />
                          </div>
                          <div className="textContanier">
                            <div className="tooltipTitle">
                              {infoWindowData.title}
                            </div>
                            <div className="tooltipAddress">
                              <strong>Address: </strong>
                              {infoWindowData.address}
                            </div>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                </Marker>
              ))}
          </GoogleMap>
        )}
      </div>
      <Accommodations
        map={map}
        markers={markers}
        handleMarkerClick={handleMarkerClick}
      />
    </>
  );
};

export default Map;
