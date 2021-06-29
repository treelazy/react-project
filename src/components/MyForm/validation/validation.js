import * as Yup from "yup";

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
    .max(3000)
    .matches(/^.*$/, "此欄位不支援斷行"),
  // instruction: "",
  // max: { isEnabled: false, value: 0 },
  // colors: [],
  // start: { date: null, time: null },
  // end: { date: null, time: null },
  // gender: "",
});
