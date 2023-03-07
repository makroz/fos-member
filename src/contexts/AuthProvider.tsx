import { createContext, useEffect, useState } from "react";

import Spinner from "../components/layouts/Spinner";
import useAxios from "../hooks/useAxios";
import conf from "../components/auth/config";
import LoginBasic from "../../components/auth/LoginBasic";
import { useRouter } from "next/router";

export const AuthContext = createContext({});
const AuthProvider = ({ children, noAuth = false, guard = null }: any): any => {
  const { error, loaded, execute, waiting, setWaiting } = useAxios();
  const [user, setUser] = useState<any>(null);
  const [guardia, setGuardia] = useState(guard);
  const [config, setConfig]: any = useState(conf);
  // const [load, setLoad]: any = useState(0);
  const [toast, setToast] = useState({ msg: "", type: "success", time: 3000 });
  const router = useRouter();

  const getConfig = () => {
    setWaiting(waiting + 1);
    let currentConfig: any = conf;
    try {
      currentConfig = config || JSON.parse(localStorage.getItem("config") + "");
    } catch (e) {
      currentConfig = null;
    }
    currentConfig = currentConfig || conf;
    if (guardia) {
      currentConfig.app.appName = guardia.title;
      currentConfig.app.appDescription = guardia.description;
      currentConfig.app.appLogoImage = guardia.logo || conf.app.appLogoImage;
      currentConfig.app.guard_id = guardia.id || null;
      currentConfig.app.link = guardia.link ? "/" + guardia.link : "";
      currentConfig.app.colorPrimary = guardia.color_primary;
      currentConfig.app.colorSecondary = guardia.color_secondary;
    }
    setConfig(currentConfig);
    setWaiting(waiting - 1);
  };

  const getUser = async () => {
    setWaiting(waiting + 1);
    let currentUser = null;
    try {
      const token = await JSON.parse(localStorage.getItem("token") + "");
      currentUser = user || token.user;
      const credentials: any = {};
      if (guard) {
        credentials.guard = guard.id;
      }
      if (currentUser) {
        //setUser(currentUser);
        const { data, error }: any = await execute(
          config.auth.iam,
          "POST",
          credentials
        );

        if (data?.success && !error) {
          currentUser = data?.data?.user;
          localStorage.setItem(
            "token",
            JSON.stringify({ token: token.token, user: data?.data?.user })
          );
          // setWaiting(waiting - 1);
          // return { user: data?.data?.user };
        } else {
          console.log("====================================");
          console.log("Error3", data, error);
          console.log("====================================");
          if (error.status == 401) {
            await localStorage.removeItem("token");
            await setUser(null);
            await setWaiting(waiting - 1);
            router.reload();
          }
          // setWaiting(waiting - 1);
          // return { user, errors: data?.errors || data?.message || error };
        }
      }
    } catch (e) {
      currentUser = null;
    }
    setUser(currentUser);
    setWaiting(waiting - 1);
  };

  const userCan = (ability: string, action: string) => {
    if (!user) return false;
    if (!user.role?.abilities?.includes(ability)) return false;
    const a = user?.role?.abilities?.indexOf(ability);
    const b = (user?.role?.abilities + "|").indexOf("|", a);
    if (!user.role.abilities.substring(a, b).includes(action)) return false;
    return true;
  };
  const login = async (credentials: any) => {
    setWaiting(waiting + 1);
    setUser(null);
    if (guard) {
      credentials.guard = guard.id;
    }
    const { data, error }: any = await execute(
      config.auth.login,
      "POST",
      credentials
    );

    if (data?.success && !error) {
      console.log("Loguedo", data);
      setUser(data?.data?.user);
      localStorage.setItem(
        "token",
        JSON.stringify({ token: data?.data?.token, user: data?.data?.user })
      );
      setWaiting(waiting - 1);
      return { user: data?.data?.user };
    } else {
      console.log("====================================");
      console.log("Error1", data, error);
      console.log("====================================");
      setWaiting(waiting - 1);
      return { user, errors: data?.errors || data?.message || error };
    }
  };
  const logout = async () => {
    setWaiting(waiting + 1);
    const { data, error }: any = await execute(config.auth.logout, "POST");
    localStorage.removeItem("token");
    setUser(null);
    if (data?.success) {
      // console.log("Logout", data);
      setWaiting(waiting - 1);
      return;
    } else {
      console.log("====================================");
      console.log("Error1", data);
      console.log("====================================");
      setWaiting(waiting - 1);
      return { user, errors: data?.errors || data?.message || error };
    }
  };

  useEffect(() => {
    getConfig();
    getUser();
  }, []);

  // console.log("====================================");
  // console.log("config", config);
  // console.log("====================================");
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loaded,
        login,
        logout,
        config,
        guard,
        userCan,
        toast,
        setToast,
        waiting,
        setWaiting,
      }}
    >
      {loaded || <Spinner />}
      {!noAuth && !user ? <LoginBasic /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
