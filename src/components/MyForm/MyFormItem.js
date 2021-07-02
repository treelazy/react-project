import React from "react";
import { Form } from "antd";
import { useField } from "formik";

export default function MyFormItem({ name, children, ...props }) {
  if (!name) {
    throw new Error("name is required for MyFormItem");
  }
  const [field, meta, helpers] = useField(name);

  return (
    <Form.Item
      validateStatus={meta.touched && meta.error && "error"}
      help={meta.touched && meta.error}
      {...props}
    >
      {typeof children === "function"
        ? children({ field, meta, helpers })
        : children}
    </Form.Item>
  );
}
