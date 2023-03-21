import Toast from "../../src/components/ui/Toast";
import useAuth from "../../src/hooks/useAuth";
import { Footer } from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { user, config, logout }: any = useAuth();
  if (!user) return children;
  return (
    <div className="relative min-h-screen h-full w-full pb-20 overflow-auto ">
      <Toast />
      <Navbar user={user} logout={logout} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
