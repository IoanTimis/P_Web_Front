'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CreateGamePage() {
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState(2);
  const [gameName, setGameName] = useState('');
  const user = useSelector((state: any) => state.user);
  const token = String(user?.data?.user?.token);

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('gameSettings', JSON.stringify({ playerCount, gameName }));

    try {
      const response = await axios.post(
        `${apiUrl}/games/create?max_players=${playerCount}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push(`/player/waiting-room/${response.data.game_id}`);
    } catch (err) {
      console.error('Create failed:', err);
      alert('Nu s-a putut crea jocul. Încearcă din nou.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleCreateGame} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Create Custom Game</h2>

        <label className="block">
          <span className="text-gray-700">Game Name (optional)</span>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-full mt-1 border p-2 rounded text-gray-700"
            placeholder="Ex: Monopoly Night"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Number of Players</span>
          <select
            value={playerCount}
            onChange={(e) => setPlayerCount(parseInt(e.target.value))}
            className="w-full mt-1 border p-2 rounded text-gray-700"
          >
            {[2, 3, 4].map((n) => (
              <option key={n} value={n}>{n} Players</option>
            ))}
          </select>
        </label>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Start Game
        </button>
      </form>
    </div>
  );
}