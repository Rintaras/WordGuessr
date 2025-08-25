"use client"
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export type MapInnerProps = {
  onPick: (lat: number, lng: number) => void
  picked?: { lat: number; lng: number } | null
  correct?: { lat: number; lng: number } | null
}

function Events({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    }
  })
  return null
}

export default function MapInner({ onPick, picked, correct }: MapInnerProps) {
  const showBothLocations = picked && correct

  return (
    <div className="h-[60vh] w-full">
      <MapContainer
        center={[36.2048, 138.2529]}
        zoom={5.3}
        style={{ height: '100%', width: '100%' }}
        className="rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Events onPick={onPick} />

        {/* 選択された位置のピン */}
        {picked && (
          <Marker
            position={[picked.lat, picked.lng]}
            icon={L.divIcon({
              className: 'custom-marker',
              html: '<div class="w-6 h-6 bg-blue-500 border-2 border-white rounded-full shadow-lg"></div>',
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })}
          >
            <Popup>
              <div className="text-center">
                <div className="font-bold text-blue-600">選択した位置</div>
                <div className="text-sm text-gray-600">
                  {picked.lat.toFixed(4)}, {picked.lng.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* 正解位置のピン */}
        {correct && (
          <Marker
            position={[correct.lat, correct.lng]}
            icon={L.divIcon({
              className: 'custom-marker',
              html: '<div class="w-6 h-6 bg-green-500 border-2 border-white rounded-full shadow-lg"></div>',
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })}
          >
            <Popup>
              <div className="text-center">
                <div className="font-bold text-green-600">正解の位置</div>
                <div className="text-sm text-gray-600">
                  {correct.lat.toFixed(4)}, {correct.lng.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* 距離を示す線 */}
        {showBothLocations && (
          <Polyline
            positions={[[picked.lat, picked.lng], [correct.lat, correct.lng]]}
            color="#ef4444"
            weight={4}
            opacity={0.9}
            dashArray="15, 10"
          />
        )}
      </MapContainer>

      {/* 地図の説明オーバーレイ */}
      {showBothLocations && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200 z-30">
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">選択位置</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">正解位置</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">距離線</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
