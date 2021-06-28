import React from "react";
import {
  Col,
  Form,
  Input,
  InputNumber,
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

const gutter = { xs: 4, sm: 8, md: 16, lg: 24 };
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
      wrapClassName={"modal-wrapper"}
      width={"100%"}
      visible={visible}
      onCancel={handleCancel}
      okText={"Submit"}
      cancelText={"Cancel"}
      onOk={submitForm}
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
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>新增資料</h1>
        <Row gutter={gutter}>
          <Col span={8}>
            <Form.Item
              label={"編號"}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18 }}
            >
              <Input addonAfter="0/10" defaultValue="請輸入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"組織名稱"}
              labelCol={{ span: 8, offset: 0 }}
              wrapperCol={{ span: 16 }}
            >
              <Input addonAfter="0/30" defaultValue="請輸入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"重量"}
              labelCol={{ span: 4, offset: 0 }}
              wrapperCol={{ span: 20 }}
            >
              <InputNumber
                addonAfter="0/10"
                defaultValue="請輸入"
                style={{ width: "55%" }}
              />
              <div
                className="ant-input-group-addon"
                style={{
                  paddingTop: "2px",
                  verticalAlign: "middle",
                  display: "inline-table",
                  lineHeight: "24px",
                  height: "32px",
                  position: "relative",
                  top: "-2px",
                }}
              >
                kg
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={22}>
            <Form.Item
              label={"描述"}
              labelCol={{ span: 2, offset: 0 }}
              wrapperCol={{ span: 22 }}
            >
              <Input.TextArea defaultValue="請輸入" autoSize={{ minRows: 5 }} />
              <div style={{ lineHeight: "1rem" }}>
                <span>0/3000</span>
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={8}>
            <Form.Item
              label={"使用方式"}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18 }}
            >
              <Input addonAfter="0/15" defaultValue="請輸入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"上限"}
              labelCol={{ span: 8, offset: 0 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item style={{ display: "inline-block", width: "20%" }}>
                <Switch />
              </Form.Item>
              <Form.Item style={{ display: "inline-block", width: "80%" }}>
                <Input addonAfter="0/30" defaultValue="請輸入" />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"顏色"}
              labelCol={{ span: 4, offset: 0 }}
              wrapperCol={{ span: 14 }}
            >
              <Select mode="multiple">
                {COLORS.map(({ id, value, name }) => (
                  <Select.Option key={id} value={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={8}>
            <Form.Item
              label={"開始時間"}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18 }}
            >
              <Form.Item
                style={{ display: "inline-block", width: "calc(50% - 0.5rem)" }}
              >
                <DatePicker placeholder="請選擇日期" />
              </Form.Item>
              <span
                style={{
                  display: "inline-block",
                  width: "1rem",
                  textAlign: "center",
                }}
              >
                ~
              </span>
              <Form.Item
                style={{ display: "inline-block", width: "calc(50% - 0.5rem)" }}
              >
                <TimePicker placeholder="請選擇時間" />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"結束時間"}
              labelCol={{ span: 6, offset: 2 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                style={{ display: "inline-block", width: "calc(50% - 1rem)" }}
              >
                <DatePicker placeholder="請選擇日期" />
              </Form.Item>
              <span
                style={{
                  display: "inline-block",
                  width: "1rem",
                  textAlign: "center",
                }}
              >
                ~
              </span>
              <Form.Item
                style={{ display: "inline-block", width: "calc(50% - 1rem)" }}
              >
                <TimePicker placeholder="請選擇時間" />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"性別"}
              labelCol={{ span: 4, offset: 0 }}
              wrapperCol={{ span: 20 }}
            >
              <Radio.Group>
                <Radio value={"M"}>男性</Radio>
                <Radio value={"F"}>女性</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
