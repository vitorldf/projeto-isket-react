import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Circle, Polygon } from "react-leaflet";
import { statesData } from "../../data";
import { useMap } from "../../hooks/useMap";

const Home = () => {
  const { maps, loading, getCountries, postCountries } = useMap();
  const center = [40.63463151377654, -97.89969605983609];
  const [position, setPosition] = useState();

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  return (
    <>
      <MapContainer
        center={center}
        zoom={4.0}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/winter/256/{z}/{x}/{y}.png?key=dw25cMbbo4Bdj8Pqqtrh"
          attribution='<<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {!loading && maps
          ? maps.map((state) => {
              const coordinates = state.location.coordinates;

              return (
                <>
                  <Circle
                    center={coordinates}
                    pathOptions={{ fillColor: "#FD8D3C" }}
                    radius={100000}
                    eventHandlers={{
                      mouseover: (e) => {
                        const layer = e.target;
                        layer.setStyle({
                          fillOpacity: 0.7,
                          weight: 5,
                          dashArray: "",
                          color: "#666",
                          fillColor: "#D45962",
                        });
                      },
                      mouseout: (e) => {
                        const layer = e.target;
                        layer.setStyle({
                          fillOpacity: 0.7,
                          weight: 2,
                          dashArray: "3",
                          color: "white",
                          fillColor: "#FD8D3C",
                        });
                      },
                      click: (e) => {
                        const layer = e.target;
                        setPosition([...position, coordinates]);
                        layer.setStyle({
                          fillOpacity: 0.7,
                          weight: 2,
                          dashArray: "3",
                          color: "white",
                          fillColor: "#DB1813",
                        });
                      },
                    }}
                  />
                </>
              );
            })
          : null}
        {position && position.length() >= 4 && (
          <Polygon
            pathOptions={{
              fillColor: "#FD8D3C",
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: "white",
            }}
            positions={position}
          />
        )}

        {/* <Polygon pathOptions={purpleOptions} positions={Polygon} /> */}
      </MapContainer>
    </>
  );
};

export default Home;
