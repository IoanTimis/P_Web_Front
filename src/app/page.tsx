'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isRegistering) {
      localStorage.setItem('user', JSON.stringify({ email }));
    } else {
      const stored = localStorage.getItem('user');
      if (!stored) return alert('User not found');
      const user = JSON.parse(stored);
      if (user.email !== email) return alert('Email doesn’t match');
    }

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <p className="text-sm text-center">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <button type="button" className="text-blue-600 hover:underline" onClick={() => setIsRegistering(false)}>
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <button type="button" className="text-blue-600 hover:underline" onClick={() => setIsRegistering(true)}>
                Register
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}