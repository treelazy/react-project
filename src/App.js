import "./App.css";
import { useState } from "react";
import { Button, Modal, Row, Col, Typography } from "antd";
import MyFormWithFormik from "./components/MyForm/MyFromWithFormik";
import MyTable from "./components/MyTable";
import { serial, openNotification, StateFormat } from "./helper";
import { DELAY_TIME } from "./data/const";

function App() {
  // data is for table rows
  const [data, setData] = useState([]);
  // isVisible controls the Modal
  const [isVisible, setIsVisible] = useState(false);
  // isEdiMode controls whether the form is for creating data or updating data
  const [isEditMode, seIsEditMode] = useState(false);
  // selectedRecord is the selected data when editting a record
  const [selectedRecord, setSelectedRecord] = useState(null);
  // the corresponding records'keys when checkboxes selected
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
    // delay the data update to avoid showing unfriendly data to user
    setTimeout(() => setSelectedRecord(null), DELAY_TIME);
    openNotification(
      "success",
      "Record Updated",
      "You have successfully updated a new record."
    );
  }

  // the modal form has two mode, one is for creating a record, the other is for editting a record
  // when user clicks on edit button, it shows the modal form for editting a record
  // when user clicks on new button, it shows the modal form for creating a record
  function showModal({ isEditMode }) {
    seIsEditMode(isEditMode);
    setIsVisible(true);
  }

  function handleCancel() {
    setIsVisible(false);
    // delay the data update to avoid showing unfriendly data to user
    setTimeout(() => setSelectedRecord(null), DELAY_TIME);
  }

  function handleEdit(key) {
    const tableRecord = data.find((record) => record.key === key);
    const formikData = StateFormat.toFormik(tableRecord);

    // select the specific record, send the data to Formik, and then open the modal form
    setSelectedRecord(formikData);
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
          {
            // hide the delete button when no record is selected
            selectedRecordKeys.length ? (
              <Button type="danger" icon="delete" onClick={handleDeleteMany}>
                Delete
              </Button>
            ) : null
          }
        </Col>
      </Row>
      <MyFormWithFormik
        onInsert={insertData}
        onEdit={editData}
        visible={isVisible}
        onCancel={handleCancel}
        values={selectedRecord}
        isEditMode={isEditMode}
      />
    </div>
  );
}

export default App;
