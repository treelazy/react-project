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

const INITIAL_VALUE = {
  id: "",
  orgName: "",
  weight: 0,
  description: "",
  instruction: "",
  max: { isActive: false, value: "" },
  colors: [],
  start: { date: null, time: null },
  end: { date: null, time: null },
  gender: "",
};

// this is used for developing/testing
const DEV_INITIAL_VALUE = INITIAL_VALUE;

export { COLORS, GENDERS, INITIAL_VALUE, DEV_INITIAL_VALUE, DELAY_TIME };
