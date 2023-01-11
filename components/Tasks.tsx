import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";
import Spinner from "../src/components/layouts/Spinner";

const Tasks = () => {
  const { user }: any = useAuth();
  if (!user) return <Spinner />;
  const { data: tasks, error, loaded, execute } = useAxios("/tasks", "GET", {
    sortBY: "date_to",
    perPage: 50,
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
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const getRemains = () => {
    const remains = tasks?.data.map((task) => {
      let duration = new Date(task.to_date).getTime() - new Date().getTime();
      if (duration <= 0) task.status = 4;
      return {
        id: task.id,
        name: task.challenge.name,
        status: task.status,
        to_date: task.to_date,
        remains: timeRemains(task.to_date),
      };
    });
    setRemains(remains);
    console.log("remains", remains);
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
    <Card className="relative">
      <div>Tasks</div>
      <ul>
        {(!loaded || remains?.length == 0) && <Spinner />}
        {remains?.length > 0 &&
          remains.map((task) => (
            <li key={task.id}>
              <Card>
                <div>{task.name}</div>
                <div className={status[task.status].className}>
                  {status[task.status].label}
                </div>
                <div>{task.to_date}</div>
                <div>{task.remains}</div>
              </Card>
            </li>
          ))}
      </ul>
    </Card>
  );
};

export default Tasks;
