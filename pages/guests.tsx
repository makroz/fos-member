import { Avatar } from "flowbite-react";
import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";
import { initialsName } from "../src/utils/string";
import styles from "../styles/guests.module.css";
const guestPage = () => {
  const { user, config }: any = useAuth();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "sponsor_id,=," + user.id,
    relations: "referidos",
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
    "icn2*|Repita no. de CI|rules::same:icn",
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

  const referido = (members) => {
    if (!members || members.length == 0) return null;
    return (
      <>
        <ol>
          {members.map((member: any, index: number) => {
            return (
              <>
                <li key={member.id + index}>
                  <div className="rounded-full">
                    <h2>
                      <Avatar rounded>
                        {member.name}
                        <div className="text-sm">
                          Dni: {member.icn}
                          <br />
                          Nivel: {member.level.title}
                        </div>
                      </Avatar>
                    </h2>
                  </div>
                  {referido(member.referidos)}
                </li>
              </>
            );
          })}
        </ol>
      </>
    );
  };
  return (
    <>
      <ol className={styles.memberChart}>
        <li>
          <div>
            <h1>
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
                <div className="text-center ">Sistema</div>
              )}
            </h1>
          </div>
          <ol>
            <li className="">
              <div className="  rounded-full bg-red-500 p-3">
                <h1 className="  rounded-full bg-white pr-3 ">
                  <Avatar rounded size="lg">
                    {user.name}
                    <div className="text-sm">
                      Dni:{user.icn}
                      <br />
                      Nivel:{user.level.title}
                    </div>
                  </Avatar>
                </h1>
              </div>
            </li>
          </ol>
          {referido(data?.data)}
        </li>
      </ol>
      <DataCrud
        title="Invitado"
        modulo="members"
        param={{ searchBy: "sponsor_id,=," + user.id }}
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
{
  /* <ol className="organizational-chart">
        <li>
          <div>
            <h1>King County Code</h1>
          </div>
          <ol>
            <li>
              <div>
                <h1>Information security charter</h1>
              </div>
              <ol>
                <li>
                  <div>
                    <h1>Information security program</h1>
                  </div>
                </li>
              </ol>
            </li>
          </ol>
          <ol>
            <li>
              <div>
                <h2>Secondary</h2>
              </div>
              <ol>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                  <ol>
                    <li>
                      <div>
                        <h4>Quaternary</h4>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h4>Quaternary</h4>
                      </div>
                      <ol>
                        <li>
                          <div>
                            <h5>Quinary</h5>
                          </div>
                        </li>
                        <li>
                          <div>
                            <h5>Quinary</h5>
                          </div>
                          <ol>
                            <li>
                              <div>
                                <h6>Senary</h6>
                              </div>
                            </li>
                          </ol>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <div>
                        <h4>Quaternary</h4>
                      </div>
                    </li>
                  </ol>
                </li>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                </li>
              </ol>
            </li>
            <li>
              <div>
                <h2>Secondary</h2>
              </div>
              <ol>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                  <ol>
                    <li>
                      <div>
                        <h4>Quaternary</h4>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h4>Quaternary</h4>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h4>Quaternary</h4>
                      </div>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              <div>
                <h2>Secondary</h2>
              </div>
              <ol>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                  <ol>
                    <li>
                      <div>
                        <h4>Quaternary</h4>
                      </div>
                      <ol>
                        <li>
                          <div>
                            <h5>Quinary</h5>
                          </div>
                          <ol>
                            <li>
                              <div>
                                <h6>Senary</h6>
                              </div>
                            </li>
                            <li>
                              <div>
                                <h6>Senary</h6>
                              </div>
                            </li>
                          </ol>
                        </li>
                        <li>
                          <div>
                            <h5>Quinary</h5>
                          </div>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                </li>
              </ol>
            </li>
            <li>
              <div>
                <h2>Secondary</h2>
              </div>
              <ol>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                  <ol>
                    <li>
                      <div>
                        <h4>Quaternary</h4>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h4>Quaternary</h4>
                      </div>
                    </li>
                  </ol>
                </li>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Tertiary</h3>
                  </div>
                </li>
              </ol>
            </li>
          </ol>
        </li>
      </ol> */
}
