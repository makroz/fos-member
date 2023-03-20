import Head from "next/head";
import Challenges from "../components/Challenges";
import useAuth from "../src/hooks/useAuth";

const Home = () => {
  const { config }: any = useAuth();

  return (
    <div className="absolute  top-0 left-0  w-full overflow-hidden bottom-0 ">
      <Head>
        <title>FOS</title>
        <meta name="description" content={config?.app.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Challenges />
    </div>
  );
};

export default Home;
