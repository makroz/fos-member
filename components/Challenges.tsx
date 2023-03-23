import { useCallback, useEffect, useMemo, useState } from "react";
import CardTareas from "./CardTareas";
import SvgScale from "../src/components/forms/SvgScale";
import useScreenSize from "../src/hooks/useScreenSize";
import { ArrowDown } from "react-feather";

const Challenges = () => {
  const { width, height } = useScreenSize();
  const [step, setStep] = useState(1);
  const cabeceras = 80 + 128;

  const med = useMemo(() => {
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
  }, [width, height]);

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
    touch = e.touches[0].clientY;
  };

  const touchEnd = (e) => {
    const touch1 = e.changedTouches[0]?.clientY;
    const arriba = touch - touch1;
    if (Math.abs(arriba) < 30) return;
    if (arriba == 0) {
      return;
    }
    if (arriba < 0) {
      setStep((freshState) => {
        if (freshState < 5) return freshState + 1;
        return freshState;
      });
      //   console.log("arriba", arriba);
    } else {
      setStep((freshState) => {
        if (freshState > 1) return freshState - 1;
        return freshState;
      });
      //   console.log("abajo", arriba);
    }
  };

  const getNubes = useCallback(() => {
    let nubes: any = [];
    nubes.push({ nube: document.getElementById("nube1"), step: 0, dir: 1 });
    nubes.push({ nube: document.getElementById("nube2"), step: 0, dir: -1 });
    nubes.push({ nube: document.getElementById("nube3"), step: 0, dir: 1 });
    nubes.push({ nube: document.getElementById("nube4"), step: 0, dir: -1 });
    return nubes;
  }, []);
  let nubes: any = null;
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const nubesMove = () => {
    if (nubes == null) return;
    nubes.forEach((nube, index) => {
      if (nube.step < 0) {
        const vel = random(16, 30);
        const top = Math.random() * 128 + 1;
        nube.nube.style.transitionDuration = vel + "s";
        nubes[index].step = vel;
        nube.nube.style.top = `${top}px`;
        if (nube.dir == 1) {
          nube.nube.style.left = width + 100 + "px";
        } else {
          nube.nube.style.left = "-100px";
        }

        nubes[index].dir = nubes[index].dir * -1;
      } else {
        nubes[index].step--;
      }
    });
    setTimeout(() => {
      nubesMove();
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("wheel", eventScroll);
    // const fondo = document.getElementById("fondoCard");
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);
    nubes = getNubes();
    setTimeout(() => {
      nubesMove();
    }, 1000);
    return () => {
      window.removeEventListener("wheel", eventScroll);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, []);

  return (
    <>
      <div className="absolute right-5 top-[105px] z-20 ">
        <div className=" flex  text-secondary text-center text-2xl font-bold gap-1">
          <div
            className="rounded-full w-10 h-10 bg-white/70 py-0.5"
            onClick={(e) => {}}
          >
            ?
          </div>
          {step > 1 && (
            <div
              className="rounded-full w-10 h-10 bg-white/70 py-2.5"
              onClick={(e) => setStep(1)}
            >
              <ArrowDown size="22" className="mx-auto " />
            </div>
          )}
        </div>
      </div>

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
        <div className="relative h-32 w-full ">
          <img
            src="/assets/images/nube.png"
            width={50}
            alt="nube"
            className="absolute right-0 top-0 transition-all duration-1000 ease-linear"
            id="nube1"
          />
          <img
            src="/assets/images/nube.png"
            width={50}
            alt="nube"
            className="absolute right-0 top-10 scale-x-[-1] transition-all duration-1000 ease-linear"
            id="nube2"
          />
          <img
            src="/assets/images/nube.png"
            width={50}
            alt="nube"
            className="absolute left-0 top-6 transition-all duration-1000 ease-linear"
            id="nube3"
          />
          <img
            src="/assets/images/nube.png"
            width={50}
            alt="nube"
            className="absolute left-10 top-20 scale-x-[-1] transition-all duration-1000 ease-linear"
            id="nube4"
          />
          <img
            src="/assets/images/meta.png"
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
          {/* <div
            className="w-full h-1/2 absolute top-0 left-0 z-50  bg-black"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.864304022082019) 0%, rgba(0,0,0,0.5046825709779179) 66%, rgba(255,255,255,0) 100%)",
            }}
          ></div> */}
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
              fecha="2023-03-20 6:00"
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
              fecha="2023-03-21 6:00"
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
              fecha="2023-03-22 6:00"
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
              fecha="2023-03-23 6:00"
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
              fecha="2023-03-24 6:00"
              step={step}
              stepId={5}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Challenges;
