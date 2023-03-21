import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Ficha from "./Ficha";

const CountDown = ({ fecha, onFinish }) => {
  const ctx: any = useRef(null);
  const [timer, setTimer]: any = useState([]);
  const [negativo, setNegativo] = useState(0);
  useEffect(() => {
    ctx.current = gsap.context(() => {});
    return () => {
      if (ctx.current) ctx.current.revert();
    };
  }, [ctx]);

  let valor;
  //let negativo =

  const timeRemains = (fecha: string) => {
    const dateTo = new Date(fecha);
    const diff = dateTo.getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    setNegativo(days < 0 ? 1 : 0);
    onFinish((old) => diff);
    return [
      { label: "Dias", valor: days },
      { label: "Hrs", valor: hours },
      { label: "Min", valor: minutes },
      { label: "Seg", valor: seconds },
    ];
  };

  useEffect(() => {
    const second = setInterval(() => {
      if (negativo == 0) {
        setTimer((old) => timeRemains(fecha));
      } else {
        clearInterval(second);
      }
    }, 1000);

    return () => {
      clearInterval(second);
    };
  }, []);

  return (
    <div ref={ctx} className="flex gap-1">
      {timer?.map((item, index) => {
        valor = item.valor * 1;
        if (valor < 0) {
          valor = valor * -1;
        }
        if (valor < 10) valor = "0" + valor;
        return (
          <div key={index} className="text-center ">
            <div>{item.label}</div>
            <div key={index} className="flex px-0">
              <Ficha
                value={(valor + "").charAt(0)}
                ctx={ctx}
                negativo={negativo}
              />
              <Ficha
                value={(valor + "").charAt(1)}
                ctx={ctx}
                negativo={negativo}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountDown;
