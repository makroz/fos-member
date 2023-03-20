import { useEffect, useState } from "react";
import { Clock, XCircle } from "react-feather";
import Flecha from "./layout/Flecha";

const CardTareas = ({ fecha, onClick, step, stepId }) => {
  const [open, setOpen] = useState(false);
  const meses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];
  const dias = [
    "DOMINGO",
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
  ];
  const day = new Date().getDay();
  const [timer, setTimer] = useState(10);
  const [end, setEnd] = useState(false);

  const click = () => {
    if (stepId == step && !open) {
      setOpen(true);
      setEnd(false);
    } else {
      onClick(stepId);
      setOpen(false);
      setEnd(false);
    }
  };
  useEffect(() => {
    if (step != stepId) {
      setOpen(false);
    }
  }, [step]);

  const d = new Date(fecha);
  let hour: any = d.getHours();
  // if (hour < 10) {
  //   hour = "0" + hour;
  // }
  let min: any = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  hour = hour + ":" + min;

  const fecha2 = {
    lday: dias[d.getDay()],
    day: d.getDate(),
    lmonth: meses[d.getMonth()],
    hour: hour,
    ampm: d.getHours() >= 12 ? "PM" : "AM",
  };

  useEffect(() => {
    let interval: any;
    if (open && step == stepId) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    } else {
      setTimer(10);
    }
    return () => clearInterval(interval);
  }, [open]);

  return (
    <div
      className={
        "relative  bg-secondary rounded-xl  overflow-hidden  origin-bottom-left transition-all ease-in-out duration-500 " +
        (open && step == stepId
          ? "w-80 h-[460px] -translate-y-[284px] " +
            (stepId % 2 == 0 ? " -translate-x-16 " : " ")
          : "w-64 h-44 ")
      }
      style={{ boxShadow: open ? "0px 6px 39px #000000" : "" }}
      onClick={(e) => {
        if (step != stepId) click();
      }}
    >
      {/* {day < stepId && (
        <div className="absolute w-full top-0 bottom-0 bg-black/70 z-50"></div>
      )} */}
      <div
        className="absolute bg-primary  text-gray-600 w-16 h-40 -bottom-9 left-3 -rotate-[144deg] z-0 "
        style={{
          background:
            day >= stepId
              ? "linear-gradient(180deg, #F27F0C 0%, rgba(217, 217, 217, 0) 100%)"
              : "linear-gradient(180deg, rgba(75, 85, 99, 1) 0%, rgba(217, 217, 217, 0) 100%)",
        }}
      ></div>
      <div
        className={
          "flex flex-col px-4 py-1 " +
          (open && step == stepId ? "w-80 h-[460px]" : "w-64 h-44 ")
        }
      >
        <div
          className={
            "flex  font-bold italic text-3xl  justify-between items-center " +
            (open ? "pb-2 pt-3 " : "") +
            (day >= stepId ? "" : "text-gray-500")
          }
        >
          <div>{end ? "FELICIDADES" : fecha2.lday}</div>
          <Flecha
            className={
              "transition-all duration-500 ease-in-out delay-500 " +
              (open ? "-translate-x-80" : "")
            }
          />
          <XCircle
            size={24}
            className={
              "text-red-600 " + (open ? "opacity-1" : "hidden opacity-0")
            }
            onClick={(e) => {
              setEnd(false);
              setOpen(false);
            }}
          />
        </div>
        <div>
          <div
            className={"relative bg-slate-600 " + (open ? "h-44 mb-6" : "h-0")}
          >
            {end ? (
              <div className=" flex justify-around items-center h-44 bg-gray-900">
                <img
                  src="/assets/images/star2.png"
                  className="animate-bounce"
                />
                <img src="/assets/images/star1.png" className="animate-ping" />
                <img
                  src="/assets/images/star2.png"
                  className="animate-bounce"
                />
              </div>
            ) : open ? (
              <iframe
                width="290"
                height="176"
                src="https://www.youtube.com/embed/i9J9_g321Fg?controls=0&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media; web-share;muted"
                allowFullScreen
              ></iframe>
            ) : (
              ""
            )}

            <div
              className={
                "absolute -bottom-3 text-primary rotate-180 scale-[2.5] transition-all duration-500 ease-in-out  " +
                (open ? "left-0 delay-500" : "-left-32 ")
              }
            >
              <Flecha />
            </div>
          </div>
        </div>
        <div
          className={
            "flex justify-around  font-bold italic text-primary  z-10 rounded-xl " +
            (open ? "h-28 scale-125 mb-4" : "h-20")
          }
        >
          {end ? (
            <div className="flex flex-col justify-center items-center w-full  my-2  ">
              <div
                className={"text-[40px] text-secondary "}
                style={{
                  lineHeight: "38px",
                  textShadow:
                    "#fff 0px 0px 1px,   #fff 0px 0px 1px,   #fff 0px 0px 1px,#fff 0px 0px 1px,   #fff 0px 0px 1px,   #fff 0px 0px 1px",
                }}
              >
                RETO
              </div>
              <div className="text-lg text-primary">CUMPLIDO</div>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center w-1/2 border-r my-2 border-primary ">
                <div
                  className={"text-[40px] text-secondary "}
                  style={{
                    lineHeight: "38px",
                    textShadow:
                      "#fff 0px 0px 1px,   #fff 0px 0px 1px,   #fff 0px 0px 1px,#fff 0px 0px 1px,   #fff 0px 0px 1px,   #fff 0px 0px 1px",
                  }}
                >
                  {fecha2.day}
                </div>
                <div
                  className={
                    "text-sm  " +
                    (day >= stepId ? "text-primary" : "text-gray-500")
                  }
                >
                  {fecha2.lmonth}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-1/2">
                <div
                  className="text-[40px] text-secondary"
                  style={{
                    lineHeight: "38px",
                    textShadow:
                      "#fff 0px 0px 1px,   #fff 0px 0px 1px,   #fff 0px 0px 1px,#fff 0px 0px 1px,   #fff 0px 0px 1px,   #fff 0px 0px 1px",
                  }}
                >
                  {fecha2.hour}
                </div>
                <div
                  className={
                    "text-sm  " +
                    (day >= stepId ? "text-primary" : "text-gray-500")
                  }
                >
                  {fecha2.ampm}
                </div>
              </div>
            </>
          )}
        </div>
        {end && (
          <button
            className="btn mt-2 btn-primary z-10"
            onClick={(e) => click()}
          >
            TERMINAR RETO
          </button>
        )}
        {!end &&
          (open ? (
            <button
              className={
                "btn mt-2  z-10 flex justify-around " +
                (timer > 0 ? "bg-[#353336]" : "bg-primary")
              }
              // onClick={(e) => click()}
            >
              {timer > 0 ? (
                <>
                  <Clock size={24} />
                  <span> 1D 00:00:{timer}</span>
                </>
              ) : (
                <a
                  href="https://meet.google.com/dki-buuu-zsz"
                  target="_blank"
                  onClick={(e) => setEnd(true)}
                >
                  ENTRAR al Challenge
                </a>
              )}
            </button>
          ) : step == stepId ? (
            <button
              className="btn mt-2 btn-primary z-10"
              onClick={(e) => click()}
            >
              {day == stepId ? "ENTRAR" : "Ver INFO"}
            </button>
          ) : (
            ""
          ))}
      </div>
    </div>
  );
};

export default CardTareas;
