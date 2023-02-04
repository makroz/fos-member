import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import MemberDiagram from "../components/MemberDiagram";
// import MemberDiagram from "../components/MemberDiagram";
import DataCrud from "../src/components/DataCrud";
import DataTable from "../src/components/DataTable";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";
import { capitalizeWords, initialsName } from "../src/utils/string";

const guestPage = () => {
  const { user }: any = useAuth();
  const params = {
    relations: "referidos",
    sortBy: "name",
    orderBy: "asc",
  };
  const [refer, setRefer] = useState({});
  const [members, setMembers] = useState([
    { bg: "blue-800", txt: "text-white", count: 0 },
    { bg: "green-400", txt: "text-white", count: 0 },
    { bg: "red-800", txt: "text-white", count: 0 },
    { bg: "black", txt: "text-white", count: 0 },
    { bg: "yellow-400", txt: "text-black", count: 0 },
    { bg: "purple-800", txt: "text-white", count: 0 },
    { bg: "gray-400", txt: "text-white", count: 0 },
    { bg: "blue-400", txt: "text-black", count: 0 },
    { bg: "green-800", txt: "text-white", count: 0 },
    { bg: "red-400", txt: "text-black", count: 0 },
    { bg: "purple-400", txt: "text-black", count: 0 },
  ]);

  const { data: levels } = useAxios("/levels", "GET", {
    perPage: 0,
    sortBy: "name",
    orderBy: "asc",
  });
  const { data, reLoad } = useAxios("/members", "GET", params);

  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const [datas, setDatas]: any = useState(null);

  const fields = getFields([
    "id",
    "name*|Nombre Completo|_h_::Usuario",
    "icn*|Carnet de Identidad|inputType::number",
    "icn2*|Repita no. de CI|rules::same:icn|search::false",
    "points*|Puntos|_h_|inputType::number",
    "level_id*|Nivel|_h_",
    "status|_h_",
  ]);
  fields["points"].actions = ["view"];
  fields["level_id"].actions = ["view"];
  fields["status"].actions = ["view"];
  fields["icn"].actions = ["add", "view"];
  fields["level_id"].options = levels?.data;
  fields["_row"].className = (row, index) => {
    const border = "border-l-" + members[refer[row.icn]]?.bg;
    return border + " border-l border-l-4 ";
  };
  fields["_actions"].render = (value) => {
    if (value == "add") return true;
    return false;
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
            {row.referidos?.length > 0 && (
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
    members[level].count = count1;
    return count;
  };

  const LevelCount = ({ members }) => {
    return (
      <div className="flex flex-wrap gap-1 justify-start">
        {members.map((member: any, index: number) => {
          if (member.count > 0)
            return (
              <div key={index + "level"} className="flex flex-col">
                <div className="text-[8px]">Nivel {index + 1}</div>
                <div
                  key={index}
                  className={
                    "bg-" +
                    member.bg +
                    " " +
                    member.txt +
                    " rounded-full text-sm p-0 px-2 self-center "
                  }
                >
                  {member.count}
                </div>
              </div>
            );
        })}
      </div>
    );
  };

  const onClickRowChildren = (row) => {
    if (!row.referidos || row.referidos.length == 0) return "";
    return (
      <DataTable
        datas={row.referidos}
        columns={fields}
        onClickRowChildren={onClickRowChildren}
        params={{ ...params }}
        onAction={null}
        setParams={null}
      />
    );
  };

  useEffect(() => {
    if (data?.data) {
      setDatas(data);
      referCount(data.data, 0);
    }
  }, [data?.data]);

  const search = (s, members, result: any = []) => {
    members.map((row: any, index: number) => {
      if (
        row.icn.toLowerCase().includes(s) ||
        row.name.toLowerCase().includes(s)
      ) {
        result.push(row);
      }
      if (row.referidos.length > 0) {
        result = search(s, row.referidos, result);
      }
    });
    return result;
  };

  const setSearch = (searchBy: string) => {
    const s = searchBy.trim().toLowerCase();
    if (s == "") {
      setDatas(data);
      return false;
    }
    const result: any = search(s, data.data);
    setDatas({ data: result, total: result.length });
    return false;
  };

  return (
    <>
      <div className="bg-black bg-blue-800 bg-green-800 bg-red-800 bg-purple-800 bg-yellow-400 bg-gray-400 bg-blue-400 bg-green-400 bg-red-400 bg-purple-400"></div>
      <div className="border-l-black border-l-blue-800 border-l-green-800 border-l-red-800 border-l-purple-800 border-l-yellow-400 border-l-gray-400 border-l-blue-400 border-l-green-400 border-l-red-400 border-l-purple-400"></div>
      <DataCrud
        title="Invitado"
        modulo="members"
        textBtnAdd="Invitar"
        msgs={{ middle: <LevelCount members={members} /> }}
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
        onClickRowChildren={onClickRowChildren}
        _actions={false}
        datas={datas}
        reload={reLoad}
        setSearch={setSearch}
      />
      <br />
      <MemberDiagram user={user} members={data?.data} levels={levels?.data} />
    </>
  );
};

export default guestPage;
