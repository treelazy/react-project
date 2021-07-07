import "./App.css";
import { useState } from "react";
import { Button, Modal, Row, Col, Typography, Icon } from "antd";
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
  // searchTerm is the key wrods for searching data
  const [searchTerm, setSearchTerm] = useState({
    tag: "",
    orgName: "",
    gender: "",
  });

  function saveData(record) {
    const index = data.findIndex((d) => {
      return d.id === record.id;
    });
    // insert a new record
    if (index < 0) {
      db.insert(record).then((record) => {
        // when a new record is added, clean the search inputs and reload all data
        cleanSearch();
        refresh();
        openNotification("success", "新增資料", "你已經成功新增一筆資料");
      });
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

  function handleSearch({ tag, orgName, gender }) {
    const result = db.data.filter((record) => {
      const { tag: dataTag, orgName: dataOrgName, gender: dataGender } = record;
      const isContainId = dataTag?.toUpperCase().includes(tag);
      const isContainOrgName = dataOrgName?.toUpperCase().includes(orgName);
      const isContainGender = dataGender?.toUpperCase().includes(gender);

      return isContainId && isContainOrgName && isContainGender;
    });

    const tableResult = result.map(Mapper.dbToTable);
    setData(tableResult);
  }

  function handleSearchChange({ target: { name, value } }) {
    setSearchTerm((prevTerm) => ({ ...prevTerm, [name]: value }));
  }

  function handleSearchClear() {
    cleanSearch();
  }

  function refresh() {
    const allTableRecords = db.data.map(Mapper.dbToTable);
    setData(allTableRecords);
  }

  function cleanSearch() {
    setSearchTerm({ tag: "", orgName: "", gender: "" });
  }

  return (
    <div className="app-wrapper" style={{ height: "100vh" }}>
      <Row type="flex" justify="center">
        <Typography.Title className="app-title">資料列表</Typography.Title>
      </Row>
      <Row className="search-wrapper" type="flex" justify="center">
        <Col
          xs={24}
          lg={20}
          xl={16}
          xxl={12}
          style={{
            backgroundColor: "white",
            padding: "1.5rem 1.5rem 1rem 1.5rem",
            borderRadius: "3px",
          }}
        >
          <Search
            onSearch={handleSearch}
            onSearchChange={handleSearchChange}
            searchTerm={searchTerm}
            onClear={handleSearchClear}
          />
        </Col>
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
          <Row
            type="flex"
            justify="start"
            align="middle"
            style={{ marginBottom: 5 }}
          >
            <Col style={{ marginRight: "auto" }}>
              <Icon type="info-circle" theme="filled" />
              <span> 總資料筆數共 {data.length} 筆</span>
            </Col>
            <Col>
              <Button
                style={{ marginRight: 5 }}
                onClick={() => {
                  const newRecords = createDbRecords(1001);
                  db.insertBatch(newRecords).then((records) => {
                    const tableRecords = records.map(Mapper.dbToTable);
                    setData((prevData) => [...prevData, ...tableRecords]);
                    // when new records are added, clean the search inputs and reload all data
                    cleanSearch();
                    refresh();
                  });
                }}
              >
                快速
              </Button>
              <Button
                style={{ marginRight: 5 }}
                type="primary"
                icon="form"
                onClick={handleNew}
              >
                新增
              </Button>
            </Col>
          </Row>

          <MyTable data={data} onDelete={handleDelete} onEdit={handleEdit} />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col style={{ marginTop: "2rem" }}></Col>
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
