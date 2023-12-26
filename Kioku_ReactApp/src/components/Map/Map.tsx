import mapboxgl, { Map } from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import { environment } from 'src/env/env.dev'
import { FeatureCollection } from 'geojson'
import Roads from '../../assets/geojson/Roads.json'
import Buildings from '../../assets/geojson/Buildings.json'
import { addFillGeoJSONLayer, addGeoJSONSource, addLineGeoJSONLayer } from '../Layers/GeoJSON/Manage_GeoJson_Layer'
mapboxgl.accessToken = environment.config.accessToken

const MapComponent = () => {
  const map = useRef<Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const addBuildingData = (current_Map: Map | null) => {
    const layer_Id = 'Building_layer'
    const source_Id = 'Building_Source'
    const data = Buildings as FeatureCollection
    addGeoJSONSource(current_Map, source_Id, data)
    addFillGeoJSONLayer(current_Map, source_Id, layer_Id, 0.5)
  }

  const addRoadData = (current_Map: Map | null) => {
    const layer_Id = 'Road_layer'
    const source_Id = 'Road_Source'
    const data = Roads as FeatureCollection
    addGeoJSONSource(current_Map, source_Id, data)
    addLineGeoJSONLayer(current_Map, source_Id, layer_Id, 2)
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    map.current = new mapboxgl.Map({
      hash: environment.config.initHash,
      zoom: environment.config.initZoom,
      container: mapContainerRef.current,
      style: environment.config.initStyle,
      center: [environment.config.initLng, environment.config.initLat]
    })

    map.current.on('load', () => {
      const current_Map = map.current

      addRoadData(current_Map)
      addBuildingData(current_Map)
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  return <div className='map-container h-full w-full' ref={mapContainerRef} />
}

export default MapComponent
