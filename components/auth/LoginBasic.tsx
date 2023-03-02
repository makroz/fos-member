import Image from "next/image";
import { useState } from "react";
import useConfig from "../../src/hooks/useConfig";
import LoginView from "./LoginView";
import fondo from "../../public/assets/images/bgLogin.webp";

const LoginBasic = () => {
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(false);
  const config = useConfig();
  setTimeout(() => {
    setShow(true);
  }, 500);
  setTimeout(() => {
    setStart(true);
  }, 600);
  return (
    <>
      <div className=" z-0 absolute top-0 bottom-0 left-0 right-0  bg-[url('/assets/images/bgLogin.webp')] bg-cover bg-center"></div>
      <div className="bg-primary p-5">
        <div
          className={
            (show ? "" : "hidden") +
            (start ? " top-0 mt-20" : " -mt-11") +
            " transition-all duration-500 ease-in-out   absolute top-1/2 left-0  w-full h-full z-10"
          }
        >
          <img
            src={process.env.NEXT_PUBLIC_APP_LOGO}
            alt={process.env.NEXT_PUBLIC_APP_NAME}
            width={266}
            height={88}
            className="mx-auto my-auto"
          />
        </div>
        <div
          className={
            (show ? "hidden" : "") +
            (!start ? "scale-0 " : "scale-100 flex") +
            " mt-60 transition-all duration-700 ease-in-out z-10 "
          }
        >
          <LoginView />
        </div>
      </div>
    </>
  );
};

export default LoginBasic;
