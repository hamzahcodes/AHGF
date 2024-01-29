"use client";

import React from "react";

import LoadingSpinner from "@components/ui/loadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { getAllStaff, getAllSuppliers } from "@helper/http";

import AddStaffDialog from "@components/staff/addStaffDialog";
import StaffList from "@components/staff/staffList";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session } = useSession()
  if(!session?.user?.id) redirect("/login")

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["staff"],
    queryFn: () => getAllStaff(),
  });
  return (
    <>
      {data ? (
        <div className="relative">
          {/* <div className='sticky left-0 w-full top-0 ]'>
                                <Stats />

                            </div> */}

          <StaffList staffData={data} />
        </div>
      ) : (
        <LoadingSpinner />
      )}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        onClick={() => document.getElementById("add_staff_modal").showModal()}
        className="text-5xl fixed bottom-[10%] right-[5%] w-[70px] h-[70px] rounded-full bg-accent text-[#fff]"
      >
        +
      </button>

      <AddStaffDialog />
    </>
  );
};

export default Page;
