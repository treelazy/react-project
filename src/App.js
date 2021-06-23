import "./App.css";
import { useState } from "react";
import { Button, Modal, Row, Col, Typography, Icon } from "antd";
import MyFormWithFormik from "./components/MyForm/MyFromWithFormik";
import MyTable from "./components/MyTable";
import { serial } from "./helper";

function App() {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditMode, seIsEditMode] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  function insertData(newRecord) {
    console.log("INSERT", data, newRecord);
    newRecord.key = serial.generate();
    setData([...data, newRecord]);
  }

  function editData(record) {
    const index = data.findIndex((d) => {
      console.log("KEYS", d.key, record.key);
      return d.key === record.key;
    });
    console.log(index);
    const newData = [...data.slice(0, index), record, ...data.slice(index + 1)];
    console.log("EDIT", newData);
    setData(newData);
  }

  function showModal({ isEditMode }) {
    seIsEditMode(isEditMode);
    setIsVisible(true);
  }

  function handleCancel() {
    setIsVisible(false);
  }

  function handleEdit(key) {
    const tableRecord = data.find((record) => record.key === key);

    // the data of start and end is only for table, not for Formik
    const formikData = Object.assign({}, tableRecord);
    delete formikData.start;
    delete formikData.end;

    setSelectedRecord(tableRecord);
    console.log(selectedRecord);
    showModal({ isEditMode: true });
  }

  function handleDelete(key) {
    Modal.confirm({
      title: "Confirm",
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
    <div style={{ paddingTop: "32px", height: "100vh" }}>
      <Row type="flex" justify="center">
        <Typography.Title>Table List</Typography.Title>
      </Row>
      <MyFormWithFormik
        onInsert={insertData}
        onEdit={editData}
        visible={isVisible}
        onCancel={handleCancel}
        values={selectedRecord}
        isEditMode={isEditMode}
      />
      <Row type="flex" justify="center">
        <Col
          span={18}
          style={{
            backgroundColor: "white",
            padding: "1rem",
            border: "1px solid rgb(200, 200, 200)",
            borderRadius: "3px",
          }}
        >
          <MyTable
            data={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isLastOne={data.length === 1}
          />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col style={{ marginTop: "2rem" }}>
          <Button type="primary" icon="form" onClick={showModal}>
            New Record
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;
