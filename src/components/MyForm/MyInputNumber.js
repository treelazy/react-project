import React from "react";
import { InputNumber } from "antd";

export default function MyInputNumber({ addonAfter, ...props }) {
  return (
    <>
      <InputNumber type="number" {...props} />
      <div
        className="ant-input-group-addon"
        style={{
          paddingTop: "2px",
          verticalAlign: "middle",
          display: "inline-table",
          lineHeight: "24px",
          height: "32px",
          position: "relative",
          top: "-2px",
        }}
      >
        {addonAfter}
      </div>
    </>
  );
}
