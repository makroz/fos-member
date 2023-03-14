const CardTareas = ({ fecha, onClick }) => {
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const d = new Date(fecha);
  //const fec = fecha.split(" ");
  let hour: any = d.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let min: any = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  hour = hour + ":" + min;

  const fecha2 = {
    lday: dias[d.getDay()],
    day: d.getDate(),
    lmonth: meses[d.getMonth()],
    hour: hour,
    ampm: d.getHours() >= 12 ? "PM" : "AM",
  };
  return (
    <div className="relative w-64 h-44 bg-secondary rounded-xl z-10 overflow-hidden">
      <div
        className="absolute w-16 h-40 -bottom-9 left-3 -rotate-[144deg] z-0 "
        style={{
          background:
            "linear-gradient(180deg, #FFD48E 0%, rgba(217, 217, 217, 0) 100%)",
        }}
      ></div>
      <div className="flex flex-col w-64 h-44 px-4 py-1">
        <div className="flex  font-bold italic text-3xl  justify-between items-center">
          <div>{fecha2.lday}</div>
          <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
            <path
              d="M8.35823 0H15.8806L7.52241 11.7015L15.8806 23.403H8.35823L1.78814e-05 11.7015L8.35823 0Z"
              fill="white"
            />
            <path
              d="M21.7313 0H29.2537L20.8955 11.7015L29.2537 23.403H21.7313L13.3731 11.7015L21.7313 0Z"
              fill="white"
            />
            <path
              d="M33.9287 11.9444L33.7552 11.7015L33.9287 11.4586L41.8149 0.41791H35.3196L27.2599 11.7015L35.3196 22.9851H41.8149L33.9287 11.9444Z"
              stroke="white"
              strokeWidth="0.835821"
            />
            <path
              d="M47.3017 11.9444L47.1282 11.7015L47.3017 11.4586L55.1879 0.41791H48.6927L40.633 11.7015L48.6927 22.9851H55.1879L47.3017 11.9444Z"
              stroke="white"
              strokeWidth="0.835821"
            />
          </svg>
        </div>
        <div className="flex justify-around h-20 font-bold italic text-primary bg-white/50 z-10 rounded-xl">
          <div className="flex flex-col justify-center items-center w-1/2 border-r my-2 border-primary">
            <div className="text-[42px]" style={{ lineHeight: "30px" }}>
              {fecha2.day}
            </div>
            <div
              className="text-sm text-orange-300"
              style={{
                textShadow:
                  "#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px",
              }}
            >
              {fecha2.lmonth}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-1/2">
            <div className="text-[42px]" style={{ lineHeight: "30px" }}>
              {fecha2.hour}
            </div>
            <div
              className="text-sm text-orange-300"
              style={{
                textShadow:
                  "#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px",
              }}
            >
              {fecha2.ampm}
            </div>
          </div>
        </div>
        <button
          className="btn mt-2 btn-primary z-10"
          onClick={(e) => onClick(2)}
        >
          VER
        </button>
      </div>
    </div>
  );
};

export default CardTareas;
