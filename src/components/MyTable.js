import React from "react";
import { Table, Tag, Divider } from "antd";

export default function MyTable({
  data,
  onEdit,
  onDelete,
  isLastOne,
  onRowSelection,
  selectedRowKeys,
}) {
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (colors) => (
        <span>
          {colors?.map((color) => {
            let styleColor = "";
            if (color === "red") {
              styleColor = "volcano";
            } else if (color === "blue") {
              styleColor = "geekblue";
            } else if (color === "green") {
              styleColor = "green";
            }
            return (
              <Tag key={color} color={styleColor}>
                {color}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Race",
      key: "race",
      dataIndex: "race",
    },
    {
      title: "Switch",
      key: "isSwitched",
      dataIndex: "isSwitched",
      render: (bool) => <span>{bool.toString()}</span>,
    },
    {
      title: "Food",
      key: "foods",
      dataIndex: "foods",
      render: (foods) => (
        <span>
          {foods?.map((food) => (
            <Tag key={food}>{food}</Tag>
          ))}
        </span>
      ),
    },
    { title: "Start", key: "start", dataIndex: "start" },
    { title: "End", key: "end", dataIndex: "end" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        // when there's only one record left, hide the delete option
        <span>
          <a onClick={() => onEdit(record.key)}>Edit</a>
          {isLastOne ? (
            ""
          ) : (
            <>
              <Divider type="vertical" />
              <a onClick={() => onDelete(record.key)}>Delete</a>
            </>
          )}
        </span>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onRowSelection(selectedRowKeys);
    },
    selectedRowKeys: selectedRowKeys,
  };

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
}
