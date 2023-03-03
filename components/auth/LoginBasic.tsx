import { useState } from "react";
import LoginView from "./LoginView";

const LoginBasic = () => {
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(false);
  setTimeout(() => {
    setShow(true);
  }, 500);
  setTimeout(() => {
    setStart(true);
  }, 600);
  return (
    <>
      <div
        className={
          (show ? "opacity-100 " : "opacity-0 ") +
          "absolute top-0 bottom-0 left-0 right-0 bg-[url('/assets/images/bgLogin.webp')] bg-cover bg-center transition-all duration-700 ease-in-out"
        }
      ></div>
      <div className="bg-primary p-5">
        <div
          className={
            (show ? "" : "hidden ") +
            (start ? "top-0 mt-20 " : "-mt-11 ") +
            "absolute top-1/2 left-0  w-full transition-all duration-500 ease-in-out"
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
            (!show ? "hidden " : "") +
            (!start ? "scale-0 " : "scale-100 ") +
            "mt-60  w-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out"
          }
        >
          <LoginView />
        </div>
      </div>
    </>
  );
};

export default LoginBasic;
