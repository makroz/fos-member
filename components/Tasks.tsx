import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";
import Spinner from "../src/components/layouts/Spinner";
import CountDown from "./CountDown";

const Tasks = () => {
  const { user }: any = useAuth();
  if (!user) return <Spinner />;
  const { data: tasks, error, loaded, execute } = useAxios("/tasks", "GET", {
    sortBY: "date_to",
    perPage: 0,
    searchBy: "member_id,=," + user?.id,
  });
  const [remains, setRemains]: any = useState([]);
  const timeRemains = (date: any) => {
    const dateTo = new Date(date);
    const diff = dateTo.getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return [
      { label: "Dias", valor: days },
      { label: "Hrs", valor: hours },
      { label: "Min", valor: minutes },
      { label: "Seg", valor: seconds },
    ];
    //return ${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const getRemains = () => {
    const remains = tasks?.data.map((task) => {
      let duration = new Date(task.to_date).getTime() - new Date().getTime();
      if (duration <= 0) task.status = 4;
      return {
        ...task,
        name: task.challenge.name,
        status: task.status,
        remains: timeRemains(task.to_date),
      };
    });
    setRemains(remains);
    // console.log("remains", remains);
  };
  let interval;
  useEffect(() => {
    getRemains();
    interval = setInterval(getRemains, 1000);
    return () => clearInterval(interval);
  }, [tasks]);

  const status = [
    { label: "0", className: "" },
    { label: "Pendiente", className: "text-yellow-500" },
    { label: "En Proceso", className: "text-green-500" },
    { label: "Finalizado", className: "text-blue-500" },
    { label: "Vencido", className: "text-red-500" },
  ];

  return (
    <Card className="relative ">
      <h1>Tareas Personales2 </h1>
      <ul>
        {(!loaded || remains?.length == 0) && <Spinner />}
        {remains?.length > 0 &&
          remains.map((task) => (
            <li key={task.id}>
              <div className="border border-gray-300 rounded-lg my-4 py-1 px-0 shadow-md group flex flex-col ">
                <div className=" m-0 pb-2 text-xs self-center">
                  <CountDown timer={task.remains} />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="bg-slate-900 p-2">
                    {/* <div className={status[task.status].className}> */}
                    <div>
                      {task.status}:{" "}
                      <span className="text-gray-500 text-xs">
                        {task.to_date}
                      </span>
                    </div>
                    <h2 className="self-center text-white">{task.name}</h2>
                  </div>
                  <div className="px-2 text-xs">
                    <div className="text-gray-500 ">
                      {task.challenge?.description}
                      <hr />
                    </div>
                    <div className="text-gray-500 text-xs">
                      Tipo: {task.type == "L" ? "Live" : "Video"}
                    </div>
                  </div>
                  {task.type == "L" && task.status == "O" && (
                    <div className="btn bg-green-500 hover:bg-green-900 text-white font-bold rounded mx-4 px-4 text-center">
                      <a target="_blank" href={task.live?.meet_link || null}>
                        Entrar a la Sala
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </Card>
  );
};

export default Tasks;
