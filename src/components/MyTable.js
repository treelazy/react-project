import React from "react";
import { Table, Divider } from "antd";
import { SCHEMA } from "../data/const";

export default function MyTable({
  data,
  onEdit,
  onDelete,
  isLastOne,
  onRowSelection,
  selectedRowKeys,
}) {
  const columns = Object.keys(SCHEMA).map((field) => ({
    title: SCHEMA[field].title,
    dataIndex: field,
    key: field,
  }));

  const dscrpCol = columns.find((c) => c.key === "description");
  dscrpCol.ellipsis = true;
  dscrpCol.width = "15%";

  const actionField = {
    title: "選項",
    key: "action",
    render: (text, record) => (
      <span>
        <a onClick={() => onEdit(record.id)}>修改</a>
        {
          // hide the delete option when there's only one record left
          !isLastOne && (
            <>
              <Divider type="vertical" />
              <a onClick={() => onDelete(record.id)}>刪除</a>
            </>
          )
        }
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
