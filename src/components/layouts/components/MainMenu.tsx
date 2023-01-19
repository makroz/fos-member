import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Circle } from "react-feather";
import { mainMenu } from "../../../../config/mainMenu";
import ItemMenu from "./ItemMenu";

const MainMenu = ({ config, onVisible }: any) => {
  const [menu, setMenu]: any = useState(mainMenu);
  const router = useRouter();
  const slug = config?.app?.link || "";
  let active = router.route;
  if (active.indexOf("]") >= 0) {
    active = active.substring(active.indexOf("]") * 1 + 1);
    if (active == "") {
      active = "/";
    }
  }
  return (
    <ul className="space-y-2">
      {menu.map((item, index) => {
        if (item.type === "separator") return <hr key={index} />;
        if (item.children)
          return (
            <li key={item.id}>
              <div
                className={
                  (item.open === true ? "menuItemActive" : "menuItemNormal") +
                  " menuItem"
                }
                onClick={(e) => {
                  menu[index].open = menu[index].open !== true;
                  setMenu([...menu]);
                }}
              >
                {item.icon}
                <span className="flex-1 whitespace-nowrap">{item.title}</span>
                <span className="inline-flex items-center justify-center text-sm font-medium ">
                  {item.open !== true ? <ChevronRight /> : <ChevronDown />}
                </span>
              </div>
              <ul
                id={`dropdown-${item.id}`}
                className={
                  (item.open !== true ? "hidden" : null) +
                  " py-2 space-y-2 px-4 pr-0"
                }
              >
                {item.children.map((item2) => {
                  return (
                    <ItemMenu
                      key={item2.id}
                      item={item2}
                      slug={slug}
                      config={config}
                      active={active}
                      onVisible={onVisible}
                    />
                  );
                })}
              </ul>
            </li>
          );
        return (
          <ItemMenu
            key={item.id}
            item={item}
            slug={slug}
            active={active}
            config={config}
            onVisible={onVisible}
          />
        );
      })}
    </ul>
  );
};

export default MainMenu;
