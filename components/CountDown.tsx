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
  let negativo = false;
  return (
    <div ref={ctx} className="flex gap-4">
      {timer?.map((item, index) => {
        negativo = false;
        if (item.valor < 0) {
          item.valor = item.valor * -1;
          negativo = true;
        }
        if (item.valor < 10) item.valor = "0" + item.valor;
        return (
          <div key={index} className="text-center ">
            <div>{item.label}</div>
            <div key={index} className="flex px-0">
              <Ficha
                value={(item.valor + "").charAt(0)}
                ctx={ctx}
                negativo={negativo}
              />
              <Ficha
                value={(item.valor + "").charAt(1)}
                ctx={ctx}
                negativo={negativo}
              />
            </div>
            negaotivo:{negativo}
          </div>
        );
      })}
    </div>
  );
};

export default CountDown;
