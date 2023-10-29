import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "../App.css";
import Accommodations from "../components/Accommodations";
import { markers } from "../data/markers";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [map, setMap] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const [zoom, setZoom] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [startPosition, setStartPosition] = useState({
    title: "hotel",
    address: "Rome",
    photo: null,
    lat: 41.9027835,
    lng: 12.4963655,
  });
  const [searchResult, setSearchResult] = useState({
    title: "hotel",
    address: "Rome",
    photo: null,
    lat: 41.9027835,
    lng: 12.4963655,
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
        map.panTo({ lat, lng });
        setInfoWindowData({ id, title, address, photo });
        setIsOpen(true);
        setZoom(14);
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
          };

          setStartPosition(newSearchResult);
          setSearchResult(newSearchResult);

          setStartSearch(true);
        } else {
          console.error("Nessun risultato trovato per la query di ricerca");
        }
      });
    }
  };

  return (
    <>
      <div className="colMap">
        <div style={{ position: "absolute", zIndex: "100" }}>
          <input
            type="text"
            placeholder="Cerca luogo..."
            value={searchQuery}
            onChange={(e) => {
              setStartSearch(false);
              setSearchQuery(e.target.value);
            }}
          />
          <button onClick={handleSearch}>Cerca</button>
          {searchResult && (
            <div>
              <h2>Risultato della ricerca:</h2>
              <p>{searchResult.address}</p>
            </div>
          )}
        </div>

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
                onClick={() => {
                  // Gestisci l'apertura dell'InfoWindow o altri dettagli del marker
                }}
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
                        <>
                          <h3>{infoWindowData.title}</h3>
                          <h3>{infoWindowData.address}</h3>
                        </>
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
