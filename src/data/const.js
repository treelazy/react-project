import moment from "moment";

const DELAY_TIME = 500;

const COUNTRIES = [
  { key: 0, name: "China", value: "china" },
  { key: 1, name: "U.S.A", value: "usa" },
];
const COLORS = [
  { key: 0, name: "Red", value: "red" },
  { key: 1, name: "Green", value: "green" },
  { key: 2, name: "Blue", value: "blue" },
];
const RACES = [
  { key: 0, name: "Asian", value: "asian" },
  { key: 1, name: "African", value: "african" },
  { key: 2, name: "Caucasian", value: "caucasian" },
];
const FOODS = [
  { key: 0, name: "Rice", value: "rice" },
  { key: 1, name: "Noodle", value: "noodle" },
  { key: 2, name: "Meat", value: "meat" },
];

const INITIAL_VALUE = {
  id: "",
  orgName: "",
  weight: 0,
  description: "",
  instruction: "",
  max: { isEnabled: false, value: 0 },
  colors: [],
  start: { date: null, time: null },
  end: { date: null, time: null },
  gender: "",
};

// this is used for developing/testing
const DEV_INITIAL_VALUE = INITIAL_VALUE;

export {
  COUNTRIES,
  COLORS,
  RACES,
  FOODS,
  INITIAL_VALUE,
  DEV_INITIAL_VALUE,
  DELAY_TIME,
};
