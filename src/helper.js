import moment from "moment";

function formatDate(storageData) {
  storageData["date"] = storageData["date"]
    ? moment(storageData["date"])
    : null;
  storageData["time"] = storageData["time"]
    ? moment(storageData["time"])
    : null;
  storageData["range"] = storageData["range"].length
    ? [moment(storageData["range"][0]), moment(storageData["range"][1])]
    : [];
}

export { formatDate };
