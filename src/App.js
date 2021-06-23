import "./App.css";
import { useState } from "react";
import { Button, Modal } from "antd";
import MyFormWithFormik from "./components/MyForm/MyFromWithFormik";
import MyTable from "./components/MyTable";

function App() {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  function saveData(newRecord) {
    console.log(newRecord);
    setData([...data, newRecord]);
  }

  function showModal() {
    setIsVisible(true);
  }

  function handleCancel() {
    setIsVisible(false);
  }

  function handleEdit(key) {
    const tableRecord = data.find((record) => record.key === key);
    const formikData = {
      name: "henry",
      country: "usa",
      colors: ["red", "blue"],
      race: "african",
      isSwitched: false,
      foods: ["rice", "meat"],
      dateTime: {
        // startDate: moment(),
        // endDate: moment(),
        // startTime: moment(),
        // endTime: moment(),
      },
    };
    showModal();
  }

  function handleDelete(key) {
    Modal.confirm({
      title: "Confirm",
      // icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          You sure you want to delete <b>ID:{`${key}`}</b>?
        </span>
      ),
      onOk: () => {
        setData(data.filter((record) => record.key !== key));
      },
    });
  }

  return (
    <div
      style={{ backgroundColor: "rgba(118, 118, 118, 0.5)", height: "100vh" }}
    >
      <MyFormWithFormik
        onSubmit={saveData}
        visible={isVisible}
        onCancel={handleCancel}
        value={selectedRecord}
      />
      <Button onClick={showModal}>New Record</Button>
      <MyTable
        data={data}
        onDelete={handleDelete}
        onEdit={handleEdit}
        isLastOne={data.length === 1}
      />
    </div>
  );
}

export default App;
