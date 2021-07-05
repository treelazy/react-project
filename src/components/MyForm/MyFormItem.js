import React from "react";
import { Form } from "antd";
import { useField } from "formik";

export default function MyFormItem({ name, type, children, ...props }) {
  if (!name) {
    console.error("`name` is required for <MyFormItem/>");
  }
  const [field, meta, helpers] = useField(name);

  // in order to make {...field} work for different ant design components
  if (type === "switch") {
    field.checked = field.value;
    delete field.value;
  }
  if (type === "number") {
    field.onChange = (value) => helpers.setValue(value);
  }
  if (type === "select") {
    field.onChange = (value) => helpers.setValue(value);
    field.onBlur = () => helpers.setTouched(true);
  }
  if (type === "date" || type === "time") {
    field.onChange = (value) => {
      helpers.setValue(value, false);
    };
    field.onBlur = () => setTimeout(() => helpers.setTouched(true));
  }

  return (
    <Form.Item
      validateStatus={meta.touched && meta.error ? "error" : ""}
      help={(meta.touched && meta.error) ?? ""}
      {...props}
    >
      {typeof children === "function"
        ? children({ field, meta, helpers })
        : children}
    </Form.Item>
  );
}
