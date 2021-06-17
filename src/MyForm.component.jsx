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
  Row,
} from "antd";

export default class MyForm extends Component {
  render() {
    return (
      <Row justify="center">
        <Col span={12}>
          <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
            <h1 style={{ textAlign: "center" }}>MyForm</h1>
            <Form.Item label="Name">
              <Input placeholder="Please enter your name" />
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
              <Select placeholder="Please select a country">
                <Select.Option value="china">China</Select.Option>
                <Select.Option value="usa">U.S.A</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="color" label="Color">
              <Select
                mode="multiple"
                placeholder="Please select favourite colors"
              >
                <Select.Option value="red">Red</Select.Option>
                <Select.Option value="green">Green</Select.Option>
                <Select.Option value="blue">Blue</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="race" label="Race">
              <Radio.Group>
                <Radio value="a">Asian</Radio>
                <Radio value="b">African</Radio>
                <Radio value="c">Caucasian</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="switch" label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="food" label="Food">
              <Checkbox.Group>
                <Col span={8}>
                  <Checkbox
                    value="A"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Rice
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="B"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Noodle
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="C"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Meat
                  </Checkbox>
                </Col>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Date">
              <DatePicker />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 12,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button">Reset</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
