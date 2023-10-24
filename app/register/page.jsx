import RegisterForm from '@app/components/Authentication/RegisterForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@app/api/auth/[...nextauth]/route'

const page = async () => {

  const session = await getServerSession(authOptions)

  if(session) redirect("/customers")
  return (
    <RegisterForm />
  )
}

export default page