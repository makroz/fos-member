import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import DataModal from "../src/components/DataModal";
import DataTable from "../src/components/DataTable";
import DbForm from "../src/components/forms/DbForm";
import Spinner from "../src/components/layouts/Spinner";
import useAuth from "../src/hooks/useAuth";
import useAxios from "../src/hooks/useAxios";
import { capitalize } from "../src/utils/string";
const getFields = (campos: any = []) => {
  let result = {};
  let formSchema = {};
  campos.map((key) => {
    const field = {
      id: key,
      inputType: "text",
      label: capitalize(key),
      required: true,
      readOnly: false,
      actions: ["add", "edit", "show"],
      className: "",
      validate: [],
    };
    if (key == "id") {
      field.inputType = "hidden";
    }
    result[key] = field;
    formSchema[key] = "";
  });
  return [result, formSchema];
};
const guestPage = () => {
    const { user }: any = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formState, setFormState] = useState({});
    const [fields, setFields] = useState({});
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortBy: "id",
    orderBy: "asc",
    searchBy: "sponsor_id,=,"+user?.id,
  });
  const { data, loaded, reLoad,execute } = useAxios("/members", "GET", {
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

  const onSave = async (data) => {
    const name:any =document.getElementById("name").value;
    const icn:any=document.getElementById("icn").value;
    const password=icn.substr(0,4);
    const data1={name,icn,password};
    console.log(data1);
    setOpenModal(false);
    await execute("/member-register", "POST", data1,false);
    reLoad(params);
  };
  const onAdd = () => {
    setTitleModal("New Guest");
    setOpenModal(true);
  };

  const onEdit = (data) => {
    console.log(data);
    setTitleModal("Edit Guest");
    setOpenModal(true);
  };

  const onShow = (data) => {
    console.log(data);
    setTitleModal("View Guest");
    setOpenModal(true);
  };

  const onDelete = (data) => {
    setTitleModal("Delete Guest");
    console.log(data);
  };

  const onAction = (action, data) => {
    switch (action) {
      case "add":
        onAdd();
        break;
      case "edit":
        onEdit(data);
        break;
      case "show":
        onShow(data);
        break;
      case "delete":
        onDelete(data);
        break;
      default:
        break;
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
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

  const fieldsList = getFields(["name", "icn"]);

  useEffect(() => {
    const [fields, forms] = fieldsList;
    setFormState(forms);
    setFields(fields);
  }, []);

  return (
    <>
      <h1>Guest List</h1>
      <Card className="relative">
        {!loaded && <Spinner />}
        {loaded && (
          <>
            <Card>
              <div className="flex justify-between">
                <div className=""></div>
                <button
                  className="btn btn-primary flex-shrink w-fit"
                  onClick={onAdd}
                >
                  invite new Guest
                </button>
              </div>
            </Card>
            <DataTable
              datas={data.data}
              columns={columns}
              params={{ ...params, total: data.total }}
              onChangePage={onChangePage}
              onChangePerPage={onChangePerPage}
              onAction={onAction}
            />
          </>
        )}
      </Card>
      <DataModal
        open={openModal}
        title={titleModal}
        onClose={onCloseModal}
        onSave={onSave}
      >
        <DbForm fields={fields} />
      </DataModal>
    </>
  );
};

export default guestPage;
guestPage.auth = true;
