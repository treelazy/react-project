import "./App.css";
import { useState } from "react";
import { Button } from "antd";
import MyFormWithFormik from "./components/MyForm/MyFromWithFormik";
import MyTable from "./components/MyTable";

function App() {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

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

  function handleEdit() {}

  function handleDelete(key) {
    setData(data.filter((record) => record.key !== key));
  }

  return (
    <div
      style={{ backgroundColor: "rgba(118, 118, 118, 0.5)", height: "100vh" }}
    >
      <MyFormWithFormik
        onSubmit={saveData}
        visible={isVisible}
        onCancel={handleCancel}
      />

      <Button onClick={showModal}>New Record</Button>
      <MyTable data={data} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;
