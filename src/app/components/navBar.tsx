'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/store/slices/userSlice';
import type { RootState } from '@/store/page';   
import type { AppDispatch } from '@/store/page';             


const NavBar = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.data?.user);
  
    const handleLogout = () => {
      // golim starea de user in Redux
      dispatch(clearUser());
      // (optional) daca vrei sa stergi toate datele si din persist:
      // import { persistor } from '@/store';
      // persistor.purge();
  
      router.push('/');
    };
  
    return (
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-semibold space-x-4">
          <Link href="/">🏠 <span className='hover:underline'>Monopoly</span></Link>
          <Link href="/player/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/player/board" className="hover:underline">Board</Link>
        </div>
        <div>
            {user && (
          <button
            onClick={handleLogout}
            className="cursor-pointer hover:underline text-red-400"
          >
            Logout
          </button>
            )}
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  