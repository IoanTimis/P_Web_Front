'use client';

import { useState, useEffect } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/solid';

export default function WaitingRoomPage() {
  // temporary hard‐coded players, replace with real data
  const [players, setPlayers] = useState<string[]>([
    'Alice',
    'Bob',
    'Charlie',
  ]);
  const [inviteLink, setInviteLink] = useState(
    typeof window !== 'undefined'
      ? `${window.location.origin}/join/${Math.random().toString(36).slice(2)}`
      : ''
  );
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopySuccess('Link copiat!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch {
      setCopySuccess('Eroare copiere');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  // simulate dynamic join
  useEffect(() => {
    const timer = setInterval(() => {
      setPlayers((prev) =>
        prev.length < 6
          ? [...prev, `Player${prev.length + 1}`]
          : prev
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Waiting Room
        </h1>

        {/* Invite Link */}
        <div className="flex items-center space-x-2">
          <input
            readOnly
            value={inviteLink}
            className="flex-1 px-4 py-2 border rounded-lg text-sm text-gray-700 bg-gray-50"
          />
          <button
            onClick={copyToClipboard}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            <ClipboardIcon className="h-5 w-5 text-white" />
          </button>
        </div>
        {copySuccess && (
          <p className="text-center text-green-600 text-sm">
            {copySuccess}
          </p>
        )}

        {/* Spinner */}
        <div className="flex justify-center">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>

        {/* Player List */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Jucători conectați ({players.length})
          </h2>
          <ul className="divide-y divide-gray-200">
            {players.map((p, i) => (
              <li
                key={i}
                className="py-2 flex items-center justify-between"
              >
                <span className="text-gray-800">{p}</span>
                <span className="text-sm text-gray-500">Ready</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Start Button */}
        <button
          disabled={players.length < 2}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            players.length >= 2
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={() => alert('Starting game...')}
        >
          {players.length >= 2
            ? 'Start Game'
            : 'Aștept mai mulți jucători...'}
        </button>
      </div>
    </div>
  );
}
