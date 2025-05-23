import React from 'react'
import { Player, Property, TradeOffer } from "@/types/page"

interface ManageTradeModalProps {
  offer: TradeOffer
  onAccept: () => void
  onReject: () => void
  onClose: () => void
}

const ManageTradeModal: React.FC<ManageTradeModalProps> = ({
  offer,
  onAccept,
  onReject,
  onClose
}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px] space-y-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Ofertă de schimb</h2>
          <button onClick={onClose} className="text-red-600 text-xl font-bold">×</button>
        </div>

        <p className="text-sm text-gray-800">
          <strong>{offer.fromPlayer.username}</strong> propune un schimb către <strong>{offer.toPlayer.username}</strong>
        </p>

        <div className="border rounded p-2 text-sm text-gray-800">
          <h3 className="font-semibold mb-1">Oferă:</h3>
          {offer.offeredMoney > 0 && <div>- ${offer.offeredMoney}</div>}
          {offer.offeredProperties.map((prop) => (
            <div key={`offered-${prop.id}`}>- {prop.name}</div>
          ))}
        </div>

        <div className="border rounded p-2 text-sm text-gray-800">
          <h3 className="font-semibold mb-1">Cere:</h3>
          {offer.requestedMoney > 0 && <div>- ${offer.requestedMoney}</div>}
          {offer.requestedProperties.map((prop) => (
            <div key={`requested-${prop.id}`}>- {prop.name}</div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onReject}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-[48%]"
          >
            Refuză
          </button>
          <button
            onClick={onAccept}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-[48%]"
          >
            Acceptă
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageTradeModal
