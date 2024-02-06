'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const Navlink = ({href , children}) => {
    const pathname  = usePathname()

    if (pathname.startsWith('/login') ||pathname.startsWith('/register') ) return
  return (
    <Link
      href={href}
      className={`links ${
        pathname.startsWith(href) && "_active border-primary border-0 text-accent"
      }`}
    >
      {children}
    </Link>
  );
}

export default Navlink