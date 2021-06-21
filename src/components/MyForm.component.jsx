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
import { COUNTRIES, COLORS, RACES, FOODS } from "../data/const";
import uniqid from "uniqid";
import { INITIAL_VALUE } from "../data/const";
import DateTimePicker from "./DateTimePicker.component";

const { RangePicker } = DatePicker;

export default function MyForm({ onSubmit }) {
  const [state, setState] = useState(INITIAL_VALUE);

  function handleValueChange(value, field) {
    setState({ ...state, [field]: value });
  }

  function handleReset() {
    setState(INITIAL_VALUE);
  }

  function handleSubmit(e) {
    const {
      date,
      range,
      time,
      dateTime: { startDate, endDate, startTime, endTime },
    } = state;
    e.preventDefault();

    // format data before saving into prarent's state
    onSubmit({
      ...state,
      key: uniqid(),
      date: date ? date.format("YYYY-MM-DD") : "",
      range: range.length
        ? `${range[0].format("YYYY-MM-DD")} ~ ${range[1].format("YYYY-MM-DD")}`
        : "",
      time: time ? time.format("HH:mm:ss") : "",
      dateTime: `${startDate.format("YYYY-MM-DD")} ${startTime.format(
        "HH:mm:ss"
      )} ~ ${endDate.format("YYYY-MM-DD")} ${endTime.format("HH:mm:ss")}`,
    });
    setState(INITIAL_VALUE);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        height: "100vh",
      }}
    >
      <Col
        span={14}
        style={{
          paddingTop: "1.5rem",
          backgroundColor: "white",
          borderRadius: "1rem",
        }}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <h1 style={{ textAlign: "center" }}>MyForm</h1>
          <Form.Item label="Name">
            <Input
              placeholder="Please enter your name"
              value={state.name}
              onChange={(e) => {
                handleValueChange(e.target.value, "name");
              }}
            />
          </Form.Item>
          <Form.Item name="country" label="Country">
            <Select
              placeholder="Please select a country"
              onChange={(country) => {
                handleValueChange(country, "country");
              }}
              value={state.country}
            >
              {COUNTRIES.map((country) => (
                <Select.Option key={country.key} value={country.value}>
                  {country.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="color" label="Color">
            <Select
              mode="multiple"
              placeholder="Please select favourite colors"
              onChange={(colors) => {
                handleValueChange(colors, "colors");
              }}
              value={state.colors ?? []}
            >
              {COLORS.map((color) => (
                <Select.Option key={color.key} value={color.value}>
                  {color.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="race" label="Race">
            <Radio.Group
              onChange={(e) => {
                handleValueChange(e.target.value, "race");
              }}
              value={state.race}
            >
              {RACES.map((race) => (
                <Radio key={race.key} value={race.value}>
                  {race.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="switch" label="Switch" valuePropName="checked">
            <Switch
              checked={state.isSwitched}
              onClick={() => {
                handleValueChange(!state.isSwitched, "isSwitched");
              }}
            />
          </Form.Item>
          <Form.Item name="food" label="Food">
            <Checkbox.Group
              value={state.foods}
              onChange={(foods) => {
                handleValueChange(foods, "foods");
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
          <Form.Item label="Date">
            <DatePicker
              onChange={(date) => handleValueChange(date, "date")}
              value={state.date}
            />
          </Form.Item>
          <Form.Item label="Date Range">
            <RangePicker
              onChange={(range) => handleValueChange(range, "range")}
              value={state.range}
            />
          </Form.Item>
          <Form.Item label="Time">
            <TimePicker
              onChange={(time) => handleValueChange(time, "time")}
              value={state.time}
            />
          </Form.Item>
          <Form.Item label="Date and Time">
            <DateTimePicker
              value={state.dateTime}
              onChange={(dateTime) => handleValueChange(dateTime, "dateTime")}
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
              onClick={handleSubmit}
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
