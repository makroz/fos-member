import Image from "next/image";
import { useState } from "react";
import { XCircle } from "react-feather";
import DropDown from "../../src/components/ui/DropDown";
import UserAvatar from "../../src/components/ui/UserAvatar";
import Escudo from "../Escudo";
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
        <DropDown
          open={dropUser}
          onOpen={setDropUser}
          className="bg-secondary/90 rounded-lg border border-primary top-3 left-3 right-3 p-2 text-title"
        >
          <XCircle
            size={24}
            className="text-red-600 absolute right-2"
            onClick={(e) => {
              setDropUser(false);
            }}
          />

          <div className="flex pt-2 pb-4 self-center">
            <div className="scale-150 ">
              <UserAvatar user={user} />
            </div>
          </div>
          <div className="self-center text-center">
            <div className="text-primary">{user.name}</div>
            <div className="text-xs">Invitado</div>
          </div>
          <div className="bg-black w-full h-4 border-gray-500 border overflow-hidden relative">
            <div className="absolute bg-gray-600 h-4 w-1 left-[20%]  -skew-x-[30deg]"></div>
            <div className="absolute bg-gray-600 h-4 w-1 left-[40%]  -skew-x-[30deg]"></div>
            <div className="absolute bg-gray-600 h-4 w-1 left-[60%]  -skew-x-[30deg]"></div>
            <div className="absolute bg-gray-600 h-4 w-1 left-[80%]  -skew-x-[30deg]"></div>
            <div className="w-1/5 h-full barInclinada"></div>
          </div>
          <div className="flex justify-around my-4">
            <div className="text-2xl w-8 escudo h-10 pt-0.5 text-center">L</div>
            <div className="text-2xl w-8  h-10 pt-0.5 text-center">M</div>
            <div className="text-2xl w-8  h-10 pt-0.5 text-center">M</div>
            <div className="text-2xl w-8  h-10 pt-0.5 text-center">J</div>
            <div className="text-2xl w-8  h-10 pt-0.5 text-center">V</div>
          </div>
          {/* <div className="flex justify-around my-4">
            <div className="text-2xl flex">
              <div className=" w-4 olivoIzq  h-6"></div>
              <div className="-mt-2.5 -mx-1">I</div>
              <div className=" w-4 olivoDer  h-6"></div>
            </div>
            <div className="opacity-30 text-2xl flex">
              <div className=" w-4 olivoIzq  h-6"></div>
              <div className="-mt-2.5 -mx-1">II</div>
              <div className=" w-4 olivoDer  h-6"></div>
            </div>
            <div className="opacity-30 text-2xl flex">
              <div className=" w-4 olivoIzq  h-6"></div>
              <div className="-mt-2.5 -mx-1">III</div>
              <div className=" w-4 olivoDer  h-6"></div>
            </div>
          </div> */}
          <div className="border-y-2 border-subTitle flex justify-around text-xs text-center py-4">
            <div>
              Estatura
              <div className="border border-primary rounded-full w-24 p-1.5 bg-gray-700">
                1.75 m
              </div>
            </div>
            <div>
              Peso
              <div className="border border-primary rounded-full w-24 p-1.5 bg-gray-700">
                70 kg
              </div>
            </div>
          </div>

          <button className="btn btn-primary my-4">Configuraciones</button>
          <a
            href="#"
            className="btn bg-secondary border-2 border-x-primary"
            onClick={() => logout()}
          >
            Cerrar Sesion
          </a>
        </DropDown>
        <div
          className="flex items-center align-middle justify-between gap-5 overflow-hidden px-2"
          onClick={(e) => setDropUser(!dropUser)}
        >
          <UserAvatar user={user} round="rounded-lg" />

          <div className="whitespace-nowrap italic flex-grow">
            <div className="text-primary">{user.name}</div>
            <div className="text-title text-xs">Principiante I</div>
            <div className="bg-black w-full h-full border-gray-500 border">
              <div
                className="w-1/3 bg-primary h-4"
                style={{
                  boxShadow:
                    "inset 0px 4.44444px 4.44444px rgba(255, 255, 255, 0.25)",
                }}
              ></div>
            </div>
          </div>
          <div className="w-8 h-9">
            <Escudo className="v4 scale-[0.35]" stars={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
