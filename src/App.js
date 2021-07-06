import "./App.css";
import { useState } from "react";
import { Button, Modal, Row, Col, Typography } from "antd";
import { Formik } from "formik";
import MyTable from "./components/MyTable";
import MyForm from "./components/MyForm/MyForm";
import Search from "./components/Search";
import { openNotification, StateFormat, createTableRecords } from "./util";
import validation from "./components/MyForm/validation/validation";
import { INITIAL_VALUE } from "./data/const";
import db from "./data/db";

function App() {
  // data is for table rows
  const [data, setData] = useState([]);
  // isVisible controls the Modal
  const [isVisible, setIsVisible] = useState(false);
  // isEdiMode controls whether the form is for creating data or updating data
  const [isEditMode, seIsEditMode] = useState(false);
  // selectedRecord is the selected data when editting a record
  const [selectedRecord, setSelectedRecord] = useState(INITIAL_VALUE);
  // the corresponding records'keys when checkboxes selected
  const [selectedRecordKeys, setSelectedRecordKeys] = useState([]);

  function saveData(record) {
    const index = data.findIndex((d) => {
      return d.id === record.id;
    });
    // insert a new record
    if (index < 0) {
      setData([...data, record]);
      db.push(record);
      openNotification("success", "新增資料", "你已經成功新增一筆資料");
    } else {
      // update an existing record
      const newData = [
        ...data.slice(0, index),
        record,
        ...data.slice(index + 1),
      ];
      db.splice(index, 1, newData);
      setData(newData);
      openNotification("success", "資料更新", "你已經成功更新一筆資料");
    }
  }

  // the modal form has two mode, one is for creating a record, the other is for editting a record
  // when user clicks on edit button, it shows the modal form for editting a record
  // when user clicks on new button, it shows the modal form for creating a record
  function showModal({ isEditMode = false } = {}) {
    seIsEditMode(isEditMode);
    setIsVisible(true);
  }

  function closeModal() {
    setIsVisible(false);
  }

  function handleNew() {
    setSelectedRecord(INITIAL_VALUE);
    showModal();
  }

  function handleEdit(id) {
    const tableRecord = data.find((record) => record.id === id);
    const formData = StateFormat.toForm(tableRecord);

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
        const removedIdx = data.findIndex((record) => record.id === id);
        db.splice(removedIdx, 1);
        setData(data.filter((record, idx) => idx !== removedIdx));
        openNotification("warning", "資料刪除", "你已經成功刪除單筆資料");
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
      <Search />

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
          <MyTable data={data} onDelete={handleDelete} onEdit={handleEdit} />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col style={{ marginTop: "2rem" }}>
          <Button
            onClick={() => {
              const newRecords = createTableRecords(1001);
              db.push(...newRecords);
              setData((prevData) => [...prevData, ...newRecords]);
            }}
          >
            快速
          </Button>
          <Button
            style={{ marginRight: "1rem" }}
            type="primary"
            icon="form"
            onClick={handleNew}
          >
            新增
          </Button>
        </Col>
      </Row>
      <Row>
        <Modal
          destroyOnClose
          wrapClassName={"modal-wrapper"}
          width={"100%"}
          visible={isVisible}
          onCancel={closeModal}
          footer={null}
        >
          <Formik
            enableReinitialize
            initialValues={selectedRecord}
            validateOnBlur
            validationSchema={validation}
            onSubmit={(values) => {
              saveData(StateFormat.toTable(values));
              closeModal();
            }}
          >
            <MyForm onCancel={closeModal} isEditMode={isEditMode} />
          </Formik>
        </Modal>
      </Row>
    </div>
  );
}

export default App;
