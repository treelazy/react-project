import React from "react";
import {
  Col,
  Form,
  Input,
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

export default function MyForm({ isEditMode, onCancel }) {
  const { values, errors, touched, submitForm, setValues, resetForm } =
    useFormikContext();

  const chineseCharsCounts = useChineseCharsCount(values?.description);

  function handleCancel() {
    onCancel();
    // delay the data update to avoid showing unfriendly data to user
    setTimeout(() => resetForm({ values: INITIAL_VALUE }), DELAY_TIME);
  }
  function handleTimeChange(time, startOrEnd, helpers) {
    setTimeout(() => helpers.setTouched(true, false));
    if (!time) {
      time = startOrEnd.hours(0).minutes(0).seconds(0);
    }
    helpers.setValue(time);
  }

  return (
    <Form colon={false}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        {isEditMode ? "修改資料" : "新增資料"}
      </h1>
      <Row>
        <Col span={8}>
          <MyFormItem
            name="id"
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
            className="required"
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
      <Row>
        <Col span={22}>
          <MyFormItem
            name="description"
            className="required"
            label="描述"
            labelCol={{ span: 2, offset: 0 }}
            wrapperCol={{ span: 22 }}
            help={`${chineseCharsCounts}/3000 ${
              (touched?.description && errors?.description) ?? ""
            }`}
          >
            {({ field }) => (
              <Input.TextArea
                {...field}
                defaultValue="請輸入"
                autoSize={{ minRows: 5, maxRows: 5 }}
              />
            )}
          </MyFormItem>
        </Col>
      </Row>
      <Row>
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
      <Row>
        <Col span={8}>
          <MyFormItem
            name="start"
            type="date"
            label="開始時間"
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 18 }}
          >
            {({ field, meta, helpers }) => (
              <>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 0.5rem)",
                    marginRight: "1rem",
                    marginBottom: 0,
                  }}
                >
                  <DatePicker
                    {...field}
                    placeholder="請選擇日期"
                    disabledDate={(current) => {
                      if (values?.end == null) {
                        return false;
                      }
                      return current.isAfter(values?.end, "day");
                    }}
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 0.5rem)",
                    marginBottom: 0,
                  }}
                >
                  <TimePicker
                    {...field}
                    placeholder="請選擇時間"
                    onChange={(time) => {
                      handleTimeChange(time, meta.value, helpers);
                    }}
                  />
                </Form.Item>
              </>
            )}
          </MyFormItem>
        </Col>
        <Col span={8}>
          <MyFormItem
            name="end"
            type="date"
            label="結束時間"
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 18 }}
          >
            {({ field, meta, helpers }) => (
              <>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 0.5rem)",
                    marginRight: "1rem",
                    marginBottom: 0,
                  }}
                >
                  <DatePicker
                    {...field}
                    placeholder="請選擇日期"
                    disabledDate={(current) => {
                      if (values?.start == null) {
                        return false;
                      }
                      return current.isBefore(values?.start, "day");
                    }}
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 0.5rem)",
                    marginBottom: 0,
                  }}
                >
                  <TimePicker
                    {...field}
                    placeholder="請選擇時間"
                    onChange={(time) => {
                      handleTimeChange(time, meta.value, helpers);
                    }}
                  />
                </Form.Item>
              </>
            )}
          </MyFormItem>
        </Col>
        <Col span={8}>
          <MyFormItem
            name="gender"
            label="性別"
            labelCol={{ span: 4, offset: 0 }}
            wrapperCol={{ span: 20 }}
          >
            {({ field }) => (
              <Radio.Group {...field}>
                {GENDERS.map((g) => (
                  <Radio key={g.key} value={g.value}>
                    {g.name}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          </MyFormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <MyFormItem
            name="price"
            type="number"
            className="required"
            label="價格"
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 18 }}
          >
            {({ field }) => (
              <MyInputNumber {...field} addonAfter={"NTD"} defaultValue={0} />
            )}
          </MyFormItem>
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
