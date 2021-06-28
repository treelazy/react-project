import * as Yup from "yup";

export default Yup.object({
  // \u4e00-\u9fff are the unicodes of common chinese charaters: https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_(Unicode_block)
  // \u3105-\u3129 are the unicodes of Bopofomo
  id: Yup.string()
    .required("此欄位必填")
    .matches(/^[^\s]*$/, "此欄位不支援空白")
    .max(10, "請輸入1-10個中文，半形英文及數字")
    .matches(
      /^[a-zA-Z0-9\u4e00-\u9fff\u3105-\u3129]*$/,
      "請輸入中文，半形英文及數字"
    ),

  // orgName: "",
  // weight: 0,
  // description: "",
  // instruction: "",
  // max: { isEnabled: false, value: 0 },
  // colors: [],
  // start: { date: null, time: null },
  // end: { date: null, time: null },
  // gender: "",
});
