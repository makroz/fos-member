import Head from "next/head";
import useAuth from "../src/hooks/useAuth";
import img_meta from "../public/assets/images/meta.png";
import Image from "next/image";
import useScreenSize from "../src/hooks/useScreenSize";
import SvgScale from "../src/components/forms/SvgScale";
import CardTareas from "../components/CardTareas";
import { useEffect, useState } from "react";

const Home = () => {
  const { config }: any = useAuth();
  const { width, height } = useScreenSize();
  const [step, setStep] = useState(1);
  //const [opens, setOpens] = useState([false,false,false,false,false])
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
    const zoom1 = 1;
    const zoom2 = 1 / scale2;
    const zoom3 = 1 / scale3;
    const zoom4 = 1 / scale4;
    const zoom5 = 1 / scale5;

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

    const top1 = margenes / 2 + alto5 + s * 4 + alto4 + alto3 + alto2;
    const top2 = margenes / 2 + alto5 + s * 3 + alto4 + alto3;
    const top3 = margenes / 2 + alto5 + s * 2 + alto4;
    const top4 = margenes / 2 + alto5 + s;
    const top5 = margenes / 2;

    const hzoom = height - 80;

    const top5zoom = top1 + 128 - ((top5 + 128) * (hzoom * zoom5)) / hzoom;
    const top4zoom = top1 + 128 - ((top4 + 128) * (hzoom * zoom4)) / hzoom;
    const top3zoom = top1 + 128 - ((top3 + 128) * (hzoom * zoom3)) / hzoom;
    const top2zoom = top1 + 128 - ((top2 + 128) * (hzoom * zoom2)) / hzoom;
    const top1zoom = 0;

    // console.log("tops1", top1, "top5z", top5zoom);

    const left1c = margenes / 2;
    const left2c = ((left2 + ancho2) * width) / widthBase - ancho2;
    const left3c = (left3 * width) / widthBase;
    const left4c = ((left4 + ancho4) * width) / widthBase - ancho4;
    const left5c = (left5 * width) / widthBase;

    const left5zoom = left1c - (left5c * (width * zoom5)) / width;
    const left4zoom =
      width - ancho1 - left1c - (left4c * (width * zoom4)) / width;
    const left3zoom = left1c - (left3c * (width * zoom3)) / width;
    const left2zoom =
      width - ancho1 - left1c - (left2c * (width * zoom2)) / width;
    const left1zoom = 0;

    const med = {
      top: [0, top1, top2, top3, top4, top5],
      topzoom: [0, top1zoom, top2zoom, top3zoom, top4zoom, top5zoom],
      scale: [1, scale1, scale2, scale3, scale4, scale5],
      left: [20, left1c, left2c, left3c, left4c, left5c],
      leftzoom: [0, left1zoom, left2zoom, left3zoom, left4zoom, left5zoom],
      zoom: [1, zoom1, zoom2, zoom3, zoom4, zoom5],
    };
    //console.log("medidas", med);
    return med;
  };

  const med = medidas();

  const onClick = (s) => {
    if (s > 5) {
      s = 5;
    }
    if (s < 1) {
      s = 1;
    }
    if (s == step && s > 1) setStep(s - 1);
    else setStep(s);
  };

  let wheel = false;
  const eventScroll = (event) => {
    if (wheel) return;
    wheel = true;
    setTimeout(() => {
      wheel = false;
    }, 500);
    if (event.deltaY > 0) {
      setStep((freshState) => {
        if (freshState < 5) return freshState + 1;
        return freshState;
      });
    } else if (event.deltaY < 0) {
      setStep((freshState) => {
        if (freshState > 1) return freshState - 1;
        return freshState;
      });
    }
  };

  let touch = 0;
  const touchStart = (e) => {
    //alert("touchstart");
    touch = e.touches[0].clientY;
    // console.log("touchstart", touch);
  };

  const touchEnd = (e) => {
    const touch1 = e.changedTouches[0]?.clientY;
    // console.log("touchend", touch1);
    const arriba = touch - touch1;
    if (Math.abs(arriba) < 30) return;
    if (arriba == 0) {
      return;
    }
    if (arriba > 0) {
      setStep((freshState) => {
        if (freshState < 5) return freshState + 1;
        return freshState;
      });
      console.log("arriba", arriba);
    } else {
      setStep((freshState) => {
        if (freshState > 1) return freshState - 1;
        return freshState;
      });
      console.log("abajo", arriba);
    }
  };
  useEffect(() => {
    window.addEventListener("wheel", eventScroll);
    // const fondo = document.getElementById("fondoCard");
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);
    return () => {
      window.removeEventListener("wheel", eventScroll);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, []);

  return (
    <div className="absolute  top-0 left-0  w-full overflow-hidden bottom-0 ">
      <Head>
        <title>FOS</title>
        <meta name="description" content={config?.app.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="w-full h-1 border border-black top-[740px] absolute z-50"></div> */}
      <div
        id="fondoCard"
        className={
          "flex flex-col absolute  top-0 left-0  w-full origin-top-left transition-all duration-500 ease-out "
        }
        style={{
          transform: "scale(" + med.zoom[step] + ")",
          top: med.topzoom[step] + "px",
          left: med.leftzoom[step] + "px",
        }}
      >
        {/* translate-y-[-105.234px] translate-x-[-190px] */}
        {/* scale-[5] -translate-x-[40%] translate-y-[185%] ultio dia */}
        {/* scale-[2] translate-x-[50px] translate-y-[60%] */}

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
            className="absolute z-[14] origin-top-left"
            style={{
              top: med.top[1],
              left: med.left[1],
            }}
          >
            <CardTareas
              fecha="2023-03-13 6:00"
              step={step}
              stepId={1}
              onClick={onClick}
            />
          </div>
          <div
            id="tarea2"
            className="absolute z-[13] scale-[0.6] origin-top-left"
            style={{ top: med.top[2], left: med.left[2] }}
          >
            <CardTareas
              fecha="2023-03-14 6:00"
              step={step}
              stepId={2}
              onClick={onClick}
            />
          </div>

          <div
            id="tarea3"
            className="absolute z-[12] scale-[0.4] origin-top-left"
            style={{ top: med.top[3], left: med.left[3] }}
          >
            <CardTareas
              fecha="2023-03-15 6:00"
              step={step}
              stepId={3}
              onClick={onClick}
            />
          </div>
          <div
            id="tarea4"
            className="absolute z-[11] scale-[0.35] origin-top-left"
            style={{ top: med.top[4], left: med.left[4] }}
          >
            <CardTareas
              fecha="2023-03-16 6:00"
              step={step}
              stepId={4}
              onClick={onClick}
            />
          </div>
          <div
            id="tarea5"
            className="absolute z-[10] scale-[0.2] origin-top-left"
            style={{ top: med.top[5], left: med.left[5] }}
          >
            <CardTareas
              fecha="2023-03-17 6:00"
              step={step}
              stepId={5}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
