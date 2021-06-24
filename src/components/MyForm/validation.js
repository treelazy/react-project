import * as yup from "yup";

export default yup.object({
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
    .test("endDate", "Please select end date", (dateTime) => !!dateTime.endDate)
    .test(
      "endTime",
      "Please select end time",
      (dateTime) => !!dateTime.endTime
    ),
});
