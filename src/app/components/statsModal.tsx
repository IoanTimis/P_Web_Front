import React from 'react'

interface Player {
  id: number
  name: string
  money: number
  token: string
  properties: string[]
}

interface PlayerStatusModalProps {
  player: Player
  onClose: () => void
}

const PlayerStatusModal: React.FC<PlayerStatusModalProps> = ({ player, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[300px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Statistici - {player.name}</h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold text-xl hover:text-red-800"
          >
            ×
          </button>
        </div>

        <div className="text-sm space-y-2">
          <div>
            <strong>Cash:</strong> ${player.money}
          </div>
          <div>
            <strong>Pion:</strong> {player.token}
          </div>
          <div>
            <strong>Proprietăți:</strong>
            <ul className="list-disc list-inside ml-2 mt-1">
              {player.properties.length > 0 ? (
                player.properties.map((property, index) => (
                  <li key={index}>{property}</li>
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
