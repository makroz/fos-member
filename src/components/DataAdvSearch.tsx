import { useEffect, useState } from "react";
import { Plus, PlusCircle, Trash, Trash2 } from "react-feather";
import t from "../utils/traductor";
import DataModal from "./DataModal";

const initialValues = {
  field: "",
  criteria: "",
  search: "",
  join: "",
  gb: "",
  ge: "",
};

const DataAdvSearch = ({ campos, setAdvSearch }) => {
  const [openSearch, setOpenSearch] = useState(false);

  const [search, setSearch]: any = useState([initialValues]);
  const onChange = (e, i) => {
    const { name, value } = e.target;
    let sSearch = [...search];
    sSearch[i] = { ...search[i], [name]: value };
    setSearch(sSearch);
  };

  const addSearch = () => {
    const sSearch = [...search];
    sSearch.push(initialValues);
    setSearch(sSearch);
  };

  const delSearch = (i) => {
    const sSearch = [...search];
    sSearch.splice(i, 1);
    setSearch(sSearch);
  };

  const open = () => {
    setOpenSearch(!openSearch);
  };

  const onCloseModal = () => {
    setOpenSearch(false);
  };

  const onSave = () => {
    setOpenSearch(false);
  };

  useEffect(() => {
    console.log("search", search);
  }, [search]);

  //campos={'-1':{search:true,label:t('Field')}}
  const camposList: any = [];
  Object.keys(campos).map((key) => {
    if (campos[key].search) camposList.push(key);
  });

  const lCriterios = [
    { value: "eq", label: t("Equal") },
    { value: "neq", label: t("Not Equal") },
    { value: "gt", label: t("Greater Than") },
    { value: "gte", label: t("Greater Than or Equal") },
    { value: "lt", label: t("Less Than") },
    { value: "lte", label: t("Less Than or Equal") },
  ];
  const lCriteriosSelect = [
    { value: "eq", label: t("Equal") },
    { value: "neq", label: t("Not Equal") },
  ];
  const lCriteriosAlfa = [
    { value: "eq", label: t("Equal") },
    { value: "neq", label: t("Not Equal") },
    { value: "gt", label: t("Greater Than") },
    { value: "gte", label: t("Greater Than or Equal") },
    { value: "lt", label: t("Less Than") },
    { value: "lte", label: t("Less Than or Equal") },
    { value: "startswith", label: t("Starts With") },
    { value: "endswith", label: t("Ends With") },
    { value: "contains", label: t("Contains") },
    { value: "doesnotcontain", label: t("Does Not Contain") },
  ];

  return (
    <div>
      <button
        className={
          "bg-white border-white p-1 text-sm font-medium  rounded-lg border hover:bg-primary hover:text-secondary   focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all ease-in-out"
        }
        onClick={() => open()}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
      <DataModal
        open={openSearch}
        title={t("Advanced Search")}
        onClose={onCloseModal}
        onSave={onSave}
        buttonText={t("Search")}
      >
        <div className="flex flex-col w-full">
          {search.map((s, i) => (
            <div
              key={"fileds-" + i}
              className="flex flex-wrap gap-0 border-b mt-2"
            >
              <div className="w-1/2 px-0.5">
                <select
                  name="field"
                  value={s.field}
                  onChange={(e) => onChange(e, i)}
                  className="w-full my-1 p-1 text-xs rounded-lg  border border-gray-300  focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    {t("Field")}
                  </option>
                  {camposList.map((key, index) => (
                    <option key={index} value={key}>
                      {campos[key].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 px-0.5">
                <select
                  name="criteria"
                  value={s.criteria}
                  onChange={(e) => onChange(e, i)}
                  className="w-full my-1 p-1 text-xs rounded-lg  border border-gray-300  focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    {t("Criteria")}
                  </option>
                  {lCriterios.map((crit, index) => (
                    <option key={index} value={crit.value}>
                      {crit.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-grow px-0.5">
                <input
                  name="search"
                  value={s.search}
                  onChange={(e) => onChange(e, i)}
                  type="text"
                  className="w-full my-1 p-1 text-xs rounded-lg  border border-gray-300  focus:border-blue-500"
                />
              </div>
              <div className="flex self-center gap-1 w-[90px] px-0.5 justify-between">
                <div className="">
                  {search.length - 1 !== i && (
                    <select
                      name="join"
                      value={s.join}
                      onChange={(e) => onChange(e, i)}
                      className=" my-1 p-1 text-xs rounded-lg  border border-gray-300  focus:border-blue-500"
                    >
                      <option
                        value=""
                        disabled
                        hidden
                        className="text-[6px]"
                      ></option>
                      <option value="a">{t("and")}</option>
                      <option value="o">{t("or")}</option>
                    </select>
                  )}
                </div>
                <div className="flex gap-1 self-center">
                  {search.length - 1 === i && (
                    <Plus
                      className="p-1 rounded-full bg-green-600 text-white w-6 h-6  hover:bg-green-400 transition-all"
                      onClick={() => addSearch()}
                    />
                  )}
                  {i > 0 && (
                    <Trash2
                      className="p-1 rounded-full bg-red-800 text-white w-6 h-6  hover:bg-red-400 transition-all"
                      onClick={() => delSearch(i)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataModal>
    </div>
  );
};

export default DataAdvSearch;
