

import { useSession } from 'next-auth/react'
import React from 'react'


const UserName = () => {
    const { data: session } = useSession();
  return <div className="text-center">{session?.user?.name}</div>;
}

export default UserName