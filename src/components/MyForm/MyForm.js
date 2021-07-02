import React from "react";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
  Select,
  Row,
  Button,
  TimePicker,
  DatePicker,
} from "antd";
import { useFormikContext } from "formik";
import {
  COLORS,
  GENDERS,
  DEV_INITIAL_VALUE,
  INITIAL_VALUE,
  DELAY_TIME,
} from "../../data/const";
import { useChineseCharsCount } from "./hooks/hooks";
import MyFormItem from "./MyFormItem";
import MyInputNumber from "./MyInputNumber";

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

  const chineseCharsCounts = useChineseCharsCount(values?.description);

  function getValidationProps(field) {
    return {
      name: field,
      validateStatus: touched[field] && errors[field] && "error",
      help: touched[field] && errors[field],
    };
  }
  function getFieldProps(field) {
    return {
      value: values?.[field],
      onChange: (arg) => {
        let value = arg.target ? arg.target.value : arg;
        setFieldValue(field, value);
      },
      onBlur: () => {
        setFieldTouched(field, true);
      },
    };
  }

  function handleCancel() {
    onCancel();
    // delay the data update to avoid showing unfriendly data to user
    setTimeout(() => resetForm({ values: INITIAL_VALUE }), DELAY_TIME);
  }

  return (
    <Form colon={false}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        {isEditMode ? "修改資料" : "新增資料"}
      </h1>
      <Row gutter={gutter}>
        <Col span={8}>
          <MyFormItem
            name="tag"
            className="required"
            label="編號"
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 18 }}
          >
            {({ field, meta }) => (
              <Input
                {...field}
                addonAfter={`${meta.value?.length}/10`}
                placeholder="請輸入"
              />
            )}
          </MyFormItem>
        </Col>
        <Col span={8}>
          <MyFormItem
            name="orgName"
            label="組織名稱"
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 18 }}
          >
            {({ field, meta }) => (
              <Input
                {...field}
                addonAfter={`${meta.value?.length}/30`}
                placeholder="請輸入"
              />
            )}
          </MyFormItem>
        </Col>
        <Col span={8}>
          <MyFormItem
            name="weight"
            type="number"
            label="重量"
            labelCol={{ span: 4, offset: 0 }}
            wrapperCol={{ span: 20 }}
          >
            {({ field }) => (
              <MyInputNumber
                {...field}
                defaultValue={0}
                style={{ width: "55%" }}
                addonAfter="kg"
              />
            )}
          </MyFormItem>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={22}>
          <MyFormItem
            name="description"
            className="required"
            label="描述"
            labelCol={{ span: 2, offset: 0 }}
            wrapperCol={{ span: 22 }}
            help={`${chineseCharsCounts}/3000 ${
              touched?.description && errors?.description
            }`.replace("undefined", "")}
          >
            {({ field }) => (
              <Input.TextArea
                {...field}
                defaultValue="請輸入"
                autoSize={{ minRows: 5 }}
              />
            )}
          </MyFormItem>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={8}>
          <MyFormItem
            name="instruction"
            label="使用方式"
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 18 }}
          >
            {({ field }) => (
              <Input
                {...field}
                addonAfter={`${values?.instruction?.length}/15`}
                defaultValue="請輸入"
              />
            )}
          </MyFormItem>
        </Col>
        <Col span={8}>
          <Form.Item
            className="required"
            label={"上限"}
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 18 }}
          >
            <MyFormItem
              name="max.isActive"
              type="switch"
              style={{ display: "inline-block", width: "20%" }}
            >
              {({ field }) => (
                <Switch
                  {...field}
                  onChange={(bool) =>
                    setValues({ ...values, max: { isActive: bool, value: "" } })
                  }
                />
              )}
            </MyFormItem>
            <MyFormItem
              name="max.value"
              style={{ display: "inline-block", width: "80%" }}
            >
              {({ field, meta }) => (
                <Input
                  {...field}
                  addonAfter={`${meta.value?.length}/10`}
                  defaultValue="請輸入"
                  disabled={!values?.max?.isActive}
                />
              )}
            </MyFormItem>
          </Form.Item>
        </Col>
        <Col span={8}>
          <MyFormItem
            name="colors"
            type="select"
            className="required"
            label="顏色"
            labelCol={{ span: 4, offset: 0 }}
            wrapperCol={{ span: 14 }}
          >
            {({ field }) => (
              <Select {...field} mode="multiple">
                {COLORS.map(({ key, value, name }) => (
                  <Select.Option key={key} value={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </MyFormItem>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={8}>
          <Form.Item
            label={"開始時間"}
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 18 }}
            {...getValidationProps("start")}
          >
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 0.5rem)",
                marginRight: "1rem",
              }}
            >
              <DatePicker
                placeholder="請選擇日期"
                value={values?.start}
                onChange={(date) => {
                  setFieldValue("start", date);
                }}
                onOpenChange={(isOpen) => {
                  if (!isOpen) {
                    setTimeout(() => setFieldTouched("start", true));
                  }
                }}
                disabledDate={(current) => {
                  if (values?.end == null) {
                    return false;
                  }
                  return current >= values?.end;
                }}
              />
            </Form.Item>
            <Form.Item
              style={{ display: "inline-block", width: "calc(50% - 0.5rem)" }}
            >
              <TimePicker
                placeholder="請選擇時間"
                onChange={(time) => {
                  setFieldValue("start", time);
                }}
                onBlur={() => {
                  setFieldTouched("start", true);
                }}
                value={values?.start}
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={"結束時間"}
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 18 }}
            {...getValidationProps("end")}
          >
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 0.5rem)",
                marginRight: "1rem",
              }}
            >
              <DatePicker
                placeholder="請選擇日期"
                value={values?.end}
                onChange={(date) => {
                  setFieldValue("end", date);
                }}
                onOpenChange={(isOpen) => {
                  if (!isOpen) {
                    setTimeout(() => setFieldTouched("end", true));
                  }
                }}
                disabledDate={(current) => {
                  if (values?.start == null) {
                    return false;
                  }
                  return current <= values?.start;
                }}
              />
            </Form.Item>
            <Form.Item
              style={{ display: "inline-block", width: "calc(50% - 0.5rem)" }}
            >
              <TimePicker
                placeholder="請選擇時間"
                onChange={(time) => {
                  setFieldValue("end", time);
                }}
                onBlur={() => {
                  setFieldTouched("end", true);
                }}
                value={values?.end}
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            className="required"
            label={"性別"}
            labelCol={{ span: 4, offset: 0 }}
            wrapperCol={{ span: 20 }}
            {...getValidationProps("gender")}
          >
            <Radio.Group {...getFieldProps("gender")}>
              {GENDERS.map((g) => (
                <Radio key={g.key} value={g.value}>
                  {g.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col offset={0} span={2}>
          <Button
            // a button used for demo only, to save time typing data manually
            onClick={() => {
              setValues({ ...values, ...DEV_INITIAL_VALUE });
            }}
          >
            快速
          </Button>
        </Col>
        <Col span={12}>
          {!isEditMode && (
            <Button onClick={() => resetForm({ values: INITIAL_VALUE })}>
              重設
            </Button>
          )}
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" onClick={submitForm}>
            送出
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
