import { Map } from 'mapbox-gl'
import * as turf from '@turf/turf'

export const vehicleAnimate = (current_Map: Map, id: number, animationSpeed: number) => {
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
