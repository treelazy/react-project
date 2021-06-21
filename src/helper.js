import moment from "moment";

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

export { formatDate };
