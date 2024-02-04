import mapboxgl, { Map } from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import { environment } from 'src/env/env.dev'
import { LAYERS_CONFIG } from '../Layers/layer.config'
import { geojsonLayer } from '../Layers/geojson-layer'
import { handleRoutingLayers } from '../Layers/vehicle-layer'

mapboxgl.accessToken = environment.config.accessToken

const MapComponent = () => {
  const map = useRef<Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const addBuildingData = (current_map: Map | null) => {
    if (current_map === null) return

    current_map.on('load', () => {
      geojsonLayer.addGeoJsonSource({
        map: current_map,
        sourceId: LAYERS_CONFIG.BUILDING_LAYER.sourceId,
        data: LAYERS_CONFIG.BUILDING_LAYER.data
      })

      geojsonLayer.addFillGeoJsonLayer({
        map: current_map,
        sourceId: LAYERS_CONFIG.BUILDING_LAYER.sourceId,
        layerId: LAYERS_CONFIG.BUILDING_LAYER.layerId,
        paint: LAYERS_CONFIG.BUILDING_LAYER.paint
      })
    })
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    map.current = new Map({
      hash: environment.config.initHash,
      zoom: environment.config.initZoom,
      container: mapContainerRef.current,
      style: environment.config.initStyle,
      center: [environment.config.initLng, environment.config.initLat]
    })

    const current_map = map.current

    addBuildingData(current_map)
    handleRoutingLayers(current_map)

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  return <div className='map-container h-full w-full' ref={mapContainerRef} />
}

export default MapComponent
