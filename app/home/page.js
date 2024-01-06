import Layout from '@components/ParentDrawer/Layout'
import React from 'react'
import Notification from '@components/home/notification'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { options } from '@app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const Page = async () => {

  const session = await getServerSession(options)
  console.log(session, "#12");
  console.log(session?.user?.id);
  if(!session?.user?.id) redirect("/login")

  return (
    <>
      <Notification />
      {/* <Image
        width={400}
        height={400}
        src="https://drive.google.com/uc?id=1nJ98IMNHgyoSZ_CrsH2tKc3AvatCcH7A"
        alt="test"
      /> */}
    </>
  );
}

export default Page