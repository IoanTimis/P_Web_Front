import React from 'react'

interface Property {
  name: string
  price: number
  ownerId: number | null 
  rent: number
}

interface ActionModalProps {
  property: Property
  currentPlayerId: number
  onBuy: () => void
  onPayRent: () => void
  onAuction: () => void
  onClose: () => void
}

const ActionModal: React.FC<ActionModalProps> = ({
  property,
  currentPlayerId,
  onBuy,
  onPayRent,
  onAuction,
  onClose
}) => {
  const isOwned = property.ownerId !== null
  const isOwnedByOther = isOwned && property.ownerId !== currentPlayerId

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[350px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Acțiune pe {property.name}</h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold text-xl hover:text-red-800"
          >
            ×
          </button>
        </div>

        <div className="text-sm space-y-4">
          {isOwnedByOther ? (
            <>
              <p>Proprietatea este deținută. Trebuie să plătești chirie de <strong>{property.rent} $</strong>.</p>
              <button
                onClick={onPayRent}
                className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
              >
                Plătește chiria
              </button>
            </>
          ) : !isOwned ? (
            <>
              <p>Proprietatea nu este deținută. Vrei să o cumperi pentru <strong>{property.price} $</strong>?</p>
              <div className="flex gap-2">
                <button
                  onClick={onBuy}
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                >
                  Cumpără
                </button>
                <button
                  onClick={onAuction}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                >
                  Refuz → Licitație
                </button>
              </div>
            </>
          ) : (
            <p>Este deja proprietatea ta. Nu trebuie să faci nimic.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ActionModal
