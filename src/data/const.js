
const COUNTRIES = [
  { name: "China", value: "china" },
  { name: "U.S.A", value: "usa" },
];
const COLORS = [
  { name: "Red", value: "red" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
];
const RACES = [
  { name: "Asian", value: "asian" },
  { name: "African", value: "african" },
  { name: "Caucasian", value: "caucasian" },
];
const FOODS = [
  { name: "Rice", value: "rice" },
  { name: "Noodle", value: "noodle" },
  { name: "Meat", value: "meat" },
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