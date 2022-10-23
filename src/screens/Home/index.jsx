import React, { useEffect, useMemo, useState, useCallback } from "react";
import { MapContainer, TileLayer, Circle, Polygon } from "react-leaflet";
import { statesData } from "../../data";
import { useMap as useMyMap } from "../../hooks/useMap";

const Home = () => {
  const { maps, loading, getCountries, postCountries } = useMyMap();
  // const {  } = useMap();

  const center = [53.847818, 23.424076];
  const [points, setPoints] = useState([]);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const handlePoints = useCallback((value) => {
    console.log(points.find(i => i.id !== value._id));
    // console.log(points.map(i => i.some(y => value.find(j => y === j))));
    // console.log('value:',value._id);
    const adapter = {
      id: value._id,
      coordinates: value.location.coordinates
    }

    setPoints(prevState => [...prevState, adapter]);
    // if (
    //   points.find()
    // ) {
    //   setSelectedRole(undefined);
    // } else {
    //   setSelectedRole(undefined);
    // }
  }, [])

  return (
    <>
      <button
        onClick={() => console.log(points)}
      >
        teste
      </button>
      <MapContainer
        center={center}
        zoom={4}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/winter/256/{z}/{x}/{y}.png?key=dw25cMbbo4Bdj8Pqqtrh"
          attribution='<<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          tileSize={1}
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
                      // mouseover: (e) => {
                      //   const layer = e.target;
                      //   layer.setStyle({
                      //     fillOpacity: 0.7,
                      //     weight: 5,
                      //     dashArray: "",
                      //     color: "#666",
                      //     fillColor: "#D45962",
                      //   });
                      // },
                      // mouseout: (e) => {
                      //   const layer = e.target;
                      //   layer.setStyle({
                      //     fillOpacity: 0.7,
                      //     weight: 2,
                      //     dashArray: "3",
                      //     color: "white",
                      //     fillColor: "#FD8D3C",
                      //   });
                      // },
                      click: (e) => {
                        const layer = e.target;
                        handlePoints(state);
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
        {/* {position && position.length() >= 6 && (
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
        )} */}

        {/* <Polygon pathOptions={purpleOptions} positions={Polygon} /> */}
      </MapContainer>
    </>
  );
};

export default Home;
