'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirm && email) {
      localStorage.setItem('user', JSON.stringify({ email }));
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" className="w-full border p-2 rounded" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Register</button>
        <p className="text-sm text-center">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
      </form>
    </div>
  );
}