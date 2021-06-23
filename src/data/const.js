import moment from "moment";

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
  name: "",
  country: "",
  colors: [],
  race: "",
  isSwitched: false,
  foods: [],
  date: null,
  range: [],
  time: null,
  dateTime: { startDate: null, endDate: null, startTime: null, endTime: null },
};

// this is used for developing/testing
const DEV_INITIAL_VALUE = {
  name: "henry",
  country: "usa",
  colors: ["red", "blue"],
  race: "african",
  isSwitched: false,
  foods: ["rice", "meat"],
  dateTime: {
    startDate: moment(),
    endDate: moment(),
    startTime: moment(),
    endTime: moment(),
  },
};

export { COUNTRIES, COLORS, RACES, FOODS, INITIAL_VALUE, DEV_INITIAL_VALUE };
