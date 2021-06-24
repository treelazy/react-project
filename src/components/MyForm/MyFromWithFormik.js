import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { INITIAL_VALUE } from "../../data/const";
import { formatBeforeSaved } from "../../helper";
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
      initialValues={isEditMode ? values || INITIAL_VALUE : INITIAL_VALUE}
      validateOnBlur
      validationSchema={yup.object({
        name: yup
          .string()
          .min(5, "Name should have at least 5 charaters")
          .required("Name should have at least 5 charaters"),
        country: yup.string().required("Please select a country"),
        colors: yup.array().min(1, "Please choose at least one color"),
        race: yup.string().required("Please select your race"),
        dateTime: yup
          .object({})
          .test(
            "startDate",
            "Please select start date",
            (dateTime) => !!dateTime.startDate
          )
          .test(
            "startTime",
            "Please select start time",
            (dateTime) => !!dateTime.startTime
          )
          .test(
            "endDate",
            "Please select end date",
            (dateTime) => !!dateTime.endDate
          )
          .test(
            "endTime",
            "Please select end time",
            (dateTime) => !!dateTime.endTime
          ),
      })}
      onSubmit={(values, { resetForm }) => {
        if (isEditMode) {
          onEdit(formatBeforeSaved(values));
        } else {
          onInsert(formatBeforeSaved(values));
        }
        // delay the data update to avoid showing unfriendly data to user
        setTimeout(() => resetForm({ values: INITIAL_VALUE }), 500);
        onCancel();
      }}
    >
      <MyForm visible={visible} onCancel={onCancel} isEditMode={isEditMode} />
    </Formik>
  );
}
