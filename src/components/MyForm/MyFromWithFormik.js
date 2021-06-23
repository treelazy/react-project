import React from "react";

import { Formik } from "formik";
import { INITIAL_VALUE } from "../../data/const";
import { formatBeforeSaved } from "../../helper";
import MyForm from "./MyForm";

export default function MyFormWithFormik(props) {
  return (
    <Formik
      initialValues={INITIAL_VALUE}
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
        props.onSubmit(formatBeforeSaved(values));
        props.onCancel();
        resetForm();
      }}
    >
      <MyForm visible={props.visible} onCancel={props.onCancel} />
    </Formik>
  );
}
