'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/page';

interface PlayerLayoutProps {
  children: React.ReactNode;
}

export default function PlayerLayout({ children }: PlayerLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useSelector((state: RootState) => state.user.data?.user);
  console.log('user', user);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('lastAttemptedPath', pathname);
      console.log('lastAttemptedPath', pathname);
      router.push('/auth/login');
    }
  }, [user, pathname, router]);

  if (!user) {
    return (<div className='bg-gray-100 min-h-screen flex items-center justify-center'>Loading...</div>);
  }

  return (
    <div className="student-container">
      {children}
    </div>
  );
}
