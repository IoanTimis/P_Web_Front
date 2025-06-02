import React from 'react';
import { Player, Trade, Property } from '@/types/page';

interface ManageTradeModalProps {
  trades: Trade[];
  properties: Property[];
  onAccept: (tradeId: number) => void;
  onReject: (tradeId: number) => void;
  onClose: () => void;
}

const ManageTradeModal: React.FC<ManageTradeModalProps> = ({
  trades,
  properties,
  onAccept,
  onReject,
  onClose,
}) => {

  console.log('ManageTradeModal trades', trades);
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Trade Offers</h2>
          <button onClick={onClose} className="text-red-600 text-xl font-bold cursor-pointer">X</button>
        </div>

        {(!trades || trades.length === 0) ? (
          <p className="text-sm text-gray-800">No trade offers available.</p>
        ) : (
          trades?.map((trade) => (
            <div
              key={trade.trade_id}
              className="border rounded p-4 mb-4 flex flex-col space-y-2 text-sm text-gray-800"
            >
              <p>
                <strong>{trade.sender_username}</strong> proposes a trade:
              </p>

              <div>
                <h3 className="font-semibold">Offers:</h3>
                {trade.offer.amount > 0 && <div>- ${trade.offer.amount}</div>}
                {trade.offer.property_ids.map((id) => (
                  <div key={`offered-${id}`}> {properties.find(prop => prop.id === id)?.name}</div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold">Requests:</h3>
                {trade.request.amount > 0 && <div>- ${trade.request.amount}</div>}
                {trade.request.property_ids.map((id) => (
                  <div key={`requested-${id}`}>{properties.find(prop => prop.id === id)?.name}</div>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => onReject(trade.trade_id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-[48%]"
                >
                  Reject
                </button>
                <button
                  onClick={() => onAccept(trade.trade_id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-[48%]"
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageTradeModal;
