import React from "react";

import { Formik } from "formik";
import { INITIAL_VALUE, DEV_INITIAL_VALUE } from "../../data/const";
import { formatBeforeSaved } from "../../helper";
import MyFormWithModal from "./MyFormWithModal";

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
      initialValues={isEditMode ? values || INITIAL_VALUE : INITIAL_VALUE}
      validateOnBlur
      validate={(values) => {
        const errors = {};
        if (values.name.length < 5) {
          errors.name = "Name should have at least 5 charaters";
        }
        if (!values.country) {
          errors.country = "Please select a country";
        }
        if (!values.colors.length) {
          errors.colors = "Please choose at least one color";
        }
        if (!values.race) {
          errors.race = "Please select your race";
        }
        if (
          !values.dateTime.startDate ||
          !values.dateTime.endDate ||
          !values.dateTime.startTime ||
          !values.dateTime.endTime
        ) {
          errors.dateTime = "Please select the missing date/time ";
        }
        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        if (isEditMode) {
          onEdit(formatBeforeSaved(values));
        } else {
          onInsert(formatBeforeSaved(values));
        }
        setTimeout(() => resetForm({ values: INITIAL_VALUE }), 500);
        onCancel();
      }}
    >
      <MyFormWithModal
        visible={visible}
        onCancel={onCancel}
        isEditMode={isEditMode}
      />
    </Formik>
  );
}
