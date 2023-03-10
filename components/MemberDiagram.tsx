import { Avatar, Card } from "flowbite-react";
import { capitalizeWords } from "../src/utils/string";
import styles from "../styles/MemberDiagram.module.css";

const referido = (members, levels: any = []) => {
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
                      Nivel:{" "}
                      {levels?.find &&
                        levels?.find((level) => level.id == member.level_id)
                          ?.name}
                    </div>
                  </Avatar>
                </h2>
              </div>
              {referido(member.referidos, levels)}
            </li>
          );
        })}
      </ol>
    </>
  );
};

const MemberDiagram = ({ user, members, levels = [] }: any) => {
  return (
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
                    Nivel:{" "}
                    {levels?.find &&
                      levels?.find((level) => level.id == user.sponsor.level_id)
                        ?.name}
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
                      Nivel:
                      {levels?.find &&
                        levels?.find((level) => level.id == user.level_id)
                          ?.name}
                      {/* {user.level.name} */}
                    </div>
                  </Avatar>
                </h1>
              </div>
            </li>
          </ol>
          {referido(members, levels)}
        </li>
      </ol>
    </Card>
  );
};

export default MemberDiagram;
