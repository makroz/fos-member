import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { initialsName } from "../../../utils/string";
import t from "../../../utils/traductor";
import DropDown from "../../ui/DropDown";
import Hamburguer from "./Hamburguer";

const Navbar = ({ onVisible = null, visible = false }: any) => {
  const { user, logout }: any = useAuth();
  const [dropUser, setDropUser] = useState(false);

  return (
    <div className="navbar z-30 relative">
      <div>
        <Hamburguer
          onClick={onVisible}
          active={visible}
          className="block md:hidden"
        />
      </div>
      {/* <div>
        {onVisible && !visible && (
          <Menu className="block md:hidden" onClick={onVisible} />
        )}
        {onVisible && visible && (
          <X className="block md:hidden" onClick={onVisible} />
        )}
      </div> */}
      <div
        className="flex items-center align-middle gap-2 ml-9 overflow-hidden"
        onClick={(e) => setDropUser(!dropUser)}
      >
        <div className="whitespace-nowrap">
          <div className="text-title">{user.name}</div>
          <div className="text-subTitle text-xs">
            {t(user.role?.description)}
          </div>
        </div>
        <div className="relative">
          {user.photoURL && (
            <img
              className="w-10 h-10 rounded-full"
              src="/images/people/profile-picture-5.jpg"
              alt=""
            />
          )}
          {!user.photoURL && (
            <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full ">
              <span className="font-medium text-gray-600 ">
                {initialsName(user.name)}
              </span>
            </div>
          )}
          <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white  rounded-full"></span>
        </div>
        <DropDown open={dropUser} onOpen={setDropUser}>
          <ul
            className="py-1 text-sm text-gray-700 "
            aria-labelledby="avatarButton"
          >
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 ">
                {t("Settings")}
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
              onClick={() => logout()}
            >
              {t("Sign out")}
            </a>
          </div>
        </DropDown>
      </div>
    </div>
  );
};

export default Navbar;
