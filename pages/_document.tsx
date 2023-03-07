import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* <title>{process.env.NEXT_PUBLIC_APP_NAME}</title> */}
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-primary text-secondary">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
