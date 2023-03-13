import Head from "next/head";
import useAuth from "../src/hooks/useAuth";
import img_meta from "../public/assets/images/meta.png";
import Image from "next/image";

const Home = () => {
  const { config }: any = useAuth();
  return (
    <div className="flex flex-col absolute top-0 bottom-20 w-full ">
      {/* scale-[5] -translate-x-[40%] translate-y-[185%] ultio dia */}
      {/* scale-[2] translate-x-[50px] translate-y-[60%] */}
      <Head>
        <title>FOS</title>
        <meta name="description" content={config?.app.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-32 w-full">
        <Image
          src={img_meta}
          alt="meta"
          width={30}
          className="absolute bottom-0 left-1/2 -translate-x-9"
        />
      </div>
      <div className="relative flex-grow bg-[#526697] z-10">
        <div className=" overflow-visible h-2">
          <svg
            width="100%"
            height="100%"
            className="absolute z-0 top-0 bottom-0 w-full"
          >
            <path
              d="M111.154 319.247C116.327 404.622 0 461.075 0 461.075V579H360V543.41V426.548C360 295.343 239.833 232.662 247.344 191.761C254.854 150.859 301.919 143.422 297.413 92.4275C292.907 41.433 172.239 0 172.239 0H126.175C126.175 0 231.822 49.9321 231.822 92.4275C231.822 125.361 92.128 134.392 83.1154 200.791C74.6871 262.886 107.361 256.64 111.154 319.247Z"
              fill="#03133A"
            />
          </svg>
        </div>
        <div className="absolute bg-secondary rounded-xl w-64 h-44 z-10 right-5 bottom-5 overflow-hidden">
          <div className="relative w-64 h-44">
            <div
              className="absolute w-16 h-40 -bottom-9 left-3 -rotate-[144deg] z-0 "
              style={{
                background:
                  "linear-gradient(180deg, #FFD48E 0%, rgba(217, 217, 217, 0) 100%)",
              }}
            ></div>
            <div className="flex flex-col w-64 h-44 px-4 py-1">
              <div className="flex  font-bold italic text-3xl  justify-between items-center">
                <div>1° RETO</div>
                <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
                  <path
                    d="M8.35823 0H15.8806L7.52241 11.7015L15.8806 23.403H8.35823L1.78814e-05 11.7015L8.35823 0Z"
                    fill="white"
                  />
                  <path
                    d="M21.7313 0H29.2537L20.8955 11.7015L29.2537 23.403H21.7313L13.3731 11.7015L21.7313 0Z"
                    fill="white"
                  />
                  <path
                    d="M33.9287 11.9444L33.7552 11.7015L33.9287 11.4586L41.8149 0.41791H35.3196L27.2599 11.7015L35.3196 22.9851H41.8149L33.9287 11.9444Z"
                    stroke="white"
                    stroke-width="0.835821"
                  />
                  <path
                    d="M47.3017 11.9444L47.1282 11.7015L47.3017 11.4586L55.1879 0.41791H48.6927L40.633 11.7015L48.6927 22.9851H55.1879L47.3017 11.9444Z"
                    stroke="white"
                    stroke-width="0.835821"
                  />
                </svg>
              </div>
              <div className="flex justify-around h-20 font-bold italic text-primary bg-white/50 z-10 rounded-xl">
                <div className="flex flex-col justify-center items-center w-1/2 border-r my-2 border-primary">
                  <div className="text-[16px] " style={{ lineHeight: "18px" }}>
                    LUNES
                  </div>
                  <div className="text-[42px]" style={{ lineHeight: "30px" }}>
                    27
                  </div>
                  <div
                    className="text-sm text-orange-300"
                    style={{
                      textShadow:
                        "#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px",
                    }}
                  >
                    MARZO
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-1/2">
                  <div className="text-[42px]" style={{ lineHeight: "30px" }}>
                    6:00
                  </div>
                  <div
                    className="text-sm text-orange-300"
                    style={{
                      textShadow:
                        "#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px",
                    }}
                  >
                    AM
                  </div>
                </div>
              </div>
              <button className="btn mt-2 btn-primary z-10">VER</button>
            </div>
          </div>
        </div>
        <div className="absolute bg-secondary rounded-xl w-64 h-44 z-10 right-5 bottom-5 overflow-hidden scale-[20%] translate-x-[1%] -translate-y-[240%]">
          <div className="relative w-64 h-44">
            <div
              className="absolute w-16 h-40 -bottom-9 left-3 -rotate-[144deg] z-0 "
              style={{
                background:
                  "linear-gradient(180deg, #FFD48E 0%, rgba(217, 217, 217, 0) 100%)",
              }}
            ></div>
            <div className="flex flex-col w-64 h-44 px-4 py-1">
              <div className="flex  font-bold italic text-3xl  justify-between items-center">
                <div>1° RETO</div>
                <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
                  <path
                    d="M8.35823 0H15.8806L7.52241 11.7015L15.8806 23.403H8.35823L1.78814e-05 11.7015L8.35823 0Z"
                    fill="white"
                  />
                  <path
                    d="M21.7313 0H29.2537L20.8955 11.7015L29.2537 23.403H21.7313L13.3731 11.7015L21.7313 0Z"
                    fill="white"
                  />
                  <path
                    d="M33.9287 11.9444L33.7552 11.7015L33.9287 11.4586L41.8149 0.41791H35.3196L27.2599 11.7015L35.3196 22.9851H41.8149L33.9287 11.9444Z"
                    stroke="white"
                    stroke-width="0.835821"
                  />
                  <path
                    d="M47.3017 11.9444L47.1282 11.7015L47.3017 11.4586L55.1879 0.41791H48.6927L40.633 11.7015L48.6927 22.9851H55.1879L47.3017 11.9444Z"
                    stroke="white"
                    stroke-width="0.835821"
                  />
                </svg>
              </div>
              <div className="flex justify-around h-20 font-bold italic text-primary bg-white/50 z-10 rounded-xl">
                <div className="flex flex-col justify-center items-center w-1/2 border-r my-2 border-primary">
                  <div className="text-[16px] " style={{ lineHeight: "18px" }}>
                    LUNES
                  </div>
                  <div className="text-[42px]" style={{ lineHeight: "30px" }}>
                    27
                  </div>
                  <div
                    className="text-sm text-orange-300"
                    style={{
                      textShadow:
                        "#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px",
                    }}
                  >
                    MARZO
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-1/2">
                  <div className="text-[42px]" style={{ lineHeight: "30px" }}>
                    6:00
                  </div>
                  <div
                    className="text-sm text-orange-300"
                    style={{
                      textShadow:
                        "#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px",
                    }}
                  >
                    AM
                  </div>
                </div>
              </div>
              <button className="btn mt-2 btn-primary z-10">VER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
