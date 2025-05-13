import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  properties: string[]
  money: number
}

interface TradeModalProps {
  currentPlayer: Player
  otherPlayers: Player[]
  onTrade: (offer: TradeOffer) => void
  onClose: () => void
}

interface TradeOffer {
  toPlayerId: number
  offeredMoney: number
  requestedMoney: number
  offeredProperties: string[]
  requestedProperties: string[]
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
  const [offeredProperties, setOfferedProperties] = useState<string[]>([])
  const [requestedProperties, setRequestedProperties] = useState<string[]>([])

  const handleCheckboxChange = (
    prop: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
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

  const selectedPlayer = otherPlayers.find(p => p.id === selectedPlayerId)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px] space-y-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Propune un schimb</h2>
          <button onClick={onClose} className="text-red-600 text-xl font-bold">×</button>
        </div>

        <label>
          Jucător:
          <select
            value={selectedPlayerId}
            onChange={(e) => setSelectedPlayerId(Number(e.target.value))}
            className="ml-2"
          >
            {otherPlayers.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>

        <div>
          <h3 className="font-semibold">Ce oferi</h3>
          <input
            type="number"
            min={0}
            value={offeredMoney}
            onChange={(e) => setOfferedMoney(Number(e.target.value))}
            placeholder="Bani"
            className="w-full border px-2 py-1 mt-1"
          />
          <div className="mt-2">
            {currentPlayer.properties.map(prop => (
              <label key={prop} className="block">
                <input
                  type="checkbox"
                  checked={offeredProperties.includes(prop)}
                  onChange={() => handleCheckboxChange(prop, offeredProperties, setOfferedProperties)}
                /> {prop}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Ce ceri</h3>
          <input
            type="number"
            min={0}
            value={requestedMoney}
            onChange={(e) => setRequestedMoney(Number(e.target.value))}
            placeholder="Bani"
            className="w-full border px-2 py-1 mt-1"
          />
          <div className="mt-2">
            {selectedPlayer?.properties.map(prop => (
              <label key={prop} className="block">
                <input
                  type="checkbox"
                  checked={requestedProperties.includes(prop)}
                  onChange={() => handleCheckboxChange(prop, requestedProperties, setRequestedProperties)}
                /> {prop}
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
