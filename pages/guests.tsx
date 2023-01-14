import { Avatar } from "flowbite-react";
import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";
import { initialsName } from "../src/utils/string";

const guestPage = () => {
  const { user, config }: any = useAuth();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "sponsor_id,=," + user.id,
  });
  const { data, error, loaded, execute, reLoad } = useAxios("/members", "GET", {
    ...params,
    origen: "useAxios",
  });
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const fields = getFields([
    "id",
    "name*|Nombre Completo|_h_::Usuario",
    "icn*|Carnet de Identidad",
    "points*|Puntos|_h_",
    "level_id*|Nivel|_h_",
    "status|_h_",
  ]);
  fields["points"].actions = ["view"];
  fields["level_id"].actions = ["view"];
  fields["status"].actions = ["view"];
  fields["icn"].actions = ["add", "view"];
  fields["level_id"].render = (value, row, key, index) => {
    return row[key];
  };

  fields["name"].render = (value, row, key, index) => {
    return (
      <Avatar
        img=""
        placeholderInitials={initialsName(row.name)}
        rounded={true}
        className="flex-shrink-0"
      >
        <div className="space-y-1 font-medium dark:text-white">
          <div>{row.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.icn}
          </div>
        </div>
      </Avatar>
    );
  };
  fields["name"].className =
    "whitespace-nowrap text-gray-900 dark:text-white  flex items-start";

  return (
    <>
      <div className="diagram">
        <h2
          className="level1 rectangle rounded-full"
          style={{ margin: "0 auto 20px" }}
        >
          {user.sponsor_id ? (
            <Avatar rounded>
              Patrocinador: {user.sponsor.name}
              <div className="text-xs">
                Dni: {user.sponsor.icn}
                <br />
                Nivel: {user.sponsor.level.title}
              </div>
            </Avatar>
          ) : (
            <div className="w-full text-center">Sistema</div>
          )}
        </h2>
        <h1 className="level1 rectangle rounded-full">
          <Avatar rounded size="lg">
            {user.name}
            <div className="text-sm">
              Dni:{user.icn}
              <br />
              Nivel:{user.level.title}
            </div>
          </Avatar>
        </h1>
        <ol className="level2Wrapper">
          {data?.data.map((member: any, index: number) => {
            return (
              <>
                <li>
                  <h2 className="level2 rectangle rounded-full">
                    <Avatar rounded>
                      {member.name}
                      <div className="text-sm">
                        Dni: {member.icn}
                        <br />
                        Nivel: {member.level.title}
                      </div>
                    </Avatar>
                  </h2>
                </li>
              </>
            );
          })}
        </ol>
      </div>
      <DataCrud
        title="Invitado"
        modulo="members"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default guestPage;
guestPage.auth = true;
