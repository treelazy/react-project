import * as yup from "yup";

export default yup.object({
  name: yup
    .string()
    .min(5, "Name should have at least 5 charaters")
    .required("Name should have at least 5 charaters"),
  country: yup.string().required("Please select a country"),
  colors: yup.array().min(1, "Please choose at least one color"),
  race: yup.string().required("Please select your race"),
  dateTime: yup.object({
    startDate: yup.date().nullable().required("Select a start date"),
    startTime: yup.date().nullable().required("Select a start time"),
    endDate: yup.date().nullable().required("Select an end date"),
    endTime: yup.date().nullable().required("Select an end time"),
  }),
});
