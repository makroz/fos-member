import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import DataModal from "../src/components/DataModal";
import DataTable from "../src/components/DataTable";
import Spinner from "../src/components/layouts/Spinner";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";

const guestPage = () => {
    const { user }: any = useAuth();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "sponsor_id,=,"+user?.id,
  });
  const { data, loaded, reLoad } = useAxios("/members", "GET", {
    ...params,
    origen: "useAxios",
  });

  useEffect(() => {
    reLoad({ ...params, origen: "reLoad" }, true);
  }, [params]);

  const onChangePage = (page) => {
    if (params.page == page) return;
    setParams({ ...params, page });
  };
  const onChangePerPage = (perPage) => {
    if (params.perPage == perPage) return;
    setParams({ ...params, perPage });
  };

  const columns = {
    name: {
      header: "Guest",
      className: "",
    },
    icn: {
      header: "Personal ID",
      className: "",
    },
    level: {
        header: "Level",
        className: "",
        render:(value,row)=>{
            return row.level.title+" "+row.level.id
        }
      },
      register_date: {
        header: "Register Date",
        className: "",
        },
  };

  return (
    <>
      <h1>Guest List</h1>
      <Card className="relative">
        {!loaded && <Spinner />}
        {data && (
          <DataTable
            datas={data.data}
            columns={columns}
            params={{ ...params, total: data.total }}
            onChangePage={onChangePage}
            onChangePerPage={onChangePerPage}
          />
        )}
      </Card>
      <DataModal open={true} title='prueba' >
        <h1>Modal</h1>
      </DataModal>
    </>
  );
};

export default guestPage;
guestPage.auth = true;
