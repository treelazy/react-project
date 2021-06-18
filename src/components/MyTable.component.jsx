import React from "react";
import { Table, Tag, Col } from "antd";

const columns = [
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
  { title: "Date", key: "date", dataIndex: "date" },
  { title: "Range", key: "range", dataIndex: "range" },
  { title: "Time", key: "time", dataIndex: "time" },
];

export default function MyTable({ data }) {
  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <Col span={18} style={{ backgroundColor: "white"}}>
        <Table columns={columns} dataSource={data} />
      </Col>
    </div>
  );
}
