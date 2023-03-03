const Head = (props) => {
  return (
    <div className="p-5">
      <div>aaa</div>
      <img
        src={process.env.NEXT_PUBLIC_APP_LOGO}
        alt={process.env.NEXT_PUBLIC_APP_NAME}
        width={104}
        height={35}
      />
      <div>{props.children}</div>
      qweqwqwe
    </div>
  );
};

export default Head;
