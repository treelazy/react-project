import React, { Component } from "react";
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

export default class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_VALUE;

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const storageData = {};
    const fields = Object.keys(INITIAL_VALUE);
    fields.forEach(
      (field) => (storageData[field] = JSON.parse(localStorage.getItem(field)))
    );
    formatDate(storageData);
    this.setState(storageData);
  }

  handleValueChange(value, field) {
    this.setState({ [field]: value });
  }

  handleReset() {
    this.setState(INITIAL_VALUE);
  }

  handleSubmit(e) {
    e.preventDefault();
    const fields = Object.keys(INITIAL_VALUE);
    fields.forEach((field) => {
      localStorage.setItem(field, JSON.stringify(this.state[field]));
    });
  }

  render() {
    const {
      name,
      country,
      colors,
      race,
      isSwitched,
      foods,
      date,
      range,
      time,
    } = this.state;
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
            borderRadius: "1rem"
          }}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <h1 style={{ textAlign: "center" }}>MyForm</h1>
            <Form.Item label="Name">
              <Input
                placeholder="Please enter your name"
                value={name}
                onChange={(e) => {
                  this.handleValueChange(e.target.value, "name");
                }}
              />
            </Form.Item>
            <Form.Item name="country" label="Country">
              <Select
                placeholder="Please select a country"
                onChange={(country) => {
                  this.handleValueChange(country, "country");
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
                  this.handleValueChange(colors, "colors");
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
                  this.handleValueChange(e.target.value, "race");
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
                  this.handleValueChange(!isSwitched, "isSwitched");
                }}
              />
            </Form.Item>
            <Form.Item name="food" label="Food">
              <Checkbox.Group
                value={foods}
                onChange={(foods) => {
                  this.handleValueChange(foods, "foods");
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
                onChange={(date) => this.handleValueChange(date, "date")}
                value={date}
              />
            </Form.Item>
            <Form.Item label="Date Range">
              <RangePicker
                onChange={(range) => this.handleValueChange(range, "range")}
                value={range}
              />
            </Form.Item>
            <Form.Item label="Time">
              <TimePicker
                onChange={(time) => this.handleValueChange(time, "time")}
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
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button onClick={this.handleReset}>Reset</Button>
            </Form.Item>
          </Form>
        </Col>
      </div>
    );
  }
}
