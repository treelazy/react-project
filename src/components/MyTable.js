import React from "react";
import { Table, Divider } from "antd";
import { SCHEMA } from "../data/const";

export default function MyTable({ data, onEdit, onDelete }) {
  const columns = generateColumns(onEdit, onDelete);
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={{
        position: "top",
        showSizeChanger: true,
        pageSizeOptions: ["20", "50", "100", "200", "500"],
        defaultPageSize: 20,
        locale: { items_per_page: "筆/頁" },
      }}
      scroll={{ x: 1400 }}
    />
  );
}

function generateColumns(onEdit, onDelete) {
  const columns = Object.keys(SCHEMA).map((field) => ({
    title: SCHEMA[field].title,
    dataIndex: field,
    key: field,
  }));

  // custimize tag column
  const tagCol = columns.find((c) => c.key === "tag");
  tagCol.sorter = (a, b) => parseInt(a.tag) - parseInt(b.tag);
  tagCol.fixed = "left";
  tagCol.width = "5rem";

  // custimize start column
  const startCol = columns.find((c) => c.key === "start");
  startCol.sorter = (a, b) => new Date(a.start) - new Date(b.start);

  // custimize end column
  const endCol = columns.find((c) => c.key === "end");
  endCol.sorter = (a, b) => new Date(a.end) - new Date(b.end);

  // custimize price column
  const priceCol = columns.find((c) => c.key === "price");
  priceCol.sorter = (a, b) => new Date(a.price) - new Date(b.price);

  // custimize description column
  const dscrpCol = columns.find((c) => c.key === "description");
  dscrpCol.ellipsis = true;

  const actionCol = {
    title: "選項",
    key: "action",
    fixed: "right",
    render: (text, record) => (
      <span>
        <a onClick={() => onEdit(record.id)}>修改</a>
        <Divider type="vertical" />
        <a onClick={() => onDelete(record.id)}>刪除</a>
      </span>
    ),
  };

  columns.push(actionCol);

  return columns;
}
