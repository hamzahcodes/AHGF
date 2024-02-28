import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'

import LoginForm from '@components/Authentication/LoginForm'

const page = async () => {

  const session = await getServerSession(options)
  if(session?.user?.id) redirect("/customers")
  
  return (
  <div className='min-h-[100vh] flex justify-center items-center bg-[#fff]'>
    <LoginForm />
  </div>
  )
    
}

export default page