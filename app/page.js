import Image from 'next/image'
import LoginForm from '@components/Authentication/LoginForm'
// import { redirect } from 'next/navigation'

export default async function Home() {

  // if(session) redirect("/customers")

  return (
      <LoginForm />
  )
}
