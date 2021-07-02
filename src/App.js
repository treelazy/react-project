import "./App.css";
import { useState } from "react";
import { Button, Modal, Row, Col, Typography } from "antd";
import MyTable from "./components/MyTable";
import MyForm from "./components/MyForm/MyForm";
import { serial, openNotification, StateFormat } from "./helper";
import validation from "./components/MyForm/validation/validation";
import { INITIAL_VALUE } from "./data/const";
import { Formik } from "formik";

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
    // insert a new record
    if (record.id == null) {
      record.id = serial.generate();
      setData([...data, record]);
      openNotification("success", "新增資料", "你已經成功新增一筆資料");
    } else {
      // update an existing record
      const index = data.findIndex((d) => {
        return d.id === record.id;
      });
      const newData = [
        ...data.slice(0, index),
        record,
        ...data.slice(index + 1),
      ];
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
            onClick={handleNew}
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
