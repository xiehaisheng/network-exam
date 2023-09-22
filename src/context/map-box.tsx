import { useState } from "react";
import { createContext } from "./base";
import mapboxgl from "mapbox-gl";

export const MapBoxContext = createContext(() => {
  const [data, setData] = useState({
    map: null as null | mapboxgl.Map,
  });

  return {
    data,
    setMap(map: mapboxgl.Map) {
      setData({
        map,
      });
    },
  };
});
