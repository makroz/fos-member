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

  const medidas = () => {
    const widthBase = 360;
    const alto1 = 176;
    const ancho1 = 256;
    const margenes = 40;
    const scale1 = 1;
    const scale2 = 0.6;
    const scale3 = 0.4;
    const scale4 = 0.35;
    const scale5 = 0.2;
    const alto2 = alto1 * scale2;
    const alto3 = alto1 * scale3;
    const alto4 = alto1 * scale4;
    const alto5 = alto1 * scale5;
    const ancho2 = ancho1 * scale2;
    const ancho3 = ancho1 * scale3;
    const ancho4 = ancho1 * scale4;
    const ancho5 = ancho1 * scale5;
    const left2 = 180;
    const left3 = 60;
    const left4 = 240;
    const left5 = 140;
    const restar = cabeceras + margenes + alto1 + alto2 + alto3 + alto4 + alto5;
    let s = (height - restar) / 4;
    const med = {
      top5: margenes / 2,
      top4: margenes / 2 + alto5 + s,
      top3: margenes / 2 + alto5 + s * 2 + alto4,
      top2: margenes / 2 + alto5 + s * 3 + alto4 + alto3,
      top1: margenes / 2 + alto5 + s * 4 + alto4 + alto3 + alto2,
      scale1,
      scale2,
      scale3,
      scale4,
      scale5,
      left1: margenes / 2,
      left2: ((left2 + ancho2) * width) / widthBase - ancho2,
      left3: (left3 * width) / widthBase,
      left4: ((left4 + ancho4) * width) / widthBase - ancho4,
      left5: (left5 * width) / widthBase,
    };
    return med;
  };

  const med = medidas();

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
      <div
        className="relative flex-grow  z-10"
        style={{
          background: "linear-gradient(180deg, #FFD48E 0%, #F27F0C 100%)",
        }}
      >
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
                fill="#A55200"
              />
            </svg>
          </SvgScale>
        </div>
        <div
          id="tarea1"
          className="absolute z-10 origin-top-left"
          style={{
            top: med.top1,
            left: med.left1,
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
          style={{ top: med.top2, left: med.left2 }}
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
          style={{ top: med.top3, left: med.left3 }}
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
          style={{ top: med.top4, left: med.left4 }}
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
          style={{ top: med.top5, left: med.left5 }}
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
