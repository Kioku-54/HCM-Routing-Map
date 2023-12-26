import { Map, FillLayer, LineLayer, GeoJSONSourceRaw } from 'mapbox-gl'
import { FeatureCollection } from 'geojson'

const addGeoJSONSource = (map: Map | null, sourceId: string, data: FeatureCollection) => {
  if (!map) return

  const sourceJson: GeoJSONSourceRaw = {
    type: 'geojson',
    data
  }

  map.addSource(sourceId, sourceJson)
}

const addFillGeoJSONLayer = (map: Map | null, sourceId: string, layerId: string, fillOpacity: number) => {
  if (!map) return

  const fillLayer: FillLayer = {
    id: layerId,
    source: sourceId,
    type: 'fill',
    paint: {
      'fill-color': 'red',
      'fill-opacity': fillOpacity
    }
  }
  map.addLayer(fillLayer)
}

const addLineGeoJSONLayer = (map: Map | null, sourceId: string, layerId: string, lineWidth: number) => {
  if (!map) return

  const lineLayer: LineLayer = {
    id: layerId + 'Line',
    source: sourceId,
    type: 'line',
    paint: {
      'line-color': 'blue',
      'line-width': lineWidth
    }
  }

  map.addLayer(lineLayer)
}

export { addGeoJSONSource, addFillGeoJSONLayer, addLineGeoJSONLayer }
