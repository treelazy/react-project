import "./App.css";
import { useState } from "react";
import MyFormWithFormik from "./components/MyForm/MyFromWithFormik";
import MyTable from "./components/MyTable";

function App() {
  const [data, setData] = useState([]);
  function saveData(newRecord) {
    console.log(newRecord);
    setData([...data, newRecord]);
  }
  return (
    <div
      style={{ backgroundColor: "rgba(118, 118, 118, 0.5)", height: "100vh" }}
    >
      <MyFormWithFormik onSubmit={saveData} />
      <MyTable data={data} />
    </div>
  );
}

export default App;
