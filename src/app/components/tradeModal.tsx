import React, { useState } from 'react'
import { Player, Property } from "@/types/page"

interface TradeModalProps {
  currentPlayer: Player | null
  otherPlayers: Player[] | []
  onTrade: (offer: TradeOffer) => void
  onClose: () => void
}

interface TradeOffer {
  toPlayerId: number
  offeredMoney: number
  requestedMoney: number
  offeredProperties: Property[]
  requestedProperties: Property[]
}

const TradeModal: React.FC<TradeModalProps> = ({
  currentPlayer,
  otherPlayers,
  onTrade,
  onClose
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number>(otherPlayers[0]?.id || 0)
  const [offeredMoney, setOfferedMoney] = useState(0)
  const [requestedMoney, setRequestedMoney] = useState(0)
  const [offeredProperties, setOfferedProperties] = useState<Property[]>([])
  const [requestedProperties, setRequestedProperties] = useState<Property[]>([])

  const handleCheckboxChange = (
    prop: Property,
    state: Property[],
    setState: React.Dispatch<React.SetStateAction<Property[]>>
  ) => {
    setState(state.includes(prop) ? state.filter(p => p !== prop) : [...state, prop])
  }

  const handleSubmit = () => {
    onTrade({
      toPlayerId: selectedPlayerId,
      offeredMoney,
      requestedMoney,
      offeredProperties,
      requestedProperties
    })
    onClose()
  }

 console.log('currentPlayer', currentPlayer)
  console.log('otherPlayers', otherPlayers)
  const selectedPlayer = otherPlayers.find(p => p.id === selectedPlayerId)

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px] space-y-4">
        <div className="flex justify-between">
          <h2 className="text-lg text-gray-800 font-semibold">Propune un schimb</h2>
          <button onClick={onClose} className="text-red-600 text-3xl font-bold cursor-pointer">×</button>
        </div>

        <label className="text-gray-800">
          Jucător:
          <select
            value={selectedPlayerId}
            onChange={(e) => setSelectedPlayerId(Number(e.target.value))}
            className="ml-2 text-gray-800"
          >
            {otherPlayers.map(p => (
              <option key={`otherPlayer-${p.id}`} value={p.id}>{p.username}</option>
            ))}
          </select>
        </label>

        <div>
          <h3 className="font-semibold text-gray-800">Ce oferi</h3>
          <input
            type="number"
            min={0}
            value={offeredMoney}
            onChange={(e) => setOfferedMoney(Number(e.target.value))}
            placeholder="Bani"
            className="w-full border px-2 py-1 mt-1 text-gray-800"
          />
          <div className="mt-2">
            {currentPlayer?.properties.map((prop) => (
              <label key={`offer-${prop.id}`} className="block text-gray-800">
                <input
                  type="checkbox"
                  checked={offeredProperties.includes(prop)}
                  onChange={() => handleCheckboxChange(prop, offeredProperties, setOfferedProperties)}
                  className="text-gray-800"
                /> {prop.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Ce ceri</h3>
          <input
            type="number"
            min={0}
            value={requestedMoney}
            onChange={(e) => setRequestedMoney(Number(e.target.value))}
            placeholder="Bani"
            className="w-full border px-2 py-1 mt-1 text-gray-800"
          />
          <div className="mt-2">
            {selectedPlayer?.properties.map((prop) => (
              <label key={`request-${prop.id}`} className="block text-gray-800">
                <input
                  type="checkbox"
                  checked={requestedProperties.includes(prop)}
                  onChange={() => handleCheckboxChange(prop, requestedProperties, setRequestedProperties)}
                  className="text-gray-800"
                /> {prop.name}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Trimite oferta
        </button>
      </div>
    </div>
  )
}

export default TradeModal
