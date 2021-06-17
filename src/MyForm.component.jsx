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

const { RangePicker } = DatePicker;

export default class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_VALUE;

    this.handleValueChange = this.handleValueChange.bind(this);
    // this.handleSwitch = this.handleSwitch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {}

  // handleSwitch(e) {
  //   this.setState((curState) => ({ isSwitched: !curState.isSwitched }));
  // }

  handleValueChange(value, field) {
    this.setState({ [field]: value });
  }

  handleReset() {
    this.setState(INITIAL_VALUE);
  }

  handleSubmit() {
    console.log("submit");
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Col span={12}>
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
                value={colors}
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
                onChange={(bool) => {
                  this.handleValueChange(bool, "isSwitched");
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
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Submit
              </Button>
              <Button htmlType="button" onClick={this.handleReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </div>
    );
  }
}
