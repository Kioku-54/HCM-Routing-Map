import { LineString } from 'geojson'
interface route {
  legs: [leg]
  weight: number
  distance: number
  duration: number
  weight_name: string
}

interface leg {
  steps: [step]
  weight?: number
  distance?: number
  duration?: number
  summary?: string
}

interface step {
  distance?: number
  driving_side?: string
  duration?: number
  geometry: LineString
  intersections?: []
  maneuver?: object
  mode?: string
  name?: string
  weight?: number
}

interface hint {
  hint?: string
}

export interface osrm_response {
  code: string
  routes: [route]
  waypoints: [hint]
}
