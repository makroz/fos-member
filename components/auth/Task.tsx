import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";
import Spinner from "../src/components/layouts/Spinner";
import CountDown from "./CountDown";

const Tasks = () => {
  const { user }: any = useAuth();
  if (!user) return <Spinner />;
  const { data: tasks, error, loaded, execute, reLoad } = useAxios(
    "/tasks",
    "GET",
    {
      sortBY: "date_to",
      perPage: 0,
      searchBy: "member_id,=," + user?.id,
    }
  );
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
      if (duration <= 0 && task.status == "P") task.status = "V";
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

  const status = {
    A: { label: "Pendiente", className: "text-yellow-500" },
    O: { label: "Abierta", className: "text-green-500" },
    S: { label: "En Proceso", className: "text-green-500" },
    E: { label: "Finalizada", className: "text-blue-500" },
    V: { label: "Vencida", className: "text-red-500" },
    C: { label: "Cerrada", className: "text-blue-700" },
    X: { label: "Deshabitada", className: "text-gray-500" },
  };

  const beginTask = (task) => {
    execute("/tasks-begin/" + task, "POST");
    reLoad();
  };
  const endTask = (task) => {
    execute("/tasks-end/" + task, "POST");
    reLoad();
  };
  return (
    <Card className="relative ">
      <h1>Tareas Personales </h1>
      <ul>
        {(!loaded || remains?.length == 0) && <Spinner />}
        {remains?.length > 0 &&
          remains.map((task) => (
            <li key={task.id}>
              <div className="border border-gray-300 rounded-lg my-4 py-1 px-0 shadow-md group flex flex-col text-xs">
                {task.status == "A" ||
                task.status == "O" ||
                task.status == "V" ? (
                  <div className=" m-0 pb-2 self-center">
                    <CountDown timer={task.remains} />
                  </div>
                ) : (
                  <div className=" m-0 pb-2 self-center flex flex-col">
                    <div className="flex justify-between gap-2">
                      <div>Iniciada</div> {task.start_date?.split(" ")[1]}
                    </div>
                    {task.status == "C" && (
                      <div className="flex justify-between gap-2">
                        <div>Sala Cerrada:</div>{" "}
                        {task.live.close_date?.split(" ")[1]}
                      </div>
                    )}
                    {task.status == "E" && (
                      <div className="flex justify-between gap-2">
                        <div>Finalizada:</div> {task.ended_date?.split(" ")[1]}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-1 w-full">
                  <div className="bg-slate-900 p-2 pt-0">
                    <div className="text-gray-500 text-[8px] flex justify-between gap-2">
                      {task.to_date}
                      <span className="text-gray-500">
                        Tipo:{" "}
                        <span className="text-white">
                          {task.type == "L" ? "Live" : "Video"}
                        </span>
                      </span>
                    </div>
                    <div className={status[task.status].className + " text-xs"}>
                      <span className="">{status[task.status].label}: </span>
                      <span className="self-center text-white">
                        {task.name}
                      </span>
                    </div>
                  </div>
                  <div className="px-2  text-gray-500">
                    {task.challenge?.description}
                  </div>
                  {task.type == "L" && task.status == "O" && (
                    <div
                      className="btn bg-green-500 hover:bg-green-900 text-white font-bold rounded mx-4 px-4 text-center"
                      onClick={() => {
                        beginTask(task.id);
                      }}
                    >
                      <a target="_blank" href={task.live?.meet_link || null}>
                        Entrar a la Sala
                      </a>
                    </div>
                  )}
                  {task.type == "L" && task.status == "C" && (
                    <div
                      className="btn bg-blue-700 hover:bg-blue-900 text-white font-bold rounded mx-4 px-4 text-center"
                      onClick={() => {
                        endTask(task.id);
                      }}
                    >
                      Finalizar Tarea
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
