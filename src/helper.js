import moment from "moment";
import uniqid from "uniqid";

// this is used for formatting data from localStorage into React State
function formatDate(storageData) {
  storageData["date"] = storageData["date"]
    ? moment(storageData["date"])
    : null;
  storageData["time"] = storageData["time"]
    ? moment(storageData["time"])
    : null;

  if (storageData["range"] == null || !storageData["range"].length) {
    storageData["range"] = [];
  } else {
    storageData["range"] = [
      moment(storageData["range"][0]),
      moment(storageData["range"][1]),
    ];
  }
}

// format data before saving into App's state(which will be displayed in the table)
function formatBeforeSaved(values) {
  const {
    date,
    range,
    time,
    dateTime: { startDate, endDate, startTime, endTime },
  } = values;
  return {
    ...values,
    key: uniqid(),
    date: date ? date.format("YYYY-MM-DD") : "",
    range: range.length
      ? `${range[0].format("YYYY-MM-DD")} ~ ${range[1].format("YYYY-MM-DD")}`
      : "",
    time: time ? time.format("HH:mm:ss") : "",
    dateTime:
      startDate && startTime && endDate && endTime
        ? `${startDate.format("YYYY-MM-DD")} ${startTime.format(
            "HH:mm:ss"
          )} ~ ${endDate.format("YYYY-MM-DD")} ${endTime.format("HH:mm:ss")}`
        : "",
  };
}

export { formatDate, formatBeforeSaved };
