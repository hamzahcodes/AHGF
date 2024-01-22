"use client";

import Link from "next/link";
import { useState, useContext } from "react"
import { useRouter } from "next/navigation";
import AuthContext from '@store/auth-context'
import { signIn } from "next-auth/react";

const LoginForm = () => {

    const [ phone, setPhone ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const router = useRouter()
    const context = useContext(AuthContext);

    const handleLoginSubmit = async (e) => {
      e.preventDefault()
      if(!phone) {
        setError("Phone no. is required")
        return
      }
      if(!password) {
        setError("Password is required")
        return
      }
      if(phone.length !== 10) {
        setError("Phone Number should be 10 digits")
        return
      }
      
      e.preventDefault()
      const response = await signIn('credentials', {
          phoneNumber: phone, 
          password: password,
          redirect: false,
      })
      console.log(response);
      // const data = await response.json()
      // console.log(data);
      if(response.ok) {
        router.push("/home")
        router.refresh()
      } else {
        setError("Invalid Credentials")
      }
    }
  return (
    <section className="bg-base-100 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form onSubmit={handleLoginSubmit} className="space-y-4 md:space-y-6" >
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onClick={() => setError("")}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="10 digit phone number"
                  // required
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onClick={() => setError("")}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  // required
                />
              </div>
              {error && (<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>

              )

              }
              <button
                type="submit"
                className="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onSubmit={handleLoginSubmit}
              >
                Sign in
              </button>
              <p className="text-sm text-center font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  href={"/register"}
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
