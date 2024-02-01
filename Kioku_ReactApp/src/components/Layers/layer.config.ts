import { FeatureCollection } from 'geojson'
import { FillExtrusionPaint, SymbolLayout, LinePaint } from 'mapbox-gl'
import Buildings from '../../assets/geojson/Buildings.json'

const BUILDING_LAYER = {
  sourceId: 'BuildingSource',
  layerId: 'BuildingLayer',
  data: Buildings as FeatureCollection,
  paint: {
    'fill-extrusion-color': '#f1ece1',
    'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['case', ['>', ['get', 'Height'], 15], ['get', 'Height'], 0]
    ],
    'fill-extrusion-opacity': 0.5
  } as FillExtrusionPaint
}

const ROUTE_LAYER = {
  sourceId: 'Route',
  layerId: 'Route',
  paint: {
    'line-color': 'blue',
    'line-width': 0.5
  } as LinePaint
}

const VEHICLE_LAYER = {
  sourceId: 'Vehicle',
  layerId: 'Vehicle',
  layout: {
    'icon-image': 'bus',
    'icon-size': 1.5,
    'icon-rotate': ['get', 'bearing'],
    'icon-rotation-alignment': 'map',
    'icon-allow-overlap': true,
    'icon-ignore-placement': true
  } as SymbolLayout
}

export const LAYERS_CONFIG = { BUILDING_LAYER, ROUTE_LAYER, VEHICLE_LAYER }
