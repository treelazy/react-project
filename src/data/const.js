import moment from "moment";
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

const RANDOM_CHARS = [
  "零",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
];

// _devVal is fake data, only for demo usage
const SCHEMA = {
  tag: {
    type: "string",
    title: "編號",
    initVal: "",
    _devVal: "",
  },
  orgName: {
    type: "string",
    title: "組織名稱",
    initVal: "",
    _devVal: "00001",
  },
  weight: { type: "number", title: "重量", initVal: 0, _devVal: 12345 },
  description: {
    type: "string",
    title: "描述",
    initVal: "",
    _devVal: `或紅黃候語浪汁蝶古找助怪流瓜禾京，消清休三秋行新神條米皮衣快兩勿文，樹晚肉干動火斗車呢百交說下，吹也鴨婆彩大民示院。向意麻活彩足節兆抄汁春自太神申黑口果木？枝急連土申穿元穿抓。就蝶前斥到經娘己往爬王走美玩。棵頭大里功科禾足蛋們貝二。國也青發想春他冒耳半，長尤音找肖共往回旦海蝴忍紅從訴早，停刃高几由毛身次發，甲長功別足都有呀午支圓春。誰同面兔月巾旁南次奶打蝸室里書哥：一鼻他牙游夕想波。因友禾要是書。`,
  },
  instruction: {
    type: "string",
    title: "使用方式",
    initVal: "",
    _devVal: "測試用使用方式資料",
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
  gender: { title: "性別", initVal: "M", _devVal: "M" },
  price: { title: "價格", type: "number", initVal: 0, _devVal: 5500 },
};

// initial value for formik
const INITIAL_VALUE = Object.keys(SCHEMA).reduce((acc, key) => {
  acc[key] = SCHEMA[key].initVal;
  return acc;
}, {});

// this is fake data, used for developing/testing only
const DEV_INITIAL_VALUE = Object.keys(SCHEMA).reduce((acc, key) => {
  acc[key] = SCHEMA[key]._devVal;
  return acc;
}, {});

export {
  COLORS,
  GENDERS,
  RANDOM_CHARS,
  INITIAL_VALUE,
  DEV_INITIAL_VALUE,
  DELAY_TIME,
  SCHEMA,
};
