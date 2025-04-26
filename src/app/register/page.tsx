'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link'; 
import axios from 'axios';
import { useEffect } from 'react';

export default function RegisterPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      console.log('Registering user:', { userName, password });
      const registerUser = await axios.post(`${apiUrl}/users/register`, {
        username: userName,
        password: password,
      }, { withCredentials: true } );

      if(registerUser.status === 201) {
        setSuccess(true);
      }

    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <h2 className="text-2xl text-green-800 font-bold text-center">
          Te-ai inregistrat cu succes! Te redirectionam catre logare in 2 secunde.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-gray-800 text-2xl font-bold text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="username"
          className="text-gray-800 w-full border p-2 rounded"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="text-gray-800 w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-gray-800 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
