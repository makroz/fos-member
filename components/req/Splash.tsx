import Head from "next/head";
import useConfig from "../../src/hooks/useConfig";

const Splash = () => {
  const config = useConfig();

  return (
    <div className="grid grid-cols-1 bg-primary w-full h-full absolute z-[5000] text-white">
      <Head>
        <title>{config?.app.appName}</title>
        <meta name="description" content={config?.app.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="items-center justify-center mx-auto my-auto">
        <img src={config?.app.appLogoImage} alt="FOS Logo" />
        <div className="text-center  animate-spin">.</div>
      </div>
    </div>
  );
};

export default Splash;
