import { callGetApiWithoutToken } from './request'

interface RouteResponse {
  routes: {
    distance: number
    legs: [
      leg: {
        steps: []
      }
    ]
  }[]
}

interface Location {
  startCoord: {
    lng: number
    lat: number
  }
  endCoord: {
    lng: number
    lat: number
  }
}

export const getRoutingUrl = (location: Location) => {
  const startCoord = location.startCoord
  const endCoord = location.endCoord
  const apiUrl = `http://localhost:8082/route/v1/driving/${startCoord.lng},${startCoord.lat};${endCoord.lng},${endCoord.lat}?overview=false&alternatives=true&steps=true&geometries=geojson`
  return apiUrl
}

export const getRoutingData = async () => {
  const apiUrl = `http://localhost:8082/route/v1/driving/106.698763,10.759722;106.711568,10.754964?overview=false&alternatives=true&steps=true&geometries=geojson`
  try {
    const coordinatesList: [] = []
    const typedResponse = (await callGetApiWithoutToken(apiUrl)) as RouteResponse

    // const distance: number = typedResponse.routes[0].distance
    const legs = typedResponse.routes[0].legs

    legs.forEach((leg) => {
      const steps: [] = leg.steps
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
