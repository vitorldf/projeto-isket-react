import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Polygon,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { statesData } from "../../data";
import { useMap as useMyMap } from "../../hooks/useMap";

const Home = () => {
  const { maps, loading, getCountries, postCountries } = useMyMap();

  const center = [53.847818, 23.424076];

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const isMarkerInsidePolygon = (marker, poly) => {
    var inside = false;
    var x = marker.getLatLng().lat,
      y = marker.getLatLng().lng;
    for (var ii = 0; ii < poly.getLatLngs().length; ii++) {
      var polyPoints = poly.getLatLngs()[ii];
      for (
        var i = 0, j = polyPoints.length - 1;
        i < polyPoints.length;
        j = i++
      ) {
        var xi = polyPoints[i].lat,
          yi = polyPoints[i].lng;
        var xj = polyPoints[j].lat,
          yj = polyPoints[j].lng;

        var intersect =
          yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
    }

    return inside;
  };

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ width: "100vw", height: "100vh" }}
    >
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={(e) =>
            maps.map((state) =>
              isMarkerInsidePolygon(state.location.coordinates, e.layer)
            )
          }
          draw={{
            rectangle: false,
          }}
        />
        <TileLayer
          url="https://api.maptiler.com/maps/winter/256/{z}/{x}/{y}.png?key=dw25cMbbo4Bdj8Pqqtrh"
          attribution='<<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {!loading && maps
          ? maps.map((state, index) => {
              const coordinates = state.location.coordinates;

              return (
                <>
                  <Circle
                    key={index.toString()}
                    center={coordinates}
                    pathOptions={{ fillColor: "#FD8D3C" }}
                    radius={100000}
                  />
                </>
              );
            })
          : null}
      </FeatureGroup>
    </MapContainer>
  );
};

export default Home;
