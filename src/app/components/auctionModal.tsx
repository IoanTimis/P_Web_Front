import React, { useState } from 'react'

interface AuctionModalProps {
  propertyName: string
  onSubmitBid: (bid: number, bidderName: string) => void
  onClose: () => void
}

const AuctionModal: React.FC<AuctionModalProps> = ({
  propertyName,
  onSubmitBid,
  onClose
}) => {
  const [bid, setBid] = useState<number>(0)
  const [bidderName, setBidderName] = useState<string>('')

  const handleSubmit = () => {
    if (bid > 0 && bidderName.trim() !== '') {
      onSubmitBid(bid, bidderName)
      setBid(0)
      setBidderName('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px] space-y-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Licitație pentru {propertyName}</h2>
          <button onClick={onClose} className="text-red-600 text-xl font-bold">×</button>
        </div>

        <input
          type="text"
          placeholder="Nume jucător"
          value={bidderName}
          onChange={(e) => setBidderName(e.target.value)}
          className="w-full border px-2 py-1"
        />

        <input
          type="number"
          placeholder="Suma oferită"
          value={bid}
          onChange={(e) => setBid(Number(e.target.value))}
          min={1}
          className="w-full border px-2 py-1"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Trimite ofertă
        </button>
      </div>
    </div>
  )
}

export default AuctionModal
