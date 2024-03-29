import { useEffect, useState } from "react";
import t from "../src/utils/traductor";

const PopVideo = (props) => {
  const [open1, setOpen1] = useState(false);

  const _close = (a) => {
    setOpen1(false);
    setTimeout(() => {
      props.onClose(a);
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpen1(props.open);
    }, 300);
  }, [props.open]);
  return (
    <>
      <div
        id={"popVideo-" + props.id}
        className={
          (props.open ? "" : "hidden") +
          " bg-slate-700 opacity-70 fixed top-0 left-0 right-0 bottom-0 z-40  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full"
        }
      ></div>
      <div
        className={
          (props.open ? "" : "hidden ") +
          " fixed top-0 left-0 right-0 bottom-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full   transition-all  duration-1000"
        }
      >
        <div className={" w-full h-full max-w-lg md:h-auto z-50 m-auto"}>
          {/* <!-- Modal content --> */}
          <div
            className={
              (open1
                ? " "
                : "opacity-0 transform -translate-y-full scale-150") +
              " bg-white rounded-lg shadow  transition-all duration-300 "
            }
          >
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-5 border-b rounded-t ">
              <h1 className="text-xl font-medium text-gray-900 ">
                {props.title}
              </h1>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={_close}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">{props.children}</div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
              {props.buttonText != "" && (
                <button
                  className="btn btn-primary flex-shrink w-fit"
                  onClick={() => props.onSave("save")}
                >
                  {props.buttonText}
                </button>
              )}
              <button
                className="btn bg-gray-400 text-white  flex-shrink w-fit"
                onClick={_close}
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopVideo;
