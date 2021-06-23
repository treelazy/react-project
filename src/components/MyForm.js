import React, { useState } from "react";
import {
  Col,
  Form,
  Button,
  Input,
  Radio,
  Switch,
  Checkbox,
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import { Formik, useFormikContext } from "formik";
import { COUNTRIES, COLORS, RACES, FOODS } from "../data/const";
import uniqid from "uniqid";
import { INITIAL_VALUE } from "../data/const";
import DateTimePicker from "./DateTimePicker";

const { RangePicker } = DatePicker;

function MyForm({ onSubmit }) {
  const {
    values,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
    submitForm,
  } = useFormikContext();

  function handleReset() {
    // setState(INITIAL_VALUE);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <Col
        span={18}
        style={{
          paddingTop: "1.5rem",
          backgroundColor: "white",
          borderRadius: "1rem",
        }}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <h1 style={{ textAlign: "center" }}>MyForm</h1>
          <Form.Item
            label="Name"
            name="name"
            wrapperCol={{ span: 9 }}
            validateStatus={touched.name && errors.name && "error"}
            help={touched.name && errors.name}
          >
            <Input
              placeholder="Please enter your name"
              value={values.name}
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
            validateStatus={touched.country && errors.country && "error"}
            help={touched.country && errors.country}
          >
            <Select
              placeholder="Please select a country"
              onChange={(country) => {
                setFieldValue("country", country);
              }}
              value={values.country}
              onBlur={() => setFieldTouched("country", true)}
            >
              {COUNTRIES.map((country) => (
                <Select.Option key={country.key} value={country.value}>
                  {country.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="colors"
            label="Colors"
            wrapperCol={{ span: 9 }}
            validateStatus={touched.colors && errors.colors && "error"}
            help={touched.colors && errors.colors}
          >
            <Select
              mode="multiple"
              placeholder="Please select favourite colors"
              onChange={(colors) => {
                setFieldValue("colors", colors);
              }}
              value={values.colors}
              onBlur={() => setFieldTouched("colors", true)}
            >
              {COLORS.map((color) => (
                <Select.Option key={color.key} value={color.value}>
                  {color.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="race"
            label="Race"
            validateStatus={touched.race && errors.race && "error"}
            help={touched.race && errors.race}
          >
            <Radio.Group
              onChange={(e) => {
                setFieldValue("race", e.target.value);
              }}
              value={values.race}
              onBlur={() => setFieldTouched("race", true)}
            >
              {RACES.map((race) => (
                <Radio key={race.key} value={race.value}>
                  {race.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="isSwitched" label="Switch" valuePropName="checked">
            <Switch
              checked={values.isSwitched}
              onClick={() => {
                setFieldValue("isSwitched", !values.isSwitched);
              }}
            />
          </Form.Item>
          <Form.Item name="foods" label="Food">
            <Checkbox.Group
              value={values.foods}
              onChange={(food) => {
                setFieldValue("foods", food);
              }}
            >
              {FOODS.map((food) => (
                <Checkbox
                  key={food.key}
                  value={food.value}
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  {food.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          {/* <Form.Item label="Date">
            <DatePicker
              // onChange={(date) => handleValueChange(date, "date")}
              value={state.date}
            />
          </Form.Item>
          <Form.Item label="Date Range">
            <RangePicker
              // onChange={(range) => handleValueChange(range, "range")}
              value={state.range}
            />
          </Form.Item>
          <Form.Item label="Time">
            <TimePicker
              // onChange={(time) => handleValueChange(time, "time")}
              value={state.time}
            />
          </Form.Item> */}
          <Form.Item
            name="dateTime"
            label="Date and Time"
            validateStatus={touched.dateTime && errors.dateTime && "error"}
            help={touched.dateTime && errors.dateTime}
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
          >
            <Button
              type="primary"
              style={{ marginRight: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              Submit
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}

export default function MyFormWithFormik(props) {
  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validateOnBlur
      validate={(values) => {
        const errors = {};
        if (values.name.length < 5) {
          errors.name = "Name should have at least 5 charaters";
        }
        if (!values.country) {
          errors.country = "Please select a country";
        }
        if (!values.colors.length) {
          errors.colors = "Please choose at least one color";
        }
        if (!values.race) {
          errors.race = "Please select your race";
        }
        if (
          !values.dateTime.startDate ||
          !values.dateTime.endDate ||
          !values.dateTime.startTime ||
          !values.dateTime.endTime
        ) {
          errors.dateTime = "Please select the missing date/time ";
        }
        return errors;
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
        const {
          date,
          range,
          time,
          dateTime: { startDate, endDate, startTime, endTime },
        } = values;
        // format data before saving into prarent's state(which will be displayed in the table)
        props.onSubmit({
          ...values,
          key: uniqid(),
          date: date ? date.format("YYYY-MM-DD") : "",
          range: range.length
            ? `${range[0].format("YYYY-MM-DD")} ~ ${range[1].format(
                "YYYY-MM-DD"
              )}`
            : "",
          time: time ? time.format("HH:mm:ss") : "",
          dateTime:
            startDate && startTime && endDate && endTime
              ? `${startDate.format("YYYY-MM-DD")} ${startTime.format(
                  "HH:mm:ss"
                )} ~ ${endDate.format("YYYY-MM-DD")} ${endTime.format(
                  "HH:mm:ss"
                )}`
              : "",
        });
      }}
    >
      <MyForm />
    </Formik>
  );
}
