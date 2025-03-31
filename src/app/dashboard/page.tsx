'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/');
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">Welcome, {user?.email}</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={() => router.push('/create-game')}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Custom Game
        </button>

        <button
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Join Game
        </button>
      </div>
    </div>
  );
}
