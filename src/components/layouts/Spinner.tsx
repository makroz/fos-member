import Logo from "../../../components/req/Logo";
import style from "../../../styles/spinner.module.css";
import useConfig from "../../hooks/useConfig";
const Spinner = () => {
  const config = useConfig();
  return (
    <div className={`${style.fallbackSpinner} ${style.appLoader}`}>
      <Logo width={88} />
      <div className={style.loading}>
        <div className={`${style.effect1} ${style.effects}`}></div>
        <div className={`${style.effect2} ${style.effects}`}></div>
        <div className={`${style.effect3} ${style.effects}`}></div>
      </div>
    </div>
  );
};

export default Spinner;
