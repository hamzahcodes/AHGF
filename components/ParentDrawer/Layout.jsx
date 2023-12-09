"use client"

import React, { useEffect, useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthContext from '@store/auth-context'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'


const Layout = ({ children }) => {

    // const context = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('home');
    const { data: session } = useSession()


    const router = useRouter()
    const handleSignOut = async (e) => {
        e.preventDefault()
        const data = await signOut('credentials', { redirect: false,  callbackUrl: "/login" })
        // const res = await data.json()
        // alert('data', data)
        // router.push(data.url)
        router.refresh()
    }

    useEffect(() => {
        setActiveTab(window.location.pathname)
    }, []);


    // useEffect(() => {
    //     const token = localStorage.getItem("token")
    //     if (!token) {
    //         console.log("In layout useEffect If");
    //         router.push("/")
    //     } else {
    //         console.log("In layout useEffect else");
    //     }
    // }, [])

    return (
        <div>
      
                <div className="navbar bg-base-100 sticky top-0">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">Al Hadi Goat Farm</a>
                    </div>
                    <div className="flex-none gap-2">
                        <div className='text-center'>
                        {session?.user?.name}
                        </div>
                        <div className="form-control">
                            <button onClick={handleSignOut} type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto text-sm" >Sign Out</button>
                        </div>
                        {/* <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
       
            <div>
                {children}

            </div>
            <div>
                <div className="btm-nav">
                    <Link href='/home' className={`${activeTab.includes('/home') && 'active border-secondary text-secondary'}`}>

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        <span className="btm-nav-label text-sm">Home</span>


                    </Link>

                    <Link href='/customers' className={`${activeTab.includes('/customers') && 'active border-secondary text-secondary'}`}>


                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <span className="btm-nav-label text-sm">CUS</span>


                    </Link>

                    <Link href='../suppliers' className={`${activeTab.includes('/suppliers') && 'active border-secondary text-secondary'}`}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="20.5" r="1" /><circle cx="18" cy="20.5" r="1" /><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" /></svg>
                        <span className="btm-nav-label text-sm">SUPPL</span>


                    </Link>

                    <Link href='/stocks' className={`${activeTab.includes('/stocks') && 'active border-secondary text-secondary'}`}>


                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                        <span className="btm-nav-label text-sm">Stock</span>


                    </Link>

                    <Link href='/staff' className={`${activeTab.includes('/staff') && 'active border-secondary text-secondary'}`}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                        <span className="btm-nav-label text-sm">Staff</span>


                    </Link>





                </div>
            </div>
        </div>








    )
}

export default Layout