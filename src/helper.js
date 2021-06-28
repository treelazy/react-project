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

// format data before saving into App's state(which will be displayed in the table)
function formatBeforeSaved(values) {
  const {
    dateTime: { startDate, endDate, startTime, endTime },
  } = values;
  return {
    ...values,
    start:
      startDate && startTime
        ? `${startDate.format("YYYY-MM-DD")} ${startTime.format("HH:mm:ss")}`
        : "",
    end:
      endDate && endTime
        ? `${endDate.format("YYYY-MM-DD")} ${endTime.format("HH:mm:ss")}`
        : "",
  };
}

const serial = {
  _num: 0,
  generate: function () {
    return this._num++;
  },
};

export { formatBeforeSaved, serial, openNotification };
