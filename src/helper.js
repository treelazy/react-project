import { notification } from "antd";
import moment from "moment";
import { DELAY_TIME } from "./data/const";
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
    return fStart.format("YYYY-MM-DD HH:mm:ss");
  },
  end(fEnd) {
    return fEnd.format("YYYY-MM-DD HH:mm:ss");
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
    return moment(tStart);
  },
  end(tEnd) {
    return moment(tEnd);
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
    return this._num++;
  },
};

export { StateFormat, serial, openNotification, isCharFullwidth };
