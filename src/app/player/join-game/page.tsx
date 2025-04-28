'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Game {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
}

export default function JoinRoomPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const resp = await axios.get<Game[]>(`${apiUrl}/games/available`);
        setGames(resp.data);
      } catch (err) {
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [apiUrl]);

  const handleJoin = async (gameId: string) => {
    try {
      // înscriere pe server
      await axios.post(
        `${apiUrl}/games/${gameId}/join`,
        {},
        { withCredentials: true }
      );
      // navighează în camera de joc
      router.push(`/game/${gameId}`);
    } catch (err) {
      console.error('Join failed:', err);
      alert('Nu s-a putut intra în joc. Încearcă din nou.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-2xl font-semibold text-gray-800 p-6">
          Join a Game Room
        </h1>
        <table className="w-full table-auto border-t">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Game
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Players
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {games.map((g) => (
              <tr key={g.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {g.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {g.players} / {g.maxPlayers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleJoin(g.id)}
                    disabled={g.players >= g.maxPlayers}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                      g.players < g.maxPlayers
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {g.players < g.maxPlayers ? 'Join' : 'Full'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {games.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            Nu există jocuri disponibile în acest moment.
          </p>
        )}
      </div>
    </div>
  );
}
