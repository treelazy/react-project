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
import { useChineseCharsCount } from "./hooks/hooks";

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

  const chineseCharsCounts = useChineseCharsCount(values.description);

  function getValidationProps(field) {
    return {
      name: field,
      validateStatus: touched[field] && errors[field] && "error",
      help: touched[field] && errors[field],
    };
  }
  function getFieldProps(field) {
    return {
      value: values[field],
      onChange: (arg) => {
        let value = arg.target ? arg.target.value : arg;
        setFieldValue(field, value);
      },
      onBlur: () => {
        setFieldTouched(field, true);
      },
    };
  }

  // when date is selected, set time to current time
  // when date is cleared, clear the time as well
  function handleDateChange(startOrEnd, date) {
    const time = date ? moment() : null;
    setValues({ ...values, [startOrEnd]: { date, time } });
  }

  // when timepicker is cleared, set time to 00:00:00
  function handleTimeChange(field, time) {
    time =
      time ||
      moment().set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
    setFieldValue(field, time);
  }

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
              {...getValidationProps("id")}
            >
              <Input
                addonAfter={`${values?.id?.length}/10`}
                placeholder="請輸入"
                {...getFieldProps("id")}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"組織名稱"}
              labelCol={{ span: 8, offset: 0 }}
              wrapperCol={{ span: 16 }}
              {...getValidationProps("orgName")}
            >
              <Input
                addonAfter={`${values?.orgName?.length}/30`}
                placeholder="請輸入"
                {...getFieldProps("orgName")}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"重量"}
              labelCol={{ span: 4, offset: 0 }}
              wrapperCol={{ span: 20 }}
              {...getValidationProps("weight")}
            >
              <InputNumber
                addonAfter="0/10"
                defaultValue="請輸入"
                style={{ width: "55%" }}
                {...getFieldProps("weight")}
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
              {...getValidationProps("description")}
            >
              <Input.TextArea
                defaultValue="請輸入"
                autoSize={{ minRows: 5 }}
                {...getFieldProps("description")}
              />
              <div className="text-area-addon" style={{ lineHeight: "1rem" }}>
                <span>{chineseCharsCounts}/3000</span>
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
              {...getValidationProps("instruction")}
            >
              <Input
                addonAfter={`${values?.instruction?.length}/15`}
                defaultValue="請輸入"
                {...getFieldProps("instruction")}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"上限"}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18 }}
            >
              <Form.Item
                style={{ display: "inline-block", width: "20%" }}
                {...getValidationProps("max.value")}
              >
                <Switch
                  checked={values?.max?.isActive}
                  onChange={(bool) => setFieldValue("max.isActive", bool)}
                />
              </Form.Item>
              <Form.Item
                style={{ display: "inline-block", width: "80%" }}
                validateStatus={
                  touched?.max?.value && errors?.max?.value && "error"
                }
                help={touched?.max?.value && errors?.max?.value}
              >
                <Input
                  addonAfter={`${values?.max?.value?.length}/10`}
                  defaultValue="請輸入"
                  value={values?.max?.value}
                  onChange={(e) => {
                    setFieldValue("max.value", e.target.value);
                  }}
                  onBlur={() => {
                    setFieldTouched("max.value", true);
                  }}
                  disabled={!values?.max?.isActive}
                />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"顏色"}
              labelCol={{ span: 4, offset: 0 }}
              wrapperCol={{ span: 14 }}
              {...getValidationProps("colors")}
            >
              <Select mode="multiple" {...getFieldProps("colors")}>
                {COLORS.map(({ key, value, name }) => (
                  <Select.Option key={key} value={value}>
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
              name={"start"}
            >
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 0.5rem)",
                  marginRight: "1rem",
                }}
                validateStatus={
                  touched?.start?.date && errors?.start?.date && "error"
                }
                help={touched?.start?.date && errors?.start?.date}
              >
                <DatePicker
                  placeholder="請選擇日期"
                  value={values?.start?.date}
                  onChange={(date) => {
                    handleDateChange("start", date);
                  }}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      setTimeout(() => setFieldTouched("start.date", true));
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                style={{ display: "inline-block", width: "calc(50% - 0.5rem)" }}
                validateStatus={
                  touched?.start?.time && errors?.start?.time && "error"
                }
                help={touched?.start?.time && errors?.start?.time}
              >
                <TimePicker
                  placeholder="請選擇時間"
                  onChange={(time) => {
                    handleTimeChange("start.time", time);
                  }}
                  onBlur={() => {
                    setFieldTouched("start.time", true);
                  }}
                  value={values?.start?.time}
                />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"結束時間"}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18 }}
            >
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 0.5rem)",
                  marginRight: "1rem",
                }}
                validateStatus={
                  touched?.end?.date && errors?.end?.date && "error"
                }
                help={touched?.end?.date && errors?.end?.date}
              >
                <DatePicker
                  placeholder="請選擇日期"
                  value={values?.end?.date}
                  onChange={(date) => {
                    handleDateChange("end", date);
                  }}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      setTimeout(() => setFieldTouched("end.date", true));
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                style={{ display: "inline-block", width: "calc(50% - 0.5rem)" }}
                validateStatus={
                  touched?.end?.time && errors?.end?.time && "error"
                }
                help={touched?.end?.time && errors?.end?.time}
              >
                <TimePicker
                  placeholder="請選擇時間"
                  onChange={(time) => {
                    handleTimeChange("end.time", time);
                  }}
                  onBlur={() => {
                    setFieldTouched("end.time", true);
                  }}
                  value={values?.end?.time}
                />
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
