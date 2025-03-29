'use client' ;
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
    };

    return (
        <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
            <div className="text-lg font-semibold space-x-4">
                <Link href="/">🏠 Monopoly</Link>
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/board" className="hover:underline">Board</Link>
            </div>
            <div className="">
                <button onClick={handleLogout}
                    className="cursor-pointer hover:underline text-red-400"
                    >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default NavBar;