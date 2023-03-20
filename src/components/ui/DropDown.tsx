import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const DropDown = ({
  onOpen,
  children,
  open,
  className = "w-44 bg-white rounded  top-10 right-2  ",
}) => {
  const container: any = useRef(null);
  useOnClickOutside(container, () => {
    onOpen(false);
  });

  return (
    <div
      ref={container}
      id="userDropdown"
      className={!open ? "hidden " : "absolute z-[100] shadow " + className}
    >
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default DropDown;
