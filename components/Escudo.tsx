import SvgScale from "../src/components/forms/SvgScale";

const Escudo = ({
  className = "",
  stars = 1,
  children = null,
  width = 0,
  height = 0,
}: any) => {
  return (
    <SvgScale width={width} height={height} hreal={124} wreal={98}>
      <div
        className={
          "flex w-[98px] h-[124px]  px-3 justify-around escudos " + className
        }
      >
        {!children && (
          <>
            {stars > 1 && (
              <div className="h-[124px] flex items-center">
                <img src="/assets/images/medal.webp" alt="" />
              </div>
            )}
            {stars != 2 && (
              <div className="h-[124px] flex items-center">
                <img
                  src="/assets/images/medal.webp"
                  alt=""
                  className="scale-125"
                />
              </div>
            )}
            {stars > 1 && (
              <div className="h-[124px] flex items-center">
                <img src="/assets/images/medal.webp" alt="" />
              </div>
            )}
          </>
        )}
        {children && (
          <div className="h-[124px] flex items-center">{children}</div>
        )}
      </div>
    </SvgScale>
  );
};

export default Escudo;
