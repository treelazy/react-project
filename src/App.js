import "./App.css";
import { useState } from "react";
import { Button, Modal, Row, Col, Typography } from "antd";
import MyFormWithFormik from "./components/MyForm/MyFromWithFormik";
import MyTable from "./components/MyTable";
import { serial, openNotification } from "./helper";

function App() {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditMode, seIsEditMode] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedRecordKeys, setSelectedRecordKeys] = useState([]);

  function insertData(newRecord) {
    newRecord.key = serial.generate();
    setData([...data, newRecord]);
    openNotification(
      "success",
      "New Record Added",
      "You have successfully added a new record."
    );
  }

  function editData(record) {
    const index = data.findIndex((d) => {
      return d.key === record.key;
    });
    const newData = [...data.slice(0, index), record, ...data.slice(index + 1)];
    setData(newData);
    setTimeout(() => setSelectedRecord(null), 500);
    openNotification(
      "success",
      "Record Updated",
      "You have successfully updated a new record."
    );
  }

  function showModal({ isEditMode }) {
    seIsEditMode(isEditMode);
    setIsVisible(true);
  }

  function handleCancel() {
    setIsVisible(false);
    setTimeout(() => setSelectedRecord(null), 500);
  }

  function handleEdit(key) {
    const tableRecord = data.find((record) => record.key === key);

    // the data of start and end is only for table, not for Formik
    const formikData = Object.assign({}, tableRecord);
    delete formikData.start;
    delete formikData.end;

    setSelectedRecord(tableRecord);
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
        openNotification(
          "warning",
          "Record Deleted",
          "You have successfully deleted a record."
        );
      },
    });
  }

  function handleDeleteMany() {
    Modal.confirm({
      title: "Confirm",
      content: (
        <span>
          You sure you want to delete{" "}
          <b>IDs:{`${selectedRecordKeys.toString()}`}</b>?
        </span>
      ),
      onOk: () => {
        setData(
          data.filter(
            (record) => !selectedRecordKeys.some((key) => key === record.key)
          )
        );
        setSelectedRecordKeys([]);
        openNotification(
          "warning",
          "Records Deleted",
          "You have successfully deleted multiple records."
        );
      },
    });
  }

  function handleRowSelection(keys) {
    setSelectedRecordKeys(keys);
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
            onRowSelection={handleRowSelection}
            selectedRowKeys={selectedRecordKeys}
          />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col style={{ marginTop: "2rem" }}>
          <Button
            style={{ marginRight: "1rem" }}
            type="primary"
            icon="form"
            onClick={showModal}
          >
            New Record
          </Button>
          {selectedRecordKeys.length ? (
            <Button type="danger" icon="delete" onClick={handleDeleteMany}>
              Delete
            </Button>
          ) : null}
        </Col>
      </Row>
    </div>
  );
}

export default App;
