import { Home, Users } from "react-feather";
export const mainMenu = [
  {
    id: "dasboard",
    title: "Dashboard",
    icon: <Home />,
    link: "/",
  },
  {
    id: "tasks",
    title: "Tareas Personales",
    icon: <Home />,
    link: "/tasks",
  },
  {
    id: "guests",
    title: "Invitados",
    icon: <Users />,
    link: "/guests",
  },
];
