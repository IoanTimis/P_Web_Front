'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import type { AppDispatch } from '@/store/page';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [lastPath, setLastPath] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLastPath(localStorage.getItem('lastAttemptedPath'));
  }, []);

  console.log('lastPath', lastPath);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/users/login`,
        { username: userName, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const user = {
          token: response.data.token,
          userName,
        };
        dispatch(setUser({ user }));

        console.log('User logged in', lastPath);
        if (lastPath) {
          console.log('Redirecting to last attempted path:', lastPath);
          localStorage.removeItem('lastAttemptedPath');
          router.push(lastPath);
        } else {
          console.log('Redirecting to dashboard');
          router.push('/player/dashboard');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl text-gray-800 font-bold text-center">Login</h2>
        <input
          type="text"
          placeholder="username"
          className="w-full text-gray-800 border p-2 rounded"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full text-gray-800 border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="text-sm text-gray-800 text-center">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
