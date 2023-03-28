import { useRouter } from "next/router";
import { useState } from "react";
import useAuth from "../../src/hooks/useAuth";
import Head from "../layout/Head";
import Logo from "../req/Logo";
import LoginView from "./LoginView";
import RecoveryPin from "./RecoveryPin";

const LoginBasic = () => {
  const { user, error, login, config }: any = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [start, setStart] = useState(false);
  const [show, setShow] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  setTimeout(() => {
    setShow(true);
  }, 500);
  setTimeout(() => {
    setStart(true);
  }, 600);

  const back = () => {
    setShowLogo(false);
  };

  let code1: any = false;
  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (name == "email") {
      if (!code1) code1 = document.getElementById("code1");
      if (value.length == 8) {
        code1.focus();
      }
    }
  };

  const validaciones = () => {
    let errors = {};
    if (!formState.email) {
      errors = { ...errors, email: "Documento de Identidad es Requerido" };
    }

    if (formState.password.length != 4) {
      errors = { ...errors, email: "PIN debe tener 4 digitos" };
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validaciones();
    setErrors(valid);
    if (Object.keys(valid).length > 0) {
      setCode("");
      return;
    }

    login(formState).then((data) => {
      if (user || data?.user) {
        router.push((config?.app.link || "") + config?.auth.success, "", {
          shallow: true,
        });
      } else {
        setErrors({ email: "Datos de accesso Incorrectos" });
        console.log("====================================");
        console.log("Error232", errors, data.errors);
        console.log("====================================");
      }
      return;
    });
  };

  const setCode = (code) => {
    setFormState((prev) => ({ ...prev, password: code }));
  };

  return (
    <>
      <Head
        back={back}
        className={
          (showLogo
            ? "opacity-100 transition-all duration-500 delay-500  ease-in-out"
            : "opacity-0  ") + ""
        }
      ></Head>
      <div
        className={
          (!show ? "hidden " : "") +
          (!showLogo ? "scale-y-0 " : "scale-y-100 ") +
          "absolute w-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out "
        }
      >
        <RecoveryPin
          formState={formState}
          errors={errors}
          handleChange={handleChange}
        />
      </div>
      <div
        className={
          (show && !showLogo ? "opacity-100 " : "opacity-0 ") +
          "absolute top-0 bottom-0 left-0 right-0 bg-[url('/assets/images/bgLogin.webp')] bg-cover bg-center transition-all duration-700 ease-in-out "
        }
      >
        <div className="w-full h-full bg-black/50"></div>
      </div>
      <div className="bg-primary w-full overflow-hidden ">
        <div className={"absolute top-0 left-0 right-0 overflow-hidden "}>
          <div
            className={
              (!show ? "hidden " : "") +
              (!start ? "-translate-y-full " : "") +
              "w-[calc(100vw_+_40px)] h-[405px]  bg-secondary rounded-full  -mt-48 -ml-5 -mr-5  transition-all duration-500 ease-in-out"
            }
          ></div>
        </div>

        <div
          className={
            (show ? "" : "hidden ") +
            (start
              ? showLogo
                ? "top-0 -mt-[7px] ml-[101px] -left-1/2 scale-x-[40%] scale-y-[45%] "
                : "top-0 mt-14 "
              : "-mt-11 ") +
            "absolute top-1/2 left-0  w-full transition-all duration-500 ease-in-out"
          }
        >
          <Logo
            width={266}
            className={
              (start ? "text-primary " : "text-secondary ") +
              "mx-auto my-auto  transition-all duration-[2000ms] ease-in-out"
            }
          />
          {/* <img
            src={process.env.NEXT_PUBLIC_APP_LOGO}
            alt={process.env.NEXT_PUBLIC_APP_NAME}
            width={266}
            height={88}
            className="mx-auto my-auto"
          /> */}
        </div>
        <div
          className={
            (!start ? "-scale-x-0 " : "-scale-x-100 ") +
            "absolute top-[255px] md:top-[250px] z-30 transition-all duration-500 ease-in-out w-screen"
          }
        >
          <img
            src="/assets/images/bl.png"
            alt="bl"
            className="mx-auto w-[calc(100vw_-_40px)] sm:w-[480px] md:ml-1/2"
          />
        </div>
        <div className="absolute mx-auto  mt-[260px] left-0  w-full  overflow-hidden">
          <div
            className={
              (!show ? "hidden " : "") +
              (!start || showLogo ? "-translate-y-full " : "translate-y-0 ") +
              " mx-5 px-5  flex flex-col items-center justify-center transition-all delay-500 duration-700 ease-in-out "
            }
          >
            <LoginView
              formState={formState}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setCode={setCode}
            />
            {/* <button
              className="text-center mt-12 mb-6 link"
              onClick={(e) => {
                setShowLogo(true);
              }}
            >
              Olvide mi PIN
            </button> */}
            {/* <div className="text-center link">Crear una cuenta</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginBasic;
