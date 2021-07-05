import React from "react";
import { Table, Divider } from "antd";
import { SCHEMA } from "../data/const";
import moment from "moment";

export default function MyTable({
  data,
  onEdit,
  onDelete,
  onRowSelection,
  selectedRowKeys,
}) {
  const columns = Object.keys(SCHEMA).map((field) => ({
    title: SCHEMA[field].title,
    dataIndex: field,
    key: field,
  }));

  // custimize id column
  const idCol = columns.find((c) => c.key === "id");
  idCol.sorter = (a, b) => parseInt(a.id) - parseInt(b.id);

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
  dscrpCol.width = "15%";

  const actionField = {
    title: "選項",
    key: "action",
    render: (text, record) => (
      <span>
        <a onClick={() => onEdit(record.id)}>修改</a>
        <Divider type="vertical" />
        <a onClick={() => onDelete(record.id)}>刪除</a>
      </span>
    ),
  };

  columns.push(actionField);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onRowSelection(selectedRowKeys);
    },
    selectedRowKeys: selectedRowKeys,
  };

  return (
    <Table
      rowKey="id"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      pagination={{
        position: "top",
        showSizeChanger: true,
        pageSizeOptions: ["20", "50", "100", "200", "500"],
        defaultPageSize: 20,
        locale: { items_per_page: "筆/頁" },
      }}
    />
  );
}
