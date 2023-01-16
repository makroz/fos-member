import Head from "next/head";
import useAuth from "../src/hooks/useAuth";

const Home = () => {
  const { config }: any = useAuth();
  return (
    <div className="flex min-h-full flex-col items-center justify-center py-2">
      <Head>
        <title>{config?.app.appName}</title>
        <meta name="description" content={config?.app.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        Wellcome
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Copyrigth {new Date().getFullYear()} - {config.app.appName}
      </footer>
    </div>
  );
};

export default Home;

Home.auth = true;
