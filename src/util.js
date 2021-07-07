import { notification } from "antd";
import moment from "moment";
import { DELAY_TIME, DEV_INITIAL_VALUE, RANDOM_CHARS } from "./data/const";
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

// map form data to db data
const _mapFormToDB = {
  start(fStart) {
    return fStart?.format("YYYY-MM-DD HH:mm:ss");
  },
  end(fEnd) {
    return fEnd?.format("YYYY-MM-DD HH:mm:ss");
  },
};

const _mapDbToTable = {
  max(dbMax) {
    return dbMax.isActive ? dbMax.value : null;
  },
  color(dbColor) {
    let tColor = "";
    if (dbColor === "red") {
      tColor = "紅色";
    } else if (dbColor === "green") {
      tColor = "綠色";
    } else if (dbColor === "blue") {
      tColor = "藍色";
    }
    return tColor;
  },
  gender(dbGender) {
    return dbGender === "M" ? "男性" : "女性";
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

const Mapper = {
  // format Form data before saving into Table(App's state)
  formToDB(formData) {
    const { start, end } = formData;

    const dStart = _mapFormToDB.start(start);
    const dEnd = _mapFormToDB.end(end);

    return {
      ...formData,
      start: dStart,
      end: dEnd,
    };
  },

  dbToTable(dbData) {
    const { max, colors, gender } = dbData;
    const tMax = _mapDbToTable.max(max);
    const tcolors = colors.map(_mapDbToTable.color);
    const tGender = _mapDbToTable.gender(gender);

    return {
      ...dbData,
      max: tMax,
      colors: tcolors,
      gender: tGender,
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

// create a function that generates "non-duplicate" numbers between lowerbound and upperbound
// lowerbound and upperbound are inclusive in the generated numbers
const randomGenerator = (lowerBound, upperbound) => {
  if (lowerBound == null || upperbound == null) {
    throw new Error(
      "`lowerBound` and `upperbound` are required for `randomGenerator`"
    );
  }
  if (lowerBound >= upperbound) {
    throw new Error("`lowerBound` must be smaller than `upperbound`");
  }
  const exists = [];
  return function () {
    if (exists.length === upperbound - lowerBound + 1) {
      throw new Error("`randomGenerator` has reached it's limit");
    }
    let isDuplicate = true;
    let newNum = null;
    while (isDuplicate) {
      newNum =
        lowerBound + Math.floor((upperbound - lowerBound + 1) * Math.random());
      isDuplicate = exists.includes(newNum);
    }
    exists.push(newNum);
    return newNum;
  };
};

// generate data randomly
let accumulated = 0; // <= to track how many records has been generated
const createOneDbRecord = (fields) =>
  Mapper.formToDB({ ...DEV_INITIAL_VALUE, ...fields });
const createDbRecords = (amount) => {
  const records = [];
  const uniqNumGen = randomGenerator(accumulated, accumulated + amount);
  const priceGen = randomGenerator(1, amount * 5);
  for (let i = 0; i < amount; i++) {
    const uniqNum = uniqNumGen();
    const uniqStart = moment().subtract({ days: uniqNum, hours: uniqNum });
    const uniqEnd = moment().add({ days: uniqNum, hours: uniqNum });
    const genderNum = randomGenerator(0, 1)(); // generate 0 or 1
    const newRecord = createOneDbRecord({
      tag: uniqNum.toString(),
      start: uniqStart,
      end: uniqEnd,
      price: priceGen(),
      gender: genderNum === 0 ? "F" : "M",
      orgName: randomOrgName(),
    });
    records.push(newRecord);
  }
  accumulated += amount;
  return records;
};
//

// randomly create a orgName
function randomOrgName() {
  const chars = [];
  const gen = randomGenerator(0, 9);
  for (let i = 0; i <= 9; i++) {
    const num = gen();
    const char = RANDOM_CHARS[num];
    chars.push(char);
  }
  return chars.join("");
}

export {
  Mapper,
  openNotification,
  isCharFullwidth,
  createDbRecords,
  createOneDbRecord,
};
