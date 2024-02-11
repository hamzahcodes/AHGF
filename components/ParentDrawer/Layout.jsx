
import Header from "@components/ui/header";
import BottomNav from "@components/ui/bottomNav";
// import { options } from "@app/api/auth/[...nextauth]/options";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  //  const session = await getServerSession(options)

  return (
    <div>
      <Header />
     
      
      <ToastContainer/>

      <div>{children}</div>

      <BottomNav />
    </div>
  );
};

export default Layout;
