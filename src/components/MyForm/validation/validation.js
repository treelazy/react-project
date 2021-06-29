import * as Yup from "yup";
import { isCharFullwidth } from "../../../helper";

export default Yup.object({
  // \u4e00-\u9fff: CJK Unified Ideographs
  // \u3400-\u4dbf: CJK Unified Ideographs Extension A
  // \u{20000}-\u{2A6DF}: CJK Unified Ideographs Extension B
  // \u{2A700}-\u{2B73F}: CJK Unified Ideographs Extension C
  // \u{2B740}–\u{2B81F}: CJK Unified Ideographs Extension D
  // \u{2B820}–\u{2CEAF}: CJK Unified Ideographs Extension E
  // \u3105-\u3129: unicodes of Bopofomo
  id: Yup.string()
    .required("此欄位必填")
    .matches(/^[^\s]*$/, "此欄位不支援空白")
    .max(10, "請輸入1-10個中文，半形英文及數字")
    .matches(
      /^[a-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]*$/u,
      "請輸入中文，半形英文及數字"
    ),
  // \uff10-\uff19: fullwidth number(０-９)
  // \uff41-\uff5a: fullwidth lowercase letters(ａ-ｚ)
  // \uff21-\uff3a: fullwidth uppercase letters(Ａ-Ｚ)
  orgName: Yup.string()
    .max(30, "請輸入1-30個中文、全形半形英文/數字")
    .matches(
      /^[\s\uff10-\uff19\uff41-\uff5a\uff21-\uff3aa-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]*$/u,
      "請輸入中文、全形半形英文/數字"
    ),
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
      let withoutChinese =
        value?.replace(
          /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]/gu,
          ""
        ) || "";
      return [...withoutChinese].every((char) => !isCharFullwidth(char));
    }),
  max: Yup.object({
    isActive: Yup.bool(),
    value: Yup.string().when("isActive", {
      is: true,
      then: Yup.string()
        .required("此欄位必填")
        .matches(/^[^\s]*$/, "此欄位不支援空白")
        .matches(/^[1-9][0-9]{0,9}$/, "請輸入10位半形數字"),
    }),
  }),
  colors: Yup.array().min(1, "此欄位必須選擇一個"),
  start: Yup.object({
    date: Yup.date().required(),
    time: Yup.date().required(),
  }),
  end: Yup.object({
    date: Yup.date().required(),
    time: Yup.date().required(),
  }),
  // gender: "",
});
