import React from "react";
import { Table, Tag, Col, Divider } from "antd";

export default function MyTable({ data, onEdit, onDelete }) {
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
          {colors.map((color) => (
            <Tag key={color}>{color}</Tag>
          ))}
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
          {foods.map((food) => (
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
        <span>
          <a onClick={onEdit}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => onDelete(record.key)}>Delete</a>
        </span>
      ),
    },
  ];

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <Col span={18} style={{ backgroundColor: "white" }}>
        <Table columns={columns} dataSource={data} />
      </Col>
    </div>
  );
}
