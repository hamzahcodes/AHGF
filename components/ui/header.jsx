'use client'

import React from 'react'
import SignOutForm from '@components/Authentication/signOutForm';
import UserName from '@components/Authentication/userName';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const Header = () => {
    const pathname = usePathname();
     if (pathname.startsWith("/login") || pathname.startsWith("/register"))
       return;
  return (
    <div className="navbar bg-base-100 sticky top-0 z-[1]">
      <div className="flex-1">
        <Link href="/home" className="btn btn-ghost normal-case text-[1rem]">
          {" "}
          <Image width={45} height={45} src="/AHGFLogo.jpg" alt='AHGF Logo'/>
          Al Hadi Goat Farm
        </Link>
      </div>
      <div className="flex-none gap-2">
        <UserName />
        <div className="form-control">
          <SignOutForm />
        </div>
      </div>
    </div>
  );
}

export default Header