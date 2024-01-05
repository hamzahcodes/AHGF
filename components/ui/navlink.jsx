'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const Navlink = ({href , children}) => {
    const pathname  = usePathname()
  return (
    <Link
      href={href}
      className={`${
        pathname.startsWith(href) && "active border-secondary text-secondary"
      }`}
    >
      {children}
    </Link>
  );
}

export default Navlink