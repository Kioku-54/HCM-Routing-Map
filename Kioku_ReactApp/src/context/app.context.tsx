import { createContext, useState } from 'react'
import { Geometry, FeatureCollection, GeoJsonProperties } from 'geojson'
import Default_Point from '../assets/geojson/Default_Point.json'

interface AppContextInterface {
  minDistance: number
  setMinDistance: React.Dispatch<React.SetStateAction<number>>
  numberVehicles: number
  setNumberVehicles: React.Dispatch<React.SetStateAction<number>>
  researchArea: FeatureCollection
  setResearchArea: React.Dispatch<React.SetStateAction<FeatureCollection<Geometry, GeoJsonProperties>>>
  isDrawing: boolean
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
}

const initialAppContext = {
  minDistance: 10,
  setMinDistance: () => null,
  numberVehicles: 3,
  setNumberVehicles: () => null,
  researchArea: (Default_Point as FeatureCollection) || null,
  setResearchArea: () => null,
  isDrawing: false,
  setIsDrawing: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const [minDistance, setMinDistance] = useState<number>(defaultValue.minDistance)
  const [numberVehicles, setNumberVehicles] = useState<number>(defaultValue.numberVehicles)
  const [researchArea, setResearchArea] = useState<FeatureCollection>(defaultValue.researchArea)
  const [isDrawing, setIsDrawing] = useState<boolean>(defaultValue.isDrawing)

  const reset = () => {
    setMinDistance(defaultValue.minDistance)
    setNumberVehicles(defaultValue.numberVehicles)
    setResearchArea(defaultValue.researchArea)
  }

  return (
    <AppContext.Provider
      value={{
        minDistance,
        setMinDistance,
        numberVehicles,
        setNumberVehicles,
        researchArea,
        setResearchArea,
        isDrawing,
        setIsDrawing,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
