import { Checkbox, Pagination, Table } from "flowbite-react";
import { Edit, Trash } from "react-feather";
import Select from "./forms/Select";

const DataTable = ({
  datas,
  columns,
  params,
  onChangePage,
  onChangePerPage,
}) => {
  return (
    <>
      <Table hoverable={true} striped={true}>
        <Table.Head>
          <Table.HeadCell className="!p-4 w-12">
            <Checkbox />
          </Table.HeadCell>
          {Object.keys(columns).map((key) => (
            <Table.HeadCell key={`${key}-head`}>
              {columns[key].header}
            </Table.HeadCell>
          ))}
          <Table.HeadCell className="w-24">Actions</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {datas.map((row, index_row) => (
            <Table.Row
              key={row.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="!p-4">
                <Checkbox />
              </Table.Cell>
              {Object.keys(columns).map((key) => (
                <Table.Cell
                  key={`${key}-cell`}
                  className={columns[key].className}
                >
                  {columns[key].render
                    ? columns[key].render(row[key], row, key, index_row)
                    : row[key]}
                </Table.Cell>
              ))}
              <Table.Cell className="flex items-center gap-2">
                <a
                  href="/tables"
                  className="font-medium text-blue-600 hover:-translate-y-1 "
                >
                  <Edit size={18} />
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 hover:-translate-y-1"
                >
                  <Trash size={18} />
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex justify-between">
        <Pagination
          currentPage={params.page}
          onPageChange={onChangePage}
          showIcons={true}
          totalPages={Math.ceil(params.total / params.perPage)}
        />
        <Select
          name="perPage"
          value={params.perPage}
          onChange={(e) => onChangePerPage(e.target.value)}
          className="w-24"
          placeholder="Todos"
          options={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "30", label: "30" },
            { value: "40", label: "40" },
            { value: "50", label: "50" },
          ]}
        ></Select>
      </div>
    </>
  );
};

export default DataTable;
