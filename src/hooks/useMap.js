import { useContext } from  "react"
import { MapContext } from "../context/map"

export const useMap = () => {
  const context = useContext(MapContext)

  return context;
}
