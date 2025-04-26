'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${apiUrl}/users/login`,
                { username: userName, password: password },
                { withCredentials: true }
            );

            console.log('Login response:', response);
            const decoded = jwtDecode(response.data.token);
            console.log('Decoded token:', decoded);

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                router.push('/dashboard');
            }
        }
        catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
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
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Login
                </button>
                <p className="text-sm text-gray-800 text-center">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
