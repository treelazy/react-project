import "./App.css";
import { useState } from "react";
import { Button, Modal, Row, Col, Typography } from "antd";
import { Formik } from "formik";
import MyTable from "./components/MyTable";
import MyForm from "./components/MyForm/MyForm";
import Search from "./components/Search";
import { openNotification, Mapper, createDbRecords } from "./util";
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

  function saveData(record) {
    const index = data.findIndex((d) => {
      return d.id === record.id;
    });
    // insert a new record
    if (index < 0) {
      db.insert(record).then((record) => {
        const tableRecord = Mapper.dbToTable(record);
        setData([...data, tableRecord]);
      });
      openNotification("success", "新增資料", "你已經成功新增一筆資料");
    } else {
      // update an existing record
      db.update(record).then((record) => {
        const tableRecord = Mapper.dbToTable(record);
        setData((prevData) => {
          const newData = [
            ...prevData.slice(0, index),
            tableRecord,
            ...prevData.slice(index + 1),
          ];
          return newData;
        });
      });
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
    const formData = Mapper.toForm(tableRecord);

    // select the specific record, send the data to Formik, and then open the modal form
    setSelectedRecord(formData);
    showModal({ isEditMode: true });
  }

  function handleDelete(id) {
    db.find(id).then((deleteRecord) => {
      Modal.confirm({
        title: " 刪除資料",
        okText: "確定",
        cancelText: "取消",
        content: (
          <span>
            確定要刪除這筆資料 <b>編號:{`${deleteRecord.tag}`}</b>?
          </span>
        ),
        onOk: () => {
          db.delete(id).then((id) => {
            setData((data) => data.filter((record) => record.id !== id));
          });
          openNotification("warning", "資料刪除", "你已經成功刪除單筆資料");
        },
      });
    });
  }

  function handleSearch({ id, orgName, gender }) {
    console.log("SEARCH TERM", id, orgName, gender);
    const result = db.filter((record) => {
      const { id: dataId, orgName: dataOrgName, gender: dataGender } = record;
      console.log(dataId, dataOrgName, dataGender);
      const isContainId = dataId?.toUpperCase().includes(id);
      const isContainOrgName = dataOrgName?.toUpperCase().includes(orgName);
      const isContainGender = dataGender?.toUpperCase() === gender;

      console.log(isContainId, isContainOrgName, isContainGender);
      return isContainId && isContainOrgName && isContainGender;
    });

    setData(result);
  }

  return (
    <div style={{ paddingTop: "32px", height: "100vh" }}>
      <Row type="flex" justify="center">
        <Typography.Title>資料列表</Typography.Title>
      </Row>
      <Search onSearch={handleSearch} />
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
              const newRecords = createDbRecords(1001);
              db.insertBatch(newRecords).then((records) => {
                const tableRecords = records.map(Mapper.dbToTable);
                setData((prevData) => [...prevData, ...tableRecords]);
              });
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
              saveData(Mapper.formToDB(values));
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
