import "../styles/globals.css";

import AxiosInstanceProvider from "../src/contexts/AxiosInstanceProvider";
import axiosInterceptors from "../src/interceptors/axiosInterceptors";
import AuthProvider from "../src/contexts/AuthProvider";
import LayoutHorizontal from "../src/components/layouts/LayoutHorizontal";
import Splash from "../components/req/Splash";
import { useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: any) {
  const [splash, setSplash] = useState(true);
  if (typeof window !== "undefined") {
    setTimeout(() => {
      setSplash(false);
    }, 500);
  }
  return (
    <AxiosInstanceProvider interceptors={axiosInterceptors}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {splash && <Splash />}
      <AuthProvider noAuth={Component.noAuth}>
        <LayoutHorizontal>
          <Component {...pageProps} />
        </LayoutHorizontal>
      </AuthProvider>
    </AxiosInstanceProvider>
  );
}

export default MyApp;
