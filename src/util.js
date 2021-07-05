import { notification } from "antd";
import moment from "moment";
import { DELAY_TIME, DEV_INITIAL_VALUE } from "./data/const";
import isFullwidthCodePoint from "is-fullwidth-code-point";

const openNotification = (type, title, message, delay) => {
  delay = delay || DELAY_TIME;
  setTimeout(
    () =>
      notification[type]({
        duration: 3,
        message: title,
        description: message,
      }),
    delay
  );
};

// map form data to table data
const _mapToTable = {
  start(fStart) {
    return fStart?.format("YYYY-MM-DD HH:mm:ss");
  },
  end(fEnd) {
    return fEnd?.format("YYYY-MM-DD HH:mm:ss");
  },
  max(fMax) {
    return fMax.isActive ? fMax.value : null;
  },
  color(fColor) {
    let tColor = "";
    if (fColor === "red") {
      tColor = "紅色";
    } else if (fColor === "green") {
      tColor = "綠色";
    } else if (fColor === "blue") {
      tColor = "藍色";
    }
    return tColor;
  },
  gender(fGender) {
    return fGender === "M" ? "男性" : "女性";
  },
};

// map table data to form data
const _mapToForm = {
  start(tStart) {
    return tStart == null ? null : moment(tStart);
  },
  end(tEnd) {
    return tEnd == null ? null : moment(tEnd);
  },
  max(tMax) {
    const fMax = {};
    if (tMax == null || tMax === "") {
      fMax.isActive = false;
      fMax.value = "";
    } else {
      fMax.isActive = true;
      fMax.value = tMax;
    }
    return fMax;
  },
  color(tColor) {
    let fColor = "";
    if (tColor === "紅色") {
      fColor = "red";
    } else if (tColor === "綠色") {
      fColor = "green";
    } else if (tColor === "藍色") {
      fColor = "blue";
    }
    return fColor;
  },
  gender(tGender) {
    return tGender === "男性" ? "M" : "F";
  },
};

const StateFormat = {
  // format Form data before saving into Table(App's state)
  toTable(formikValues) {
    const { start, end, max, gender, colors } = formikValues;

    const tStart = _mapToTable.start(start);
    const tEnd = _mapToTable.end(end);
    const tMax = _mapToTable.max(max);
    const tGender = _mapToTable.gender(gender);
    const tColors = colors.map(_mapToTable.color);

    console.log(formikValues.id);
    return {
      ...formikValues,
      start: tStart,
      end: tEnd,
      max: tMax,
      gender: tGender,
      colors: tColors,
    };
  },
  // format Table'record data/state before saving into Formik's state
  toForm(tableRecord) {
    // actually do nothing for the time being
    const formData = Object.assign({}, tableRecord);
    const { start, end, max, colors, gender } = formData;
    const fStart = _mapToForm.start(start);
    const fEnd = _mapToForm.end(end);
    const fMax = _mapToForm.max(max);
    const fColors = colors.map(_mapToForm.color);
    const fGender = _mapToForm.gender(gender);

    console.log(tableRecord.id);
    return {
      ...formData,
      start: fStart,
      end: fEnd,
      max: fMax,
      colors: fColors,
      gender: fGender,
    };
  },
};

const isCharFullwidth = function (char) {
  if (char.length > 1) {
    console.warn("isCharFullwidth should be called on a single char");
  }
  let charCode = char.charCodeAt(0);
  return isFullwidthCodePoint(charCode);
};

const serial = {
  _num: 0,
  generate: function () {
    return (this._num++).toString();
  },
};

// create a generator that generate non-duplicate numbers from 1 to num
const randomGenerator = (upperbound) => {
  const exists = [];
  return function () {
    if (exists.length === upperbound) {
      console.error("`randomGenerator` has reached it's limit");
      return exists[exists.length - 1];
    }
    let isDuplicate = true;
    let newNum = null;
    while (isDuplicate) {
      newNum = Math.ceil(upperbound * Math.random());
      isDuplicate = exists.includes(newNum);
    }
    exists.push(newNum);
    return newNum;
  };
};

const createOneTableRecord = (fields) =>
  StateFormat.toTable({ ...DEV_INITIAL_VALUE, ...fields });

const createTableRecords = (amount) => {
  const records = [];
  const uniqNumGen = randomGenerator(amount);
  const priceGen = randomGenerator(5000);
  for (let i = 0; i < amount; i++) {
    const uniqNum = uniqNumGen();
    const uniqStart = moment().subtract({ days: uniqNum, hours: uniqNum });
    const uniqEnd = moment().add({ days: uniqNum, hours: uniqNum });
    const newRecord = createOneTableRecord({
      id: uniqNum.toString(),
      start: uniqStart,
      end: uniqEnd,
      price: priceGen(),
    });
    records.push(newRecord);
  }
  return records;
};

export {
  StateFormat,
  serial,
  openNotification,
  isCharFullwidth,
  createOneTableRecord,
  createTableRecords,
};
