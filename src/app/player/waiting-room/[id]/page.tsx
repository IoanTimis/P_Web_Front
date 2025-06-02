'use client';

import { ClipboardIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Game } from '../../join-game/page';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function WaitingRoomPage() {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  const token = String(user?.data?.user?.token);
  const { id } = useParams<{ id: string }>();
  const [players, setPlayers] = useState<string[]>([]);
  
  const [inviteLink, setInviteLink] = useState(
    typeof window !== 'undefined'
      ? `${window.location.origin}/join/${id}`
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

  const handleStartGame = async () => {
    try {
      await axios.post(
        `${apiUrl}/games/${id}/start`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push(`/player/board/${id}`);
    } catch (err) {
      alert('Nu s-a putut incepe jocul. Nu sunt destui jucatori');
    }
  };

  useEffect(() => {
    let waiting = true;
    const fetchGameData = async () => {
    try {
      const resp = await axios.get<Game>(`${apiUrl}/games/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPlayers(resp.data.players.map(player => player.username));
      console.log('Fetched game data:', resp.data);

      if (resp.data.status === 'active') {
        console.log('Game is active, redirecting to board...');
        router.push(`/player/board/${id}`);
        waiting = false;
      }
    } catch (err) {
      console.error('Error fetching game data:', err);
    }
  };

    fetchGameData();

    if(waiting) {
      const interval = setInterval(fetchGameData, 5000); 
      return () => clearInterval(interval);
    }
  }, [id, token]);


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
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            players.length >= 2
              ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleStartGame}
        >
          {players.length >= 2
            ? 'Start Game'
            : 'Aștept mai mulți jucători...'}
        </button>
      </div>
    </div>
  );
}
