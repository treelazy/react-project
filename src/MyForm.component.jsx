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

const { RangePicker } = DatePicker;

const COUNTRIES = [
  { name: "China", value: "china" },
  { name: "U.S.A", value: "usa" },
];
const COLORS = [
  { name: "Red", value: "red" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
];
const RACES = [
  { name: "Asian", value: "asian" },
  { name: "African", value: "african" },
  { name: "Caucasian", value: "caucasian" },
];
const FOODS = [
  { name: "Rice", value: "rice" },
  { name: "Noodle", value: "noodle" },
  { name: "Meat", value: "meat" },
];
const INITIAL_VALUE = {
  name: "",
  country: "",
  colors: [],
  race: "",
  isSwitched: false,
  foods: [],
  date: null,
  range: [],
  time: null,
};

export default class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_VALUE;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSingleSelect = this.handleSingleSelect.bind(this);
    this.handleMultipleSelect = this.handleMultipleSelect.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleRange = this.handleRange.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSingleSelect(value) {
    this.setState({ country: value });
  }

  handleMultipleSelect(values) {
    this.setState({ colors: values });
  }

  handleRadio(e) {
    this.setState({ race: e.target.value });
  }

  handleSwitch(e) {
    this.setState((curState) => ({ isSwitched: !curState.isSwitched }));
  }

  handleCheckbox(values) {
    this.setState({ foods: values });
  }

  handleDate(value) {
    this.setState({ date: value });
  }

  handleRange(values) {
    this.setState({ range: values });
  }

  handleTime(value) {
    this.setState({ time: value });
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
                onChange={this.handleNameChange}
              />
            </Form.Item>
            <Form.Item
              name="country"
              label="Country"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select your country!",
                },
              ]}
            >
              <Select
                placeholder="Please select a country"
                onChange={this.handleSingleSelect}
                value={country}
              >
                {COUNTRIES.map((country) => (
                  <Select.Option key={country.value} value={country.value}>
                    {country.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="color" label="Color">
              <Select
                mode="multiple"
                placeholder="Please select favourite colors"
                onChange={this.handleMultipleSelect}
                value={colors}
              >
                {COLORS.map((color) => (
                  <Select.Option key={color.value} value={color.value}>
                    {color.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="race" label="Race">
              <Radio.Group onChange={this.handleRadio} value={race}>
                {RACES.map((race) => (
                  <Radio key={race.value} value={race.value}>
                    {race.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item name="switch" label="Switch" valuePropName="checked">
              <Switch checked={isSwitched} onChange={this.handleSwitch} />
            </Form.Item>
            <Form.Item name="food" label="Food">
              <Checkbox.Group value={foods} onChange={this.handleCheckbox}>
                {FOODS.map((food) => (
                  <Checkbox
                    key={food.value}
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
              <DatePicker onChange={this.handleDate} value={date} />
            </Form.Item>
            <Form.Item label="Date Range">
              <RangePicker onChange={this.handleRange} value={range} />
            </Form.Item>
            <Form.Item label="Time">
              <TimePicker onChange={this.handleTime} value={time} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={this.handleReset}>Reset</Button>
            </Form.Item>
          </Form>
        </Col>
      </div>
    );
  }
}
