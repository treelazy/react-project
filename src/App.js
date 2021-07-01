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
    newRecord.id = serial.generate();
    setData([...data, newRecord]);
    openNotification("success", "新增資料", "你已經成功新增一筆資料");
  }

  function editData(record) {
    const index = data.findIndex((d) => {
      return d.id === record.id;
    });
    const newData = [...data.slice(0, index), record, ...data.slice(index + 1)];
    setData(newData);
    // delay the data update to avoid showing unfriendly data to user
    setTimeout(() => setSelectedRecord(null), DELAY_TIME);
    openNotification("success", "資料更新", "你已經成功更新一筆資料");
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

  function handleEdit(id) {
    const tableRecord = data.find((record) => record.id === id);
    const formData = StateFormat.toForm(tableRecord);
    console.log(formData);

    // select the specific record, send the data to Formik, and then open the modal form
    setSelectedRecord(formData);
    showModal({ isEditMode: true });
  }

  function handleDelete(id) {
    Modal.confirm({
      title: " 刪除資料",
      okText: "確定",
      cancelText: "取消",
      content: (
        <span>
          確定要刪除這幾筆資料 <b>流水號:{`${id}`}</b>?
        </span>
      ),
      onOk: () => {
        setData(data.filter((record) => record.id !== id));
        openNotification("warning", "資料刪除", "你已經成功刪除單筆資料");
      },
    });
  }

  function handleDeleteMany() {
    Modal.confirm({
      title: "刪除資料",
      okText: "確定",
      cancelText: "取消",
      content: (
        <span>
          確定要刪除這幾筆資料{" "}
          <b>流水號:{`${selectedRecordKeys.toString()}`}</b>？
        </span>
      ),
      onOk: () => {
        setData(
          data.filter(
            (record) => !selectedRecordKeys.some((id) => id === record.id)
          )
        );
        setSelectedRecordKeys([]);
        openNotification("warning", "資料刪除", "你已經成功刪除多筆資料");
      },
    });
  }

  function handleRowSelection(keys) {
    setSelectedRecordKeys(keys);
  }

  return (
    <div style={{ paddingTop: "32px", height: "100vh" }}>
      <Row type="flex" justify="center">
        <Typography.Title>資料列表</Typography.Title>
      </Row>
      <Row type="flex" justify="center">
        <Col
          span={22}
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
            新增
          </Button>
          {
            // hide the delete button when no record is selected
            selectedRecordKeys?.length > 0 && (
              <Button type="danger" icon="delete" onClick={handleDeleteMany}>
                刪除
              </Button>
            )
          }
        </Col>
      </Row>
      <Row>
        <Col className="test" span={16}>
          <MyFormWithFormik
            onInsert={insertData}
            onEdit={editData}
            visible={isVisible}
            onCancel={handleCancel}
            values={selectedRecord}
            isEditMode={isEditMode}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
