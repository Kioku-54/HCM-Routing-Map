/* eslint-disable no-constant-condition */
import * as turf from '@turf/turf'
import { LocationForRouteType } from 'src/types/simulate-vehicle.type'

const polygonCoordinates = [
  [
    [106.6175157621725, 10.84568900661857],
    [106.56605238038043, 10.678549647516775],
    [106.61933211682475, 10.709486328185847],
    [106.62538663232891, 10.72971245048035],
    [106.65505375830395, 10.746963074043563],
    [106.65565920985472, 10.717814895171003],
    [106.65808101605609, 10.642254526854416],
    [106.69259175443551, 10.648204843118052],
    [106.74950420018257, 10.639874367832164],
    [106.72589158971334, 10.752316515481041],
    [106.73860607227408, 10.77432410963371],
    [106.75919142499129, 10.82606535269376],
    [106.74466058777824, 10.839742580691748],
    [106.71983707420759, 10.86293297296595],
    [106.64960469435056, 10.86293297296595],
    [106.6175157621725, 10.84568900661857]
  ]
]

const randomPointInBbox = () => {
  const polygon = turf.polygon(polygonCoordinates)
  const bbox = turf.bbox(polygon)

  while (true) {
    const randomX = Math.random() * (bbox[2] - bbox[0]) + bbox[0]
    const randomY = Math.random() * (bbox[3] - bbox[1]) + bbox[1]

    const point = turf.point([randomX, randomY])
    if (turf.booleanPointInPolygon(point, polygon)) {
      const coordinates = {
        lng: point.geometry.coordinates[0],
        lat: point.geometry.coordinates[1]
      }
      return coordinates
    }
  }
}

export const randomPointsWithMinDistance = async (minDistance: number): Promise<LocationForRouteType> => {
  let startPoint, endPoint

  while (true) {
    // Generate two random points
    startPoint = randomPointInBbox()
    endPoint = randomPointInBbox()

    // Calculate the distance between the two points
    const distance = turf.distance(
      turf.point([startPoint.lng, startPoint.lat]),
      turf.point([endPoint.lng, endPoint.lat]),
      { units: 'kilometers' }
    )

    if (distance >= minDistance) {
      break
    }
  }
  const locationsForRoute = {
    startCoord: startPoint,
    endCoord: endPoint
  }

  return locationsForRoute
}
