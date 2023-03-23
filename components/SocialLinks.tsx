import { useState } from "react";
import {
  IconFaceBook,
  IconInstagram,
  IconPinterest,
  IconShare,
  IconTikTok,
  IconTwitch,
  IconTwitter,
  IconYT,
} from "./IconSocial";
const SocialLinks = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className={
          "absolute -top-11 -left-11 w-28 h-28  transition-all duration-500 ease-in-out " +
          (open ? "scale-100" : "scale-0")
        }
      >
        <div className="absolute w-28 h-28 rounded-full bg-primary  flex justify-center items-center ">
          <IconTikTok className="hover:text-white absolute opacity-1 -translate-x-10 " />
          <IconInstagram className="hover:text-white  absolute opacity-1 -translate-y-10 " />
          <IconFaceBook className="hover:text-white  absolute opacity-1 translate-y-10" />
          <IconTwitter className="hover:text-white  absolute opacity-1 translate-y-7 -translate-x-7" />
          <IconTwitch className="hover:text-white  absolute opacity-1 -translate-y-7 translate-x-7" />
          <IconYT className="hover:text-white  absolute opacity-1 translate-y-7 translate-x-7" />
          <IconPinterest className="hover:text-white absolute opacity-1 -translate-y-7 -translate-x-7 text-black" />
        </div>
      </div>
      <div
        className={
          "relative rounded-full border w-7 h-7 border-primary bg-black z-10 "
        }
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        <IconShare className="absolute " />
      </div>
    </div>
  );
};

export default SocialLinks;
