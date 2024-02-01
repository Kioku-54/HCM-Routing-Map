import {
  addGeoJsonSourceRaw,
  addGeoJsonFillLayer,
  addGeoJsonLineLayer,
  addGeoJsonSymbolLayer
} from 'src/types/geojson.type'

import { FillExtrusionLayer, LineLayer, SymbolLayer, GeoJSONSourceRaw } from 'mapbox-gl'

const addGeoJsonSource = (params: addGeoJsonSourceRaw) => {
  const { map, sourceId, data } = params
  const sourceJson: GeoJSONSourceRaw = { type: 'geojson', data }
  map.addSource(sourceId, sourceJson)
}

const addFillGeoJsonLayer = (params: addGeoJsonFillLayer) => {
  const { map, sourceId, layerId, layout, paint } = params
  const fillLayer: FillExtrusionLayer = {
    source: sourceId,
    id: layerId + 'Fill',
    type: 'fill-extrusion',
    paint: paint !== undefined ? paint : {},
    layout: layout !== undefined ? layout : {}
  }
  map.addLayer(fillLayer)
}

const addLineGeoJsonLayer = (params: addGeoJsonLineLayer) => {
  const { map, sourceId, layerId, layout, paint } = params
  const lineLayer: LineLayer = {
    source: sourceId,
    type: 'line',
    id: layerId + 'Line',
    paint: paint !== undefined ? paint : {},
    layout: layout !== undefined ? layout : {}
  }
  map.addLayer(lineLayer)
}

const addSymbolGeoJsonLayer = (params: addGeoJsonSymbolLayer) => {
  const { map, sourceId, layerId, layout, paint } = params
  const symbolLayer: SymbolLayer = {
    id: layerId,
    source: sourceId,
    type: 'symbol',
    paint: paint !== undefined ? paint : {},
    layout: layout !== undefined ? layout : {}
  }

  map.addLayer(symbolLayer)
}

export const geojsonLayer = {
  addGeoJsonSource,
  addFillGeoJsonLayer,
  addLineGeoJsonLayer,
  addSymbolGeoJsonLayer
}
