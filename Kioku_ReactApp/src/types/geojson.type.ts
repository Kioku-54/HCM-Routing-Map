import {
  Map,
  FillExtrusionLayout,
  FillExtrusionPaint,
  LineLayout,
  LinePaint,
  SymbolLayout,
  SymbolPaint
} from 'mapbox-gl'

import { FeatureCollection } from 'geojson'

export interface addGeoJsonSourceRaw {
  map: Map
  sourceId: string
  data: FeatureCollection
}

export interface addGeoJsonFillLayer {
  map: Map
  sourceId: string
  layerId: string
  layout?: FillExtrusionLayout | undefined
  paint?: FillExtrusionPaint | undefined
}

export interface addGeoJsonLineLayer {
  map: Map
  sourceId: string
  layerId: string
  layout?: LineLayout | undefined
  paint?: LinePaint | undefined
}

export interface addGeoJsonSymbolLayer {
  map: Map
  sourceId: string
  layerId: string
  layout?: SymbolLayout | undefined
  paint?: SymbolPaint | undefined
}
