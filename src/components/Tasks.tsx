import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const Tasks = () => {
  const { user }: any = useAuth();
  // const [tasks, setTasks] = useState([]);
  const { data:tasks, error, loaded, execute } = useAxios("/tasks", "GET", {
    sortBY: "date_to",
    perPage: 50,
    searchBy: "member_id,=," + user.id,
  });
  const status = ["0", "Pendiente", "En proceso", "Finalizado", "Vencido"];
  const date = new Date().toLocaleString();
  return (
    <>
      <div>Tasks</div>
      <ul>
        {tasks?.data.map((task) => {
          if (task.to_date > date) task.status = 3;
          return (
            <li key={task.id}>
              {task.to_date} - {task.challenge.name} - {status[task.status]}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tasks;
