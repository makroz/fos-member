import Image from "next/image";
import { useState } from "react";
import DropDown from "../../src/components/ui/DropDown";
import Corner from "./Corner";

const Navbar = ({ user, logout }) => {
  const [dropUser, setDropUser] = useState(false);
  return (
    <div className=" absolute top-5 left-5 right-5 bg-secondary/60 text-primary font-bold h-20 z-50">
      <div className=" relative  h-20 p-3 w-full  justify-between">
        <Corner className="absolute top-0 right-0" />
        <Corner className="absolute bottom-0 right-0 rotate-90" />
        <Corner className="absolute bottom-0 left-0 rotate-180" />
        <Corner className="absolute top-0 left-0 -rotate-90" />
        <div
          className="flex items-center align-middle justify-between gap-5 overflow-hidden px-2"
          onClick={(e) => setDropUser(!dropUser)}
        >
          <div className=" overflow-visible">
            {user.photoURL && (
              <Image
                className="rounded-full"
                src="/images/people/profile-picture-5.jpg"
                alt="avatar"
                width="40"
                height="40"
              />
            )}
            {!user.photoURL && (
              <div className="overflow-visible relative justify-center items-center w-10 h-10 bg-primary rounded-full">
                <Image
                  src="/assets/images/avatar.png"
                  alt="avatar"
                  width="40"
                  height="40"
                />
                {/* <span className="font-medium text-gray-600 ">
                  {initialsName(user.name)}
                </span> */}
              </div>
            )}
          </div>
          <DropDown open={dropUser} onOpen={setDropUser}>
            <ul
              className="py-1 text-sm text-gray-700 "
              aria-labelledby="avatarButton"
            >
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-100 ">
                  Configuraciones
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
                onClick={() => logout()}
              >
                Logout
              </a>
            </div>
          </DropDown>
          <div className="whitespace-nowrap italic flex-grow">
            <div className="text-primary">{user.name}</div>
            <div className="text-title text-xs">Principiante I</div>
            <div className="bg-black w-full h-4 border-gray-500 border">
              <div
                className="w-1/3 bg-primary h-4"
                style={{
                  boxShadow:
                    "inset 0px 4.44444px 4.44444px rgba(255, 255, 255, 0.25)",
                }}
              ></div>
            </div>
          </div>
          <div className="">
            <Image
              src="/assets/images/escudo1.png"
              alt="avatar"
              width="23"
              height="28"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
