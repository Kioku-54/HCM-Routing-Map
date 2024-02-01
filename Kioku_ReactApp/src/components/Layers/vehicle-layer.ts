/* eslint-disable no-constant-condition */
import { Map } from 'mapbox-gl'
import * as turf from '@turf/turf'
import { FeatureCollection, Position } from 'geojson'
import { geojsonLayer } from './geojson-layer'
import { LAYERS_CONFIG } from './layer.config'
import { getRoutingUrl } from 'src/helpers/getRoutingData'
import { callGetApiWithoutToken } from 'src/helpers/request'
import { LocationForRouteType } from 'src/types/simulate-vehicle.type'
import Default_Point from '../../assets/geojson/Default_Point.json'
import { randomPointsWithMinDistance } from 'src/utils/generateLocations'
import { osrm_response } from 'src/types/osrm.type'

const addVehicleLayer = (current_map: Map, data: FeatureCollection, id: number) => {
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

const createRouteFromOSRMApi = async (location: LocationForRouteType) => {
  const apiUrl = getRoutingUrl(location)

  try {
    const coordinatesList: Position[] = []
    const typedResponse = (await callGetApiWithoutToken(apiUrl)) as osrm_response
    const legs = typedResponse.routes[0].legs

    legs.forEach((leg) => {
      const steps = leg.steps
      steps.forEach((step) => {
        const coordinates = step.geometry.coordinates
        coordinatesList.push(coordinates[0])
      })
    })

    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            coordinates: coordinatesList,
            type: 'LineString'
          }
        }
      ]
    }

    return geojson
  } catch (error) {
    console.error('Error fetching data:', error)
    const geojson = {
      type: 'FeatureCollection',
      feature: []
    }
    return geojson
  }
}

const handleVehicleAnimate = (current_Map: Map, id: number, animationSpeed: number) => {
  let distanceCovered = 0

  const animate = () => {
    distanceCovered += animationSpeed
    const routeLength = turf.length(current_Map.getSource(`Route${id}`)._data.features[0], {
      units: 'kilometers'
    })

    if (distanceCovered >= routeLength) {
      distanceCovered = 0
    }

    const pointOnLine = turf.along(current_Map.getSource(`Route${id}`)._data.features[0], distanceCovered, {
      units: 'kilometers'
    })

    current_Map.getSource(`Vehicle${id}`).setData({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: pointOnLine.geometry.coordinates
      }
    })

    requestAnimationFrame(animate)
  }

  animate()
}

const addRouteLayer = (current_map: Map, data: FeatureCollection, id: number) => {
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

const addRoutingsLayer = async (
  current_Map: Map,
  location: LocationForRouteType,
  id: number,
  animationSpeed: number
) => {
  const route = (await createRouteFromOSRMApi(location)) as unknown as FeatureCollection
  const point = Default_Point as FeatureCollection

  current_Map.on('load', () => {
    addRouteLayer(current_Map, route, id)
    addVehicleLayer(current_Map, point, id)
    handleVehicleAnimate(current_Map, id, animationSpeed)
  })
}

export const handleRoutingLayers = async (current_Map: Map, id: number, steps: number) => {
  const minDistance = 10
  const dataCreateRoute = await randomPointsWithMinDistance(minDistance)
  await addRoutingsLayer(current_Map, dataCreateRoute, id, steps)
}
