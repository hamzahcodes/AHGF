'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link";

const RegisterForm = () => {

    const [ name, setName ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()

        if(!name || !phone || !password) {
            setError("All fields are mandatory")
            return
        }
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username: name, 
                    phoneNumber: phone, 
                    password: password
                })
            })
            if(res.ok) {
                const form = e.target
                form.reset()
                router.push("/")
            } 
            const userExists = await res.json()
            if(userExists) {
                setError(userExists.message)
            } else {
                console.log("User registration failed");
                setError("User registration failed")
            }
        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(false)
    }

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <section className="bg-base-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className=" text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleRegisterSubmit}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setName(e.target.value)}
                    onClick={() => setError("")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="John Smith"
                    // required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    onClick={() => setError("")}
                    placeholder="10 digit phone number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
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
                    required
                  />
                </div>
                {error && (
                  <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                  </div>
                )}
                {isLoading ? (
                  <button
                    type="button"
                    className="btn w-full bg-primary text-[#fff] inline-flex items-center px-4 py-2  leading-6   transition ease-in-out duration-150 cursor-not-allowed "
                  >
                    {" "}
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#fff]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing up...
                  </button>
                ) : (
                  <button
                    type="submit"
                    onSubmit={handleRegisterSubmit}
                    className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Create an account
                  </button>
                )}

                <p className="text-center text-sm font-light text-gray-500 ">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterForm;
