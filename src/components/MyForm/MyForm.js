import React from "react";
import {
  Col,
  Form,
  Input,
  Radio,
  Switch,
  Checkbox,
  Select,
  Modal,
  Row,
  Button,
  TimePicker,
  DatePicker,
} from "antd";
import { useFormikContext } from "formik";
import {
  COUNTRIES,
  COLORS,
  RACES,
  FOODS,
  DEV_INITIAL_VALUE,
  INITIAL_VALUE,
  DELAY_TIME,
} from "../../data/const";
import moment from "moment";

const gutter = [
  { xs: 8, sm: 16, md: 24, lg: 32 },
  { xs: 8, sm: 16, md: 24, lg: 32 },
];

export default function MyForm({ isEditMode, visible, onCancel }) {
  const {
    values,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
    submitForm,
    setValues,
    resetForm,
  } = useFormikContext();

  function handleCancel() {
    onCancel();
    // delay the data update to avoid showing unfriendly data to user
    setTimeout(() => resetForm({ values: INITIAL_VALUE }), DELAY_TIME);
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      okText={"Submit"}
      cancelText={"Cancel"}
      onOk={submitForm}
      width="60%"
      footer={
        <Row>
          <Col offset={0} span={2}>
            <Button
              // a button used for demo only, to save time typing data manually
              onClick={() => {
                setValues({ ...values, ...DEV_INITIAL_VALUE });
              }}
            >
              Cheat
            </Button>
          </Col>
          <Col span={13}>
            {isEditMode && (
              <Button onClick={() => resetForm({ values: INITIAL_VALUE })}>
                Reset
              </Button>
            )}
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={submitForm}>
              Submit
            </Button>
          </Col>
        </Row>
      }
    >
      <Form>
        <Row gutter={gutter}>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: "blue" }}>Col</div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
