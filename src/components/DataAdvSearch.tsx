import { useState } from "react";
import t from "../utils/traductor";
import DataModal from "./DataModal";

const DataAdvSearch = ({ campos, setAdvSearch }) => {
  const [openSeacrh, setOpenSeacrh] = useState(false);

  const openSearch = () => {
    setOpenSeacrh(!openSeacrh);
  };

  const onCloseModal = () => {
    setOpenSeacrh(false);
  };

  const onSave = () => {
    setOpenSeacrh(false);
  };
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
        onClick={() => openSearch()}
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
        open={openSeacrh}
        title={t("Advanced Search")}
        onClose={onCloseModal}
        onSave={onSave}
        buttonText={t("Search")}
      >
        <div className="flex flex-col w-full">
          <div className="flex gap-1">
            <select className="w-full mt-1 p-2 text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all ease-in-out ">
              <option value="" disabled selected hidden>
                {t("Field")}
              </option>
              {camposList.map((key, index) => (
                <option key={index} value={key}>
                  {campos[key].label}
                </option>
              ))}
            </select>
            <select className="w-full mt-1 p-2 text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all ease-in-out ">
              <option value="" disabled selected hidden>
                {t("Criteria")}
              </option>
              {lCriterios.map((crit, index) => (
                <option key={index} value={crit.value}>
                  {crit.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="w-full mt-1 p-2 text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all ease-in-out "
            />
          </div>
        </div>
      </DataModal>
    </div>
  );
};

export default DataAdvSearch;
