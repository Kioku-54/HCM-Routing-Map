/* eslint-disable no-constant-condition */
import { Map } from 'mapbox-gl'
import * as turf from '@turf/turf'
import { FeatureCollection } from 'geojson'
import { geojsonLayer } from './geojson-layer'
import { LAYERS_CONFIG } from './layer.config'
import { generateRoute } from 'src/utils/generateRoute'
import Default_Point from '../../assets/geojson/Default_Point.json'
import { randomPointsWithMinDistance } from 'src/utils/generateLocations'

const steps = 0.01
const minDistance = 3

const addRouteLayer = async (current_map: Map, data: FeatureCollection, id: number) => {
  geojsonLayer.addGeoJsonSource({
    map: current_map,
    sourceId: LAYERS_CONFIG.ROUTE_LAYER.sourceId + id,
    data: data
  })

  geojsonLayer.addLineGeoJsonLayer({
    map: current_map,
    sourceId: LAYERS_CONFIG.ROUTE_LAYER.sourceId + id,
    layerId: LAYERS_CONFIG.ROUTE_LAYER.layerId + id,
    paint: LAYERS_CONFIG.ROUTE_LAYER.paint
  })
}

const addVehicleLayer = async (current_map: Map, data: FeatureCollection, id: number) => {
  geojsonLayer.addGeoJsonSource({
    map: current_map,
    sourceId: LAYERS_CONFIG.VEHICLE_LAYER.sourceId + id,
    data: data
  })
  geojsonLayer.addSymbolGeoJsonLayer({
    map: current_map,
    sourceId: LAYERS_CONFIG.VEHICLE_LAYER.sourceId + id,
    layerId: LAYERS_CONFIG.VEHICLE_LAYER.layerId + id,
    layout: LAYERS_CONFIG.VEHICLE_LAYER.layout
  })
}

const removeVehicleLayer = async (current_map: Map, id: number) => {
  current_map.removeLayer(`Vehicle${id}`)
  current_map.removeSource(`Vehicle${id}`)
}

const handleVehicleAnimate = async (current_map: Map, id: number, animationSpeed: number) => {
  let distanceCovered = 0
  let shouldAnimate = true

  const sourceData = current_map.getSource(`Route${id}`)._data.features[0]
  const routeLength = turf.length(sourceData, { units: 'kilometers' })

  const animate = async () => {
    if (!shouldAnimate) {
      await removeVehicleLayer(current_map, id)
      await handleVehicleLayer(current_map, id)
      return
    }

    distanceCovered += animationSpeed

    if (distanceCovered >= routeLength) {
      distanceCovered = routeLength
      shouldAnimate = false // Stop animation after completing one iteration
    }

    const pointOnLine = turf.along(sourceData, distanceCovered, {
      units: 'kilometers'
    })

    current_map.getSource(`Vehicle${id}`).setData({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: pointOnLine.geometry.coordinates
          },
          properties: {
            id: `Vehicle${id}`
          }
        }
      ]
    })

    requestAnimationFrame(animate)
  }

  animate()
}

const handleVehicleLayer = async (current_map: Map, id: number) => {
  const point = Default_Point as FeatureCollection
  await addVehicleLayer(current_map, point, id)
  await handleVehicleAnimate(current_map, id, steps)
}

export const handleRoutingLayers = async (current_map: Map) => {
  current_map.on('style.load', async () => {
    for (let id = 0; id < 20; id++) {
      const dataCreateRoute = await randomPointsWithMinDistance(minDistance)
      const route = (await generateRoute(dataCreateRoute)) as unknown as FeatureCollection

      await addRouteLayer(current_map, route, id)
      await handleVehicleLayer(current_map, id)
    }
  })
}
