'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/page';
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.data?.user);
  console.log('user', user);
  useEffect(() => {
    if (user) {
      router.push('/player/dashboard');
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return (
    <div className="student-container">
      {children}
    </div>
  );
}
