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
    dateTime: { startDate, endDate, startTime, endTime },
  } = values;
  return {
    ...values,
    key: uniqid(),
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

export { formatDate, formatBeforeSaved };
