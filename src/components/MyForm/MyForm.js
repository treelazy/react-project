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
} from "antd";
import { useFormikContext } from "formik";
import {
  COUNTRIES,
  COLORS,
  RACES,
  FOODS,
  DEV_INITIAL_VALUE,
  INITIAL_VALUE,
} from "../../data/const";
import DateTimePicker from "../DateTimePicker";

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
    setTimeout(() => resetForm({ values: INITIAL_VALUE }), 500);
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      okText={"Submit"}
      cancelText={"Cancel"}
      onOk={submitForm}
      width="45%"
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
            {isEditMode ? null : (
              <Button onClick={() => setValues(INITIAL_VALUE)}>Reset</Button>
            )}
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={submitForm}>
              Submit
            </Button>
          </Col>
        </Row>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col
          span={24}
          style={{
            backgroundColor: "white",
            borderRadius: "1rem",
          }}
        >
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              {isEditMode
                ? `Edit Record ID: ${values?.key}`
                : "Create a New Record"}
            </h1>

            <Form.Item
              label="Name"
              name="name"
              wrapperCol={{ span: 9 }}
              validateStatus={touched?.name && errors?.name && "error"}
              help={touched?.name && errors?.name}
            >
              <Input
                placeholder="Please enter your name"
                value={values?.name}
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                }}
                onBlur={() => setFieldTouched("name", true)}
              />
            </Form.Item>
            <Form.Item
              name="country"
              label="Country"
              wrapperCol={{ span: 9 }}
              validateStatus={touched?.country && errors?.country && "error"}
              help={touched?.country && errors?.country}
            >
              <Select
                placeholder="Please select a country"
                onChange={(country) => {
                  setFieldValue("country", country);
                }}
                value={values?.country}
                onBlur={() => setFieldTouched("country", true)}
              >
                {COUNTRIES.map((country) => (
                  <Select.Option key={country?.key} value={country?.value}>
                    {country?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="colors"
              label="Colors"
              wrapperCol={{ span: 9 }}
              validateStatus={touched?.colors && errors?.colors && "error"}
              help={touched?.colors && errors?.colors}
            >
              <Select
                mode="multiple"
                placeholder="Please select favourite colors"
                onChange={(colors) => {
                  setFieldValue("colors", colors);
                }}
                value={values?.colors}
                onBlur={() => setFieldTouched("colors", true)}
              >
                {COLORS.map((color) => (
                  <Select.Option key={color?.key} value={color?.value}>
                    {color?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="race"
              label="Race"
              validateStatus={touched?.race && errors?.race && "error"}
              help={touched?.race && errors?.race}
            >
              <Radio.Group
                onChange={(e) => {
                  setFieldValue("race", e.target.value);
                }}
                value={values?.race}
                onBlur={() => setFieldTouched("race", true)}
              >
                {RACES.map((race) => (
                  <Radio key={race?.key} value={race?.value}>
                    {race?.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item name="isSwitched" label="Switch">
              <Switch
                checked={values?.isSwitched}
                onClick={() => {
                  setFieldValue("isSwitched", !values?.isSwitched);
                }}
              />
            </Form.Item>
            <Form.Item name="foods" label="Food">
              <Checkbox.Group
                value={values?.foods}
                onChange={(food) => {
                  setFieldValue("foods", food);
                }}
              >
                {FOODS.map((food) => (
                  <Checkbox
                    key={food?.key}
                    value={food?.value}
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    {food?.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              name="dateTime"
              label="Date and Time"
              validateStatus={touched?.dateTime && errors?.dateTime && "error"}
              help={touched?.dateTime && errors?.dateTime}
            >
              <DateTimePicker
                value={values.dateTime}
                onChange={(dateTime) => {
                  setFieldValue("dateTime", dateTime);
                }}
                onBlur={() => setFieldTouched("dateTime", true)}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            ></Form.Item>
          </Form>
        </Col>
      </div>
    </Modal>
  );
}
