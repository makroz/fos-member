import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

export const AxiosContext = createContext({});
const AxiosInstanceProvider = ({
  config = {},
  interceptors = null,
  children,
}: any) => {
  const [waiting, setWaiting] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!config.baseURL) {
    config = { ...config, baseURL: API_URL };
  }
  const instanceRef = useRef(axios.create(config));
  instanceRef.current.defaults.withCredentials = true;
  useEffect(() => {
    if (interceptors) {
      interceptors(instanceRef.current);
    }
  }, []);

  return (
    <AxiosContext.Provider
      value={{ contextInstance: instanceRef.current, waiting, setWaiting }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosInstanceProvider;
