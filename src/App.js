import "./App.css";
import { useState } from "react";
import MyForm from "./components/MyForm";
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
      <MyForm onSubmit={saveData} />
      <MyTable data={data} />
    </div>
  );
}

export default App;
