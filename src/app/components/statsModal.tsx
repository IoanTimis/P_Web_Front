import { Player } from '@/types/page'
import React from 'react'

interface PlayerStatusModalProps {
  player: Player
  onClose: () => void
}

const PlayerStatusModal: React.FC<PlayerStatusModalProps> = ({ player, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-[300px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black-600 text-lg font-semibold">Statistici - {player?.username}</h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold text-xl hover:text-red-800 cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="text-sm space-y-2">
          <div>
            <strong>Cash:</strong> ${player?.balance}
          </div>
          <div>
            <strong>Proprietăți:</strong>
            <ul className="list-disc list-inside ml-2 mt-1">
              {player?.properties?.length > 0 ? (
                player.properties.map((property, index) => (
                  <li key={index}>{property.name}</li>
                ))
              ) : (
                <li>Nicio proprietate</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerStatusModal