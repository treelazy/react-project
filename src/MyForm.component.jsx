import React, { Component, useState } from "react";
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
import { COUNTRIES, COLORS, RACES, FOODS, INITIAL_VALUE } from "./data/const";
import { formatDate } from "./helper";

const { RangePicker } = DatePicker;

export default function MyForm() {
  const [ name, setName ] = useState("");
  const [ country, setCountry ] = useState("");
  const [ colors, setColors ] = useState([]);
  const [ race, setRace ] = useState("");
  const [ isSwitched, setIsSwitched ] = useState(false);
  const [ foods, setFoods ] = useState([]);
  const [ date, setDate ] = useState(null);
  const [ range, setRange ] = useState([]);
  const [ time, setTime ] = useState(null);
  const setField = {
    name: setName,
    country: setCountry,
    colors: setColors,
    race: setRace,
    isSwitched: setIsSwitched,
    foods: setFoods,
    date: setDate,
    range: setRange,
    time: setTime,
  };

  // componentDidMount() {
  //   const storageData = {};
  //   const fields = Object.keys(INITIAL_VALUE);
  //   fields.forEach(
  //     (field) => (storageData[field] = JSON.parse(localStorage.getItem(field)))
  //   );
  //   formatDate(storageData);
  //   this.setState(storageData);
  // }

  function handleValueChange(value, field) {
    setField[field](value);
  }

  function handleReset() {
    // this.setState(INITIAL_VALUE);
  }

  function handleSubmit(e) {
    // e.preventDefault();
    // const fields = Object.keys(INITIAL_VALUE);
    // fields.forEach((field) => {
    //   localStorage.setItem(field, JSON.stringify(this.state[field]));
    // });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        height: "100vh",
        backgroundColor: "rgba(118, 118, 118, 0.5)",
      }}
    >
      <Col
        span={9}
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
              value={name}
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
              value={country}
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
              value={colors ?? []}
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
              value={race}
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
              checked={isSwitched}
              onClick={() => {
                handleValueChange(!isSwitched, "isSwitched");
              }}
            />
          </Form.Item>
          <Form.Item name="food" label="Food">
            <Checkbox.Group
              value={foods}
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
              value={date}
            />
          </Form.Item>
          <Form.Item label="Date Range">
            <RangePicker
              onChange={(range) => handleValueChange(range, "range")}
              value={range}
            />
          </Form.Item>
          <Form.Item label="Time">
            <TimePicker
              onChange={(time) => handleValueChange(time, "time")}
              value={time}
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
