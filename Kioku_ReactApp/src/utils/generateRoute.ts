import { LocationForRouteType } from 'src/types/simulate-vehicle.type'
import { callGetApiWithoutToken } from 'src/helpers/request'
import { osrm_response } from 'src/types/osrm.type'
import { Position } from 'geojson'

const getRoutingUrl = (location: LocationForRouteType) => {
  const startCoord = location.startCoord
  const endCoord = location.endCoord
  const apiUrl = `http://localhost:8082/route/v1/driving/${startCoord.lng},${startCoord.lat};${endCoord.lng},${endCoord.lat}?overview=false&alternatives=true&steps=true&geometries=geojson`
  return apiUrl
}

export const generateRoute = async (location: LocationForRouteType) => {
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
