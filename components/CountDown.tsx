import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Ficha from "./Ficha";

const CountDown = ({ timer }) => {
  const ctx: any = useRef(null);
  useEffect(() => {
    ctx.current = gsap.context(() => {});
    return () => {
      if (ctx.current) ctx.current.revert();
    };
  }, [ctx]);
  let valor;
  let negativo = timer[0].valor < 0 ? 1 : 0;

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
