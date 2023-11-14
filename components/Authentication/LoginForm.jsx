"use client";

import Link from "next/link";
import { useState, useContext } from "react"
import { useRouter } from "next/navigation";
import AuthContext from '@store/auth-context'
import { getUserDetails } from "@helper/getUserDetails";

const LoginForm = () => {

    const [ phone, setPhone ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const router = useRouter()
    const context = useContext(AuthContext);

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        if(!phone || !password) {
          setError("All fields are mandatory")
          return
        }
        try {
          const res = await fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                phoneNumber: phone, 
                password: password
            })
        })

            const resp = await res.json()
            console.log(resp);
            if(res.status === 400) {
              setError("Invalid Credentials")
              return 
            }
            if(res.status === 200) {
              const username = await getUserDetails(resp)
              console.log(username);
              localStorage.setItem("token", resp.token)
              context.loginHandler(resp.success, resp.token, username)
              console.log('pushed to customers');
              router.push("/home")
            }


        } catch (error) {
            console.log(error);
        }
    }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleLoginSubmit} className="space-y-4 md:space-y-6" >
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onClick={() => setError("")}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="10 digit phone number"
                //   required
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                //   required
                />
              </div>
              {error && (<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>

              )

              }
              <button
                type="submit"
                className="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href={"/register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
