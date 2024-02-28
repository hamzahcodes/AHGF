"use client";

import Link from "next/link";
import { useState} from "react"
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

const LoginForm = () => {

    const [ phone, setPhone ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()
  

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
      
      setIsLoading(true);
      const response = await signIn('credentials', {
          phoneNumber: phone, 
          password: password,
          redirect: false,
      })
      console.log(response);
      // const data = await response.json()
      // console.log(data);
      if(response.ok) {
        router.push("/customers")
        router.refresh()
      } else {
        setError("Invalid Credentials")
      }
       setIsLoading(false);
    }
  return (
    <section className="bg-base-100 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-secondary rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleLoginSubmit}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
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
                  // required
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
                  Signing in...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onSubmit={handleLoginSubmit}
                >
                  Sign in
                </button>
              )}

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
