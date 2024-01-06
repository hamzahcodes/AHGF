import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'

import LoginForm from '@components/Authentication/LoginForm'

const page = async () => {

  const session = await getServerSession(options)
  if(session) redirect("/home")
  
  return <LoginForm />
}

export default page