import Logo from "./Logo";

const Splash = () => {
  return (
    <div className="grid grid-cols-1 w-full h-full absolute z-[5000] bg-primary text-secondary">
      <div className="items-center justify-center mx-auto my-auto">
        <Logo />
        {/* <img
          src={process.env.NEXT_PUBLIC_APP_LOGO}
          alt={process.env.NEXT_PUBLIC_APP_NAME}
          width={266}
          height={88}
          
        /> */}
        <div className="text-center  animate-spin">.</div>
      </div>
    </div>
  );
};

export default Splash;
