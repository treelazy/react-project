import "./App.css";
import { useState } from "react";
import MyForm from "./components/MyForm.component";
import MyTable from "./components/MyTable.component";

function App() {
  const [data, setData] = useState([]);
  function saveData(newRecord) {
    console.log(newRecord);
    setData([...data, newRecord]);
  }
  return (
    <div style={{ backgroundColor: "rgba(118, 118, 118, 0.5)" }}>
      <MyForm onSubmit={saveData} />
      <MyTable data={data} />
    </div>
  );
}

export default App;
