

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
        className="input input-bordered w-24 md:w-auto text-sm"
      >
        Sign Out
      </button>
    </>
  );
};

export default SignOutForm;
