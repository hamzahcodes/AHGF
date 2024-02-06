

import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SignOutForm = () => {
  const router = useRouter();

  const handleSignOut = async (e) => {
    e.preventDefault();
    const data = await signOut("credentials", {
      redirect: false,
      callbackUrl: "/login",
    });
    // const res = await data.json()
    // alert('data', data)
    // router.push(data.url)
    router.refresh();
  };
  return (
    <>
      <button
        onClick={handleSignOut}
        type="text"
        placeholder="Search"
        className="border-2 rounded-xl border-gray-100  md:w-auto text-sm text-primary bg-secondary p-2 font-semibold"
      >
        Sign Out
      </button>
    </>
  );
};

export default SignOutForm;
