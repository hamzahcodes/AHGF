"use client"

import React, { useEffect , useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthContext from '@store/auth-context'
import { getUserDetails } from '@helper/getUserDetails'


const Layout = ({ children }) => {
  
    const context = useContext(AuthContext);

    const router = useRouter()
    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/logout', {
                method: "GET",
            })

            if(res.status === 200) {
                router.push("/")
                localStorage.setItem("token", "")
                context.loginHandler(false, null, "")
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        if(localStorage.getItem("token") === "") {
            router.replace("/")
        } else {
            context.loginHandler(true, localStorage.getItem("token"), (context.isLoggedIn.username.length !== 0) ? context.isLoggedIn.username : "Guest")
        }
    }, [])

    return (

       

            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">AHGF</div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                {/* Navbar menu content here */}
                                <li><div>Welcome {context.isLoggedIn.username}</div></li>
                                <li><Link href='/customers'>Customers</Link></li>
                                <li><Link href='/suppliers'>Suppliers</Link></li>
                                <li><Link href='/staff'>Staff</Link></li>
                                <li onClick={() => handleSignOut()}><div>Sign Out</div></li>
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    {children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {/* Sidebar content here */}
                        <li><div>Welcome {context.isLoggedIn.username}</div></li>
                        <li><Link href='/customers'>Customers</Link></li>
                        <li><Link href='/suppliers'>Suppliers</Link></li>
                        <li><Link href='/staff'>Staff</Link></li>
                        <li onClick={() => handleSignOut()}><div>Sign Out</div></li>
                    </ul>
                </div>
            </div>

      
       
    )
}

export default Layout