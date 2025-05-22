import React from 'react'

interface InfoModalProps {
  message: string
  onClose: () => void
}

const InfoModal: React.FC<InfoModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-[300px] text-center">
        <p className="mb-4 text-sm text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default InfoModal
