import { useMemo } from "react";

const Logo = ({ className = "", width = 0, height = 0 }) => {
  if (width == 0 && height == 0) {
    width = 266;
    height = 89;
  }

  if (width == 0) {
    width = (height * 266) / 89;
  }

  if (height == 0) {
    height = (width * 89) / 266;
  }

  const scale = useMemo(
    () => (width * 100) / 266 + "% " + (height * 100) / 89 + "%",
    [width, height]
  );

  return (
    <div className={"w-[266px] " + (className || "")} style={{ scale: scale }}>
      <svg fill="currentColor">
        <path
          fillRule="evenodd"
          d="M11.9 0C5.3 0 0 5.3 0 11.9V77a12 12 0 0 0 11.9 12h21.7l3.8-27 1-6.4c.5-1.8 1-2.8 1.4-3.1v-.1c.4-.4 1.1-.8 2.3-1l6-.2h31.8c-.4 2.6-.6 4.2-.9 5.1-.4 1.6-1 2.4-1.4 2.8-.4.4-1.3.8-3 1l-7.1.1H51.8l-2.2.1-1.5.6c-1 .5-1.3 1.4-1.4 2-.2.4-.4 1.2-.5 2.4L44 80.5c-.4 3.3-.7 5.5-1 6.5a12 12 0 0 1-.5 2H77a12 12 0 0 0 12-12V12A12 12 0 0 0 77 0H12ZM48 9.1a6 6 0 0 0-2 1 38.5 38.5 0 0 0-2 9.5l-2.1 15.2-.5 2.3v.1c-.2.6-.5 1.5-1.4 2-.4.3-.9.5-1.6.6a6.6 6.6 0 0 1-1.8 0H20.5c-3.6 0-5.9.1-7 .2-1.7.2-2.6.6-3 1-.5.4-1 1.2-1.4 2.7-.3 1-.6 2.6-1 5.2H40c3 0 4.8 0 6-.2 1.1-.2 1.9-.6 2.2-1 .5-.4 1-1.4 1.4-3.2l1-6.5 4.2-29.3a38 38 0 0 0-6.7.4Zm7.4 68.3a6.8 6.8 0 1 0 0-13.5 6.8 6.8 0 0 0 0 13.5ZM166 54s1.3-8.2 2.7-19l.8-5.2c.6-2.8 1.3-4.6 2.2-5.4.8-1 2-1.5 3.8-1.6 1.2-.2 3.6-.2 7.1-.2h32.6l-.7 4.8-.3 2.4-.7 5.2-2.7 19-1 6.4c-.4 1.6-.8 2.8-1.4 3.6-.7 1.1-1.8 1.7-3.5 2-1.3.2-3.8.4-7.8.4h-32.9l.3-2 .5-3.3 1-7.2Zm35-19h-18.2c-.5.2-1 .3-1.2.6-.2.2-.4.7-.5 1.5l-.2.8v.4l-2.2 15.6H197c.4 0 .7-.1.9-.3.2-.2.3-.5.3-.8.2-.3.3-.9.4-1.7v-.4L201 35Zm18 3.3.5-3.2c.6-3.8 1-6.3 1.4-7.5.4-1.7 1.1-3 2-3.6.8-.6 2-1 3.5-1.2l6.6-.2h33a36 36 0 0 1-1.7 8c-.5 1.8-1.4 3-2.6 3.6-.7.3-1.6.5-2.9.7l-5.9.2h-19.8a2 2 0 0 0-1 .5l-.3.8-.2 2H251l7 .1c1.9.2 3.1.6 3.8 1.4.6.7.8 1.8.8 3.5v.5c0 1-.2 3.4-.7 7l-.4 3.1c-.5 4-1 6.6-1.4 7.8-.4 1.3-.7 2-1.3 2.7-.7.8-1.6 1.3-3 1.6a65 65 0 0 1-8.7.4h-32.5c.5-3.6.8-6 1.2-7.3.4-1.7 1-3 2-3.7.7-.7 2-1.1 4-1.3 1 0 3.5-.2 7.2-.2h18.8c.6 0 .8-.2 1-.4l.2-.9.1-.2.3-1.7h-21.7l-5.3-.1a6.8 6.8 0 0 1-3.6-1.3c-.5-.6-.9-1.6-.9-3v-1l1-7Zm-99.6-3.2L115 66.6a57 57 0 0 0 9-.5c1.2-.3 2.1-.9 2.7-1.6.7-.8 1.2-2 1.5-3.6.3-1.2.7-3.4 1.1-6.7l.5-3.5H142c3.7 0 6.1-.1 7.3-.2 1.8-.2 3.1-.6 4-1.3.8-.7 1.5-2 1.9-3.6l1.2-7.3h-24.9l.4-1.7c.1-.5.3-.9.7-1 .2-.2.6-.4 1-.4h17.7a78 78 0 0 0 7.3-.3c1.9-.1 3.2-.6 4-1.3.9-.7 1.5-2 2-3.6.3-1.3.8-3.8 1.3-7.4H131c-2.9 0-4.2.2-5.4.3h-.2a6 6 0 0 0-3.3 1.6c-.7.7-1.3 2-1.8 4l-1 6.6Z"
        />
      </svg>
    </div>
  );
};

export default Logo;
