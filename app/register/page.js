import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'
import RegisterForm from '@components/Authentication/RegisterForm'

const page = async () => {

  const session = await getServerSession(options)
  if(session) redirect("/home")
  
  return <RegisterForm />
}

export default page