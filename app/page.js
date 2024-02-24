import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session, "#7");
  console.log(session?.user?.id);
  if (!session || session?.user?.id === undefined){
    console.log("inside if #10");
    redirect("/login");
  }

  redirect("/customers");
}
