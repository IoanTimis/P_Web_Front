'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/page';

export default function Dashboard() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.data?.user);
  console.log('user', user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">Welcome, {user?.userName}</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={() => router.push('/player/create-game')}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Game
        </button>

        <button
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-800 transition"
          onClick={() => router.push('/player/join-game')}
        >
          Join Game
        </button>
      </div>
    </div>
  );
}
