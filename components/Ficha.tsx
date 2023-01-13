import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Quart } from "gsap";
import styles from "../styles/ficha.module.css";

const Ficha = ({ ctx, value, negativo }: any) => {
  const topRef: any = useRef(null);
  const backTopRef = useRef(null);
  const [old, setOld] = useState("0");

  useEffect(() => {
    if (ctx.current?.add)
      ctx.current.add(() => {
        gsap.to(topRef.current, 0.7, {
          rotationX: "-180deg",
          transformPerspective: 300,
          ease: Quart.easeOut,
          onComplete: function () {
            setOld(value);
            gsap.set(topRef.current, { rotationX: 0 });
          },
        });
        gsap.to(backTopRef.current, 0.7, {
          rotationX: 0,
          transformPerspective: 300,
          ease: Quart.easeOut,
          clearProps: "all",
        });
      });
    return () => {
      //      setOld(value);
    };
  }, [value]);
  let color = "black";
  if (negativo) {
    color = "red";
  }
  return (
    <div className={styles.box}>
      <div className={styles.figure} style={{ color: color }}>
        <span className={styles.top} ref={topRef}>
          {old}
        </span>
        <span className={styles.topBack} ref={backTopRef}>
          <span>{value}</span>
        </span>
        <span className={styles.bottom}>{old}</span>
        <span className={styles.bottomBack}>
          <span>{value}</span>
        </span>
      </div>
      {negativo}
    </div>
  );
};

export default Ficha;
