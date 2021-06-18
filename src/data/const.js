
const COUNTRIES = [
  { key:0, name: "China", value: "china" },
  { key:1, name: "U.S.A", value: "usa" },
];
const COLORS = [
  { key:0, name: "Red", value: "red" },
  { key:1, name: "Green", value: "green" },
  { key:2, name: "Blue", value: "blue" },
];
const RACES = [
  { key:0,name: "Asian", value: "asian" },
  { key:1, name: "African", value: "african" },
  { key:2, name: "Caucasian", value: "caucasian" },
];
const FOODS = [
  { key:0, name: "Rice", value: "rice" },
  { key:1, name: "Noodle", value: "noodle" },
  { key:2, name: "Meat", value: "meat" },
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
};

export {COUNTRIES, COLORS, RACES, FOODS, INITIAL_VALUE};