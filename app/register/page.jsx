import RegisterForm from '@components/Authentication/RegisterForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '../app/api/auth/[...nextauth]/options'

const page = async () => {

  const session = await getServerSession(options)
  if(session) redirect("/home")
  
  return <RegisterForm />
}

export default page