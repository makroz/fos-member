import { useMemo } from "react";

const SvgScale = ({
  className = "",
  width = 0,
  height = 0,
  wreal,
  hreal,
  origin = "center center",
  children,
}) => {
  if (width == 0 && height == 0) {
    width = wreal;
    height = hreal;
  }

  if (width == 0) {
    width = (height * wreal) / hreal;
  }

  if (height == 0) {
    height = (width * hreal) / wreal;
  }

  const scale = useMemo(
    () => (width * 100) / wreal + "% " + (height * 100) / hreal + "%",
    [width, height, wreal, hreal]
  );

  return (
    <div
      className={className}
      style={{
        width: width,
        height: height,
        scale: scale,
        transformOrigin: origin,
      }}
    >
      {children}
    </div>
  );
};

export default SvgScale;
