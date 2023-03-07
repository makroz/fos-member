import { useRouter } from "next/router";
import { ArrowLeft } from "react-feather";

const Head = (props) => {
  const router = useRouter();
  let back;

  if (props.back) {
    back = props.back;
  } else {
    let retorno = "/";
    if (props.return) retorno = props.return;
    back = () => {
      router.push(retorno);
    };
  }
  return (
    <div
      className={
        (props.className || "") +
        " h-[75px] p-5 flex gap-1 items-center overflow-hidden absolute top-0 left-0 right-0 z-10"
      }
    >
      <ArrowLeft size={24} onClick={() => back()} />
      <img
        src={process.env.NEXT_PUBLIC_APP_LOGO}
        alt={process.env.NEXT_PUBLIC_APP_NAME}
        width={104}
        height={35}
      />
      <div className="flex-grow">{props.children}</div>
    </div>
  );
};

export default Head;
