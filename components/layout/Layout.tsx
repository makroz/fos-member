import Link from "next/link";
import Toast from "../../src/components/ui/Toast";
import useAuth from "../../src/hooks/useAuth";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { user, config, logout }: any = useAuth();
  if (!user) return children;
  return (
    <div className="relative min-h-screen h-full w-full pb-20 overflow-auto ">
      <Toast />
      <Navbar user={user} logout={logout} />
      {children}
      <div className="fixed flex justify-between bottom-0 w-full h-20 bg-gray-200 text-primary overflow-hidden">
        <Link href="/">
          <div className="w-20 flex flex-col justify-center items-center p-5 hover:bg-slate-600 hover:text-secondary">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <div className="text-xs text-center">Home</div>
          </div>
        </Link>
        <Link href="/guests">
          <div className="w-20 flex flex-col justify-center items-center p-5 hover:bg-slate-600 hover:text-secondary">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>

            <div className="text-xs text-center">Invitados</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Layout;