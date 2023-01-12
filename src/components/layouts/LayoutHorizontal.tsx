import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Circle,
  Menu,
  XCircle,
} from "react-feather";
import { mainMenu } from "../../../config/mainMenu";
import useAuth from "../../hooks/useAuth";
import { initialsName } from "../../utils/string";
import DropDown from "../DropDown";
import { Avatar } from "flowbite-react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const LayoutHorizontal = ({ children }) => {
  const { user, config }: any = useAuth();
  const [visible, setVisible]: any = useState(false);

  const onVisible = (e) => {
    setVisible(!visible);
  };

  const onResize = (e) => {
    setVisible(false);
  };
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!user) return children;
  return (
    <div className="grid grid-cols-[300px__1fr] min-h-full h-full">
      <div
        className={`${visible ? " block" : "md:block hidden"}  bg-primary px-2`}
        style={{ background: config?.app?.colorPrimary }}
      >
        <Sidebar config={config} />
      </div>
      <div
        className={`${
          visible ? " col-span-1" : "col-span-2 md:col-span-1"
        }  bg-white flex flex-col h-full`}
      >
        <Navbar onVisible={onVisible} />
        <div className="h-full m-8">{children}</div>
      </div>
    </div>
  );
};

export default LayoutHorizontal;
