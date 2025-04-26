'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Temporar 
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handlePlayNow = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4 space-y-8">
      <h1 className="text-4xl font-bold text-green-800 text-center">
        Bine ai venit la Monopoly!
      </h1>
      <p className="text-lg text-green-700 text-center">
        Esti gata sa devii antreprenor?
      </p>
      <button
        onClick={handlePlayNow}
        className="bg-green-600 text-white text-lg px-6 py-3 rounded-xl hover:bg-green-700 transition"
      >
        Joaca acum
      </button>
    </div>
  );
}
