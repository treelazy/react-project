import * as Yup from "yup";
import { isCharFullwidth } from "../../../helper";
import { regexForTag, regexForOrgName, regexForAnyChinese } from "./helper";

export default Yup.object({
  tag: Yup.string()
    .required("此欄位必填")
    .matches(/^[^\s]*$/, "此欄位不支援空白")
    .max(10, "請輸入1-10個中文，半形英文及數字")
    .matches(regexForTag(), "請輸入中文，半形英文及數字"),

  orgName: Yup.string()
    .max(30, "請輸入1-30個中文、全形半形英文/數字")
    .matches(regexForOrgName(), "請輸入中文、全形半形英文/數字"),
  weight: Yup.number()
    .typeError("請輸入半形數字 0~9999999.99/小數點後限2位")
    .test("weight", "請輸入半形數字 0~9999999.99/小數點後限2位", (value) =>
      value.toString().match(/^\d{0,7}(\.\d{1,2})?$/)
    ),
  description: Yup.string()
    .required("此欄位必填")
    .max(3000, "請輸入1-3000個字")
    .matches(/^.*$/, "此欄位不支援斷行"),
  instruction: Yup.string()
    .matches(/^[^\s]*$/, "此欄位不支援空白")
    .max(15, "請輸入1-15個中文、半形英文/數字/特殊符號")
    .test("instruction", "請輸入中文、半形英文/數字/特殊符號", (value) => {
      // remove chinise characters, and then check whether there's still any fullwidth char left
      let withoutChinese = value?.replace(regexForAnyChinese(), "") || "";
      return [...withoutChinese].every((char) => !isCharFullwidth(char));
    }),
  max: Yup.object({
    isActive: Yup.bool(),
    value: Yup.string().when("isActive", {
      is: true,
      then: Yup.string()
        .required("此欄位必填")
        .matches(/^[^\s]*$/, "此欄位不支援空白")
        // the number is not allowed to start with 0, unless the whole number itself is just a single 0
        // 這串數字不能是0開頭，除非這整串數字剛好就是單獨一個0
        .matches(/(^[1-9][0-9]{0,9}$)|(^0$)/, "請輸入10位半形數字"),
    }),
  }),
  // start: Yup.object({
  //   date: Yup.date().test(
  //     "start date",
  //     "必須小於結束日期",
  //     (startDate, context) => {
  //       const root = context?.from?.[1];
  //       const { date: endDate, time: endTime } = root?.value?.end;
  //       // if end date/time is empty, skip the validation
  //       if (endDate == null || endTime == null) {
  //         return true;
  //       }
  //       if (startDate > endDate) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     }
  //   ),
  //   time: Yup.date().test(
  //     "start time",
  //     "必須小於結束時間",
  //     (startTime, context) => {
  //       const root = context?.from?.[1];
  //       const { date: endDate, time: endTime } = root?.value?.end;
  //       const { date: startDate } = context?.parent;
  //       // if either of startDate, enDate, or endTime is empty, skip the validation
  //       console.log(startDate, endDate, startTime, endTime);
  //       if (startDate == null || endDate == null || endTime == null) {
  //         return true;
  //       }
  //       if (startDate.isSame(endDate, "day") && startTime > endTime) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     }
  //   ),
  // }),
  // end: Yup.object({
  //   date: Yup.date().required(),
  //   time: Yup.date().required(),
  // }),
  colors: Yup.array().min(1, "此欄位必須選擇一個"),
  gender: Yup.string().required("此欄位必填"),
});
