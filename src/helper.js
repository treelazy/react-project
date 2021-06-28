import { notification } from "antd";
import { DELAY_TIME } from "./data/const";

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

const StateFormat = {
  // format Formik data/state before saving into App's state(which will be displayed in the table)
  toTable(formikValues) {
    const {
      dateTime: { startDate, endDate, startTime, endTime },
    } = formikValues;
    return {
      ...formikValues,
      start:
        startDate && startTime
          ? `${startDate.format("YYYY-MM-DD")} ${startTime.format("HH:mm:ss")}`
          : "",
      end:
        endDate && endTime
          ? `${endDate.format("YYYY-MM-DD")} ${endTime.format("HH:mm:ss")}`
          : "",
    };
  },
  // format Table'record data/state before saving into Formik's state
  toFormik(tableRecord) {
    const formikData = Object.assign({}, tableRecord);

    // the data of start and end is only for table, not for Formik, so we delete them before sending to Formik
    delete formikData.start;
    delete formikData.end;

    return formikData;
  },
};

const serial = {
  _num: 0,
  generate: function () {
    return this._num++;
  },
};

export { StateFormat, serial, openNotification };
