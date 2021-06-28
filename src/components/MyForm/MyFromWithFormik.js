import React from "react";
import { Formik } from "formik";
import { INITIAL_VALUE, DELAY_TIME } from "../../data/const";
import { formatBeforeSaved } from "../../helper";
import validation from "./validation";
import MyForm from "./MyForm";

export default function MyFormWithFormik({
  values,
  onCancel,
  visible,
  isEditMode,
  onInsert,
  onEdit,
  ...props
}) {
  return (
    <Formik
      enableReinitialize
      initialValues={isEditMode ? values : INITIAL_VALUE}
      validateOnBlur
      validationSchema={validation}
      onSubmit={(values, { resetForm }) => {
        if (isEditMode) {
          onEdit(formatBeforeSaved(values));
        } else {
          onInsert(formatBeforeSaved(values));
        }
        // delay the data update to avoid showing unfriendly data to user
        setTimeout(() => resetForm({ values: INITIAL_VALUE }), DELAY_TIME);
        onCancel();
      }}
    >
      <MyForm visible={visible} onCancel={onCancel} isEditMode={isEditMode} />
    </Formik>
  );
}
