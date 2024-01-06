import Header from "@components/ui/header";
import BottomNav from "@components/ui/bottomNav";
// import { options } from "@app/api/auth/[...nextauth]/options";

const Layout = ({ children }) => {
  //  const session = await getServerSession(options)

  return (
    <div>
      <Header />

      <div>{children}</div>

      <BottomNav />
    </div>
  );
};

export default Layout;
