import moment from "moment";
import { longStr } from "./dummy";
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

// _devVal is for demo usage
const SCHEMA = {
  id: { type: "string", title: "流水號", initVal: null, _devVal: null },
  tag: { type: "string", title: "編號", initVal: "", _devVal: "苦艾酒" },
  orgName: {
    type: "string",
    title: "組織名稱",
    initVal: "",
    _devVal: "黑衣組織",
  },
  weight: { type: "number", title: "重量", initVal: 0, _devVal: 55688 },
  description: {
    type: "string",
    title: "描述",
    initVal: "",
    _devVal: longStr,
  },
  instruction: {
    type: "string",
    title: "使用方式",
    initVal: "",
    _devVal: "外表看似小孩內心卻過於常人",
  },
  max: {
    type: "string",
    title: "上限",
    initVal: { isActive: false, value: "" },
    _devVal: { isActive: true, value: "2218" },
  },
  colors: { title: "顏色", initVal: [], _devVal: ["blue"] },
  start: {
    title: "開始時間",
    initVal: null,
    _devVal: moment(),
  },
  end: {
    title: "結束時間",
    initVal: null,
    _devVal: moment().add(1, "hours"),
  },
  gender: { title: "性別", initVal: "", _devVal: "M" },
};

// initial value for formik
const INITIAL_VALUE = Object.keys(SCHEMA).reduce((acc, key) => {
  acc[key] = SCHEMA[key].initVal;
  return acc;
}, {});

// this is used for developing/testing only
const DEV_INITIAL_VALUE = Object.keys(SCHEMA).reduce((acc, key) => {
  acc[key] = SCHEMA[key]._devVal;
  return acc;
}, {});

export {
  COLORS,
  GENDERS,
  INITIAL_VALUE,
  DEV_INITIAL_VALUE,
  DELAY_TIME,
  SCHEMA,
};
