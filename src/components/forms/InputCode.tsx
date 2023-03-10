import { useEffect } from "react";

const InputCode = ({
  setCode,
  type = "text",
  placeholder = "●",
  name,
  label,
  value = "",
  tabIndex = 0,
}: any) => {
  let inputElements: any[] = [];
  const sendCode = () => {
    const inputElements: any = Array.from(
      document.querySelectorAll("input.code-input")
    );
    const code = inputElements.map(({ value }) => value).join("");
    setCode(code.trim());
  };
  useEffect(() => {
    inputElements = Array.from(document.querySelectorAll("input.code-input"));
    inputElements.forEach((ele, index) => {
      ele.addEventListener("keydown", (e: any) => {
        if (e.keyCode === 8 && e.target.value === "")
          inputElements[Math.max(0, index - 1)].focus();
      });
      ele.addEventListener("input", (e: any) => {
        const first = e.target.value[0];
        const rest = e.target.value.slice(1);

        e.target.value = first ?? "";

        const lastInputBox = index === inputElements.length - 1;
        const didInsertContent = first !== undefined;
        if (!first) {
          if (index > 0) inputElements[index - 1].focus();
          sendCode();
          return;
        }

        if (!rest && !lastInputBox) {
          inputElements[index + 1].focus();
          sendCode();
          return;
        }

        if (didInsertContent && !lastInputBox) {
          inputElements[index + 1].focus();
          inputElements[index + 1].value = rest;
          inputElements[index + 1].dispatchEvent(new Event("input"));
        }
        sendCode();
      });
    });
  }, []);

  const onChange = (e: any) => {};
  return (
    <>
      <div className={`input`}>
        <label htmlFor={name} className={`input-label`}>
          {label}
        </label>
        <div className="flex items-center content-between gap-3 lg:w-96 mb-4">
          <form>
            <input
              name="code1"
              id="code1"
              className="   text-center code-input grow w-6 focus:ring-2 rounded-lg  focus:ring-green-500 focus:outline-none"
              required
              placeholder={placeholder}
              autoComplete="cc-number"
              value={value[0] || ""}
              type={type}
              onChange={onChange}
              aria-label="Pin 1"
              tabIndex={tabIndex}
            />
          </form>
          <form>
            <input
              name="code2"
              id="code2"
              className="  text-center code-input grow w-6 focus:ring-2 rounded-lg  focus:ring-green-500 focus:outline-none "
              required
              placeholder={placeholder}
              autoComplete="cc-number"
              value={value[1] || ""}
              type={type}
              onChange={onChange}
              aria-label="Pin 2"
              tabIndex={tabIndex + 1}
            />
          </form>
          <form>
            <input
              name="code3"
              id="code3"
              className="  text-center code-input grow w-6 focus:ring-2 rounded-lg  focus:ring-green-500 focus:outline-none "
              required
              placeholder={placeholder}
              autoComplete="cc-number"
              value={value[2] || ""}
              type={type}
              onChange={onChange}
              aria-label="Pin 3"
              tabIndex={tabIndex + 2}
            />
          </form>
          <form>
            <input
              name="code4"
              id="code4"
              className="   text-center code-input grow w-6 focus:ring-2 rounded-lg  focus:ring-green-500 focus:outline-none "
              required
              placeholder={placeholder}
              autoComplete="cc-numberd"
              value={value[3] || ""}
              type={type}
              onChange={onChange}
              aria-label="Pin 4"
              tabIndex={tabIndex + 3}
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default InputCode;
