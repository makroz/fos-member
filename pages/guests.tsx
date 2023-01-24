import { Avatar, Badge, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import DataCrud from "../src/components/DataCrud";
import DataTable from "../src/components/DataTable";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";
import { capitalizeWords, initialsName } from "../src/utils/string";
import styles from "../styles/guests.module.css";
const guestPage = () => {
  const { user, config }: any = useAuth();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "name",
    orderBy: "asc",
    searchBy: "sponsor_id,=," + user.id,
    relations: "referidos",
  });
  const [refer, setRefer] = useState({});
  const [members, setMembers] = useState([
    { bg: "black", txt: "text-white", count: 0 },
    { bg: "blue-800", txt: "text-white", count: 0 },
    { bg: "green-800", txt: "text-white", count: 0 },
    { bg: "red-800", txt: "text-white", count: 0 },
    { bg: "purple-800", txt: "text-white", count: 0 },
    { bg: "yellow-400", txt: "text-black", count: 0 },
    { bg: "gray-400", txt: "text-white", count: 0 },
    { bg: "blue-400", txt: "text-black", count: 0 },
    { bg: "green-400", txt: "text-black", count: 0 },
    { bg: "red-400", txt: "text-black", count: 0 },
    { bg: "purple-400", txt: "text-black", count: 0 },
  ]);
  const { data } = useAxios("/members", "GET", params);
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
  fields["_row"].className = (row, index) => {
    const border = "border-l-" + members[refer[row.icn]]?.bg;
    return border + " border-l border-l-4 ";
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
          <div>{capitalizeWords(row.name)}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between gap-2">
            {row.icn}
            {row.referidos.length > 0 && (
              <div
                className={
                  "bg-" +
                  members[refer[row.icn] + 1]?.bg +
                  " " +
                  members[refer[row.icn] + 1]?.txt +
                  " rounded-full text-sm p-0 px-2 w-fit"
                }
              >
                {row.referidos.length}
              </div>
            )}
          </div>
        </div>
      </Avatar>
    );
  };
  fields["name"].className =
    "whitespace-nowrap text-gray-900 dark:text-white flex items-start";

  const referido = (members) => {
    if (!members || members.length == 0) return null;
    return (
      <>
        <ol>
          {members.map((member: any, index: number) => {
            return (
              <li key={member.id + index}>
                <div className="rounded-full">
                  <h2>
                    <Avatar rounded>
                      {capitalizeWords(member.name)}
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
            );
          })}
        </ol>
      </>
    );
  };

  const referCount = (referidos, level) => {
    if (!referidos || referidos.length == 0) return 0;
    let count = 0;
    let count1 = 0;
    referidos.map((referido: any, index: number) => {
      count++;
      count1++;
      refer[referido.icn] = level;
      count += referCount(referido.referidos, level + 1);
    });
    members[level].count += count1;
    return count;
  };

  const LevelCount = ({ members }) => {
    return (
      <div className="flex flex-wrap gap-1 justify-start">
        {members.map((member: any, index: number) => {
          // console.log("member", member);

          if (member.count > 0)
            return (
              <div
                key={index}
                className={
                  "bg-" +
                  member.bg +
                  " " +
                  member.txt +
                  " rounded-full text-sm p-0 px-2"
                }
              >
                {member.count}
              </div>
            );
        })}
      </div>
    );
  };

  const onClickRowChildren = (row) => {
    //console.log(row);
    if (!row.referidos || row.referidos.length == 0) return "";

    return (
      <DataTable
        datas={row.referidos}
        columns={fields}
        onClickRowChildren={onClickRowChildren}
        params={{ ...params, total: data.total }}
        onAction={null}
        onChangePage={null}
        onChangePerPage={null}
        onChangeSort={null}
        _sel={false}
      />
    );
  };

  useEffect(() => {
    if (data?.data) {
      referCount(data.data, 0);
    }
  }, [data?.data]);

  return (
    <>
      <Card className="overflow-hidden">
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
                      <div className="text-sm ">
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
      </Card>
      <br />
      <DataCrud
        title="Invitado"
        modulo="members"
        msg={<LevelCount members={members} />}
        param={{
          searchBy: "sponsor_id,=," + user.id,
          relations: "referidos",
          sortBy: "name",
        }}
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
        onClickRowChildren={onClickRowChildren}
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
