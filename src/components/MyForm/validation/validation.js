import * as Yup from "yup";
import { isCharFullwidth } from "../../../helper";
import rgx from "./helper";

export default Yup.object().shape(
  {
    tag: Yup.string()
      .required("此欄位必填")
      .matches(rgx.noSpace(), "此欄位不支援空白")
      .max(10, "請輸入1-10個中文，半形英文及數字")
      .matches(rgx.forTag(), "請輸入中文，半形英文及數字"),
    orgName: Yup.string()
      .max(30, "請輸入1-30個中文、全形半形英文/數字")
      .matches(rgx.forOrgName(), "請輸入中文、全形半形英文/數字"),
    weight: Yup.number()
      .nullable(true)
      .test("weight", "請輸入半形數字 0~9999999.99/小數點後限2位", (value) => {
        if (value == null) {
          return true;
        }
        return value.toString().match(rgx.forWeight());
      }),
    description: Yup.string()
      .required("此欄位必填")
      .matches(rgx.noNewline(), "此欄位不支援斷行")
      .test("description", "請輸入1-3000個字", (value) => {
        const chineseChars = value?.match(rgx.findAnyChinese()) || "";
        const otherChars = value?.replace(rgx.findAnyChinese(), "") || "";
        // a chinese char count as 3
        return chineseChars.length * 3 + otherChars.length <= 3000;
      }),
    instruction: Yup.string()
      .matches(rgx.noSpace(), "此欄位不支援空白")
      .max(15, "請輸入1-15個中文、半形英文/數字/特殊符號")
      .test("instruction", "請輸入中文、半形英文/數字/特殊符號", (value) => {
        // remove chinise characters, and then check whether there's still any fullwidth char left
        let withoutChinese = value?.replace(rgx.findAnyChinese(), "") || "";
        return [...withoutChinese].every((char) => !isCharFullwidth(char));
      }),
    max: Yup.object({
      isActive: Yup.bool(),
      value: Yup.string().when("isActive", {
        is: true,
        then: Yup.string()
          .required("此欄位必填")
          .matches(rgx.noSpace(), "此欄位不支援空白")
          .max(10, "請輸入10位半形數字")
          // the number is not allowed to start with 0, unless the whole number itself is just a single 0
          // 這串數字不能是0開頭，除非這整串數字剛好就是單獨一個0
          .matches(rgx.positiveInts(), "請輸入10位半形數字"),
      }),
    }),
    start: Yup.date()
      .nullable(true)
      .when("end", {
        is: (val) => val !== null,
        then: Yup.date()
          .nullable(true)
          .test("開始時間", "必須小於結束時間", (start, context) => {
            const end = context?.parent?.end;
            return start && start < end;
          }),
      }),
    end: Yup.date()
      .nullable(true)
      .when("start", {
        is: (val) => val !== null,
        then: Yup.date()
          .nullable(true)
          .test("結束時間", "必須大於開始時間", (end, context) => {
            const start = context?.parent?.start;
            return end && end > start;
          }),
      }),
    colors: Yup.array().min(1, "此欄位必須選擇一個"),
    gender: Yup.string().required("此欄位必填"),
  },
  // the purpose of supplying this array is to fix cyclic dependency
  // https://github.com/jquense/yup/issues/79#issuecomment-699605408
  ["start", "end"]
);
