import Head from "next/head";
import useAuth from "../src/hooks/useAuth";
import img_meta from "../public/assets/images/meta.png";
import Image from "next/image";
import useScreenSize from "../src/hooks/useScreenSize";
import SvgScale from "../src/components/forms/SvgScale";
import CardTareas from "../components/CardTareas";
import { useState } from "react";

const Home = () => {
  const { config }: any = useAuth();
  const { width, height } = useScreenSize();
  const [step, setStep] = useState(1);
  const cabeceras = 80 + 128;
  const scaleLeft = (left) => {
    //return (left * width) / 375 + "px";
    const p = (left * 100) / 375;
    return (width * p) / 100 + "px";
  };
  const scaleTop = (top) => {
    const p = (top * 100) / 667;
    return ((height - cabeceras) * p) / 100 + "px";
  };

  const card1: any = document.getElementById("tarea1");
  const onClick = (s) => {
    const card: any = document.getElementById("tarea" + s);
    console.log(card.getBoundingClientRect());
    const fondo: any = document.getElementById("fondoCard");
    let top =
      card.getBoundingClientRect().top -
      (card1.getBoundingClientRect().top + 80);
    console.log("top", top);
    // fondo.style.top = top + "px";
    if (s == step) setStep(s - 1);
    else setStep(s);
    const card2: any = document.getElementById("tarea" + s);
    console.log(card2.getBoundingClientRect());
  };
  return (
    <div
      id="fondoCard"
      className={
        "flex flex-col absolute top-0 bottom-20 w-full origin-top-left transition-all duration-500 ease-out " +
        (step == 2 ? " scale-[1.666]  " : "") +
        (step == 3 ? " scale-[2.5] " : "") +
        (step == 4 ? " scale-[2.857] " : "") +
        (step == 5 ? " scale-[5] " : "")
      }
    >
      {/* translate-y-[-105.234px] translate-x-[-190px] */}
      {/* scale-[5] -translate-x-[40%] translate-y-[185%] ultio dia */}
      {/* scale-[2] translate-x-[50px] translate-y-[60%] */}
      <Head>
        <title>FOS</title>
        <meta name="description" content={config?.app.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-32 w-full ">
        <Image
          src={img_meta}
          alt="meta"
          width={30}
          className="absolute bottom-0 left-1/2 -translate-x-9"
        />
      </div>
      <div className="relative flex-grow bg-[#526697] z-10">
        <div className=" block overflow-visible w-full h-full  z-0 top-0 bottom-0">
          <SvgScale
            width={width}
            height={height - cabeceras}
            wreal={2095}
            hreal={3217}
            origin="0 0"
          >
            <svg width="2095" height="3217">
              <path
                d="M712.524 1773.59C741.262 2247.9 181.5 2981.5 181.5 2981.5L0.5 3216.67H2095V3018.94V2369.71C2095 1640.8 1427.41 1292.57 1469.13 1065.34C1510.86 838.104 1772.33 796.789 1747.29 513.486C1722.26 230.183 1051.88 0 1051.88 0H795.974C795.974 0 1382.9 277.401 1382.9 513.486C1382.9 696.453 606.822 746.621 556.752 1115.5C509.928 1460.48 691.451 1425.78 712.524 1773.59Z"
                fill="#03133A"
              />
            </svg>
          </SvgScale>
        </div>
        <div
          id="tarea1"
          className="absolute z-10 origin-top-left"
          style={{
            bottom: scaleTop(20),
            left: scaleLeft(20),
          }}
        >
          <CardTareas
            fecha="2023-03-13 6:00"
            onClick={(e) => {
              onClick(1);
            }}
          />
        </div>
        <div
          id="tarea2"
          className="absolute z-10 scale-[0.6] origin-top-left"
          style={{ bottom: scaleTop(195), left: scaleLeft(180) }}
        >
          <CardTareas
            fecha="2023-03-14 6:00"
            onClick={(e) => {
              onClick(2);
            }}
          />
        </div>

        <div
          id="tarea3"
          className="absolute z-10 scale-[0.4] origin-top-left"
          style={{ bottom: scaleTop(280), left: scaleLeft(60) }}
        >
          <CardTareas
            fecha="2023-03-15 6:00"
            onClick={(e) => {
              onClick(3);
            }}
          />
        </div>
        <div
          id="tarea4"
          className="absolute z-10 scale-[0.35] origin-top-left"
          style={{ bottom: scaleTop(350), left: scaleLeft(240) }}
        >
          <CardTareas
            fecha="2023-03-16 6:00"
            onClick={(e) => {
              onClick(4);
            }}
          />
        </div>
        <div
          id="tarea5"
          className="absolute z-10 scale-[0.2] origin-top-left"
          style={{ bottom: scaleTop(428), left: scaleLeft(200) }}
        >
          <CardTareas
            fecha="2023-03-17 6:00"
            onClick={(e) => {
              onClick(5);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
