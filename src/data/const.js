const DELAY_TIME = 500;

const COLORS = [
  { key: 0, name: "紅色", value: "red" },
  { key: 1, name: "綠色", value: "green" },
  { key: 2, name: "藍色", value: "blue" },
];

const GENDERS = [
  { key: 0, name: "男性", value: "M" },
  { key: 1, name: "女性", value: "F" },
];

const SCHEMA = {
  id: { title: "key", initVal: null },
  tag: { title: "編號", initVal: "" },
  orgName: { title: "組織名稱", initVal: "" },
  weight: { title: "重量", initVal: 0 },
  description: { title: "描述", initVal: "" },
  instruction: { title: "使用方式", initVal: "" },
  max: { title: "上限", initVal: { isActive: false, value: "" } },
  colors: { title: "顏色", initVal: [] },
  start: { title: "開始時間", initVal: { date: null, time: null } },
  end: { title: "結束時間", initVal: { date: null, time: null } },
  gender: { title: "性別", initVal: "" },
};

// initial value for formik
const INITIAL_VALUE = Object.keys(SCHEMA).reduce((acc, key) => {
  acc[key] = SCHEMA[key].initVal;
  return acc;
}, {});

// this is used for developing/testing
const DEV_INITIAL_VALUE = INITIAL_VALUE;

export {
  COLORS,
  GENDERS,
  INITIAL_VALUE,
  DEV_INITIAL_VALUE,
  DELAY_TIME,
  SCHEMA,
};
