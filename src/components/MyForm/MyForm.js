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

const spaceRight = { marginRight: 10 };
const border = { border: "1px solid rgb(200, 200, 200)", borderRadius: "3px" };

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

  const halfWidth = { width: "50%" };

  return (
    <Form colon={false}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        {isEditMode ? "修改資料" : "新增資料"}
      </h1>
      <Row type="flex">
        <Col xs={{ span: 24 }} md={{ span: 12, order: 1 }} xl={{ span: 8 }}>
          <MyFormItem
            name="tag"
            className="required"
            label="編號"
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
          >
            {({ field, meta }) => (
              <Input
                {...field}
                addonAfter={`${meta.value?.length}/10`}
                placeholder="請輸入"
                disabled={isEditMode}
              />
            )}
          </MyFormItem>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12, order: 2 }} xl={{ span: 8 }}>
          <MyFormItem
            name="orgName"
            className="required"
            label="組織名稱"
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
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
        <Col
          xs={{ span: 24 }}
          md={{ span: 12, order: 3 }}
          xl={{ span: 8 }}
          span={8}
        >
          <MyFormItem
            name="weight"
            type="number"
            label="重量"
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
          >
            {({ field }) => (
              <MyInputNumber
                {...field}
                defaultValue={0}
                min={0}
                addonAfter="kg"
                style={{ width: "calc(100% - 2.5rem)" }}
              />
            )}
          </MyFormItem>
        </Col>
        <Col span={24} md={{ order: 5 }}>
          <MyFormItem
            name="description"
            className="required"
            label="描述"
            labelCol={{ sm: { span: 4, offset: 0 }, md: { span: 2 } }}
            wrapperCol={{ sm: { span: 18 }, md: { span: 21 } }}
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

        <Col
          xs={{ span: 24 }}
          md={{ span: 12, order: 4 }}
          xl={{ span: 8, order: 5 }}
          span={8}
        >
          <MyFormItem
            name="instruction"
            label="使用方式"
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
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
        <Col
          xs={{ span: 24 }}
          md={{ span: 12, order: 6 }}
          xl={{ span: 8 }}
          span={8}
        >
          <Form.Item
            className={values?.max?.isActive ? "required" : ""}
            label={"上限"}
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
          >
            <MyFormItem
              name="max.isActive"
              type="switch"
              style={{ display: "inline-block", width: "20%", marginBottom: 0 }}
            >
              {({ field }) => (
                <Switch
                  {...field}
                  onChange={(bool) =>
                    setValues({ ...values, max: { isActive: bool, value: "" } })
                  }
                  style={{ width: "70%" }}
                />
              )}
            </MyFormItem>
            <MyFormItem
              name="max.value"
              style={{ display: "inline-block", width: "80%", marginBottom: 0 }}
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
        <Col
          xs={{ span: 24 }}
          md={{ span: 12, order: 7 }}
          xl={{ span: 8 }}
          span={8}
        >
          <MyFormItem
            name="colors"
            type="select"
            className="required"
            label="顏色"
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
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

        <Col
          xs={{ span: 24 }}
          md={{ span: 12, order: 8 }}
          xl={{ span: 8 }}
          lg={12}
        >
          <MyFormItem
            name="start"
            type="date"
            label="開始時間"
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
          >
            {({ field, meta, helpers }) => (
              <>
                <DatePicker
                  {...field}
                  placeholder="請選擇日期"
                  disabledDate={(current) => {
                    if (values?.end == null) {
                      return false;
                    }
                    return current.isAfter(values?.end, "day");
                  }}
                  style={halfWidth}
                />
                <TimePicker
                  {...field}
                  placeholder="請選擇時間"
                  onChange={(time) => {
                    handleTimeChange(time, meta.value, helpers);
                  }}
                  style={halfWidth}
                />
              </>
            )}
          </MyFormItem>
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 12, order: 8 }}
          xl={{ span: 8 }}
          lg={12}
        >
          <MyFormItem
            name="end"
            type="date"
            label="結束時間"
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
          >
            {({ field, meta, helpers }) => (
              <>
                <DatePicker
                  {...field}
                  placeholder="請選擇日期"
                  disabledDate={(current) => {
                    if (values?.start == null) {
                      return false;
                    }
                    return current.isBefore(values?.start, "day");
                  }}
                  style={halfWidth}
                />
                <TimePicker
                  {...field}
                  placeholder="請選擇時間"
                  onChange={(time) => {
                    handleTimeChange(time, meta.value, helpers);
                  }}
                  style={halfWidth}
                />
              </>
            )}
          </MyFormItem>
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 12, order: 9 }}
          xl={{ span: 8 }}
          span={8}
        >
          <MyFormItem
            name="price"
            type="number"
            className="required"
            label="價格"
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
          >
            {({ field }) => (
              <MyInputNumber
                {...field}
                addonAfter={"NTD"}
                defaultValue={0}
                min={0}
                style={{ width: "calc(100% - 3.5rem)" }}
              />
            )}
          </MyFormItem>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12, order: 10 }} xl={8} span={8}>
          <MyFormItem
            name="gender"
            label="性別"
            labelCol={{ sm: { span: 4, offset: 0 } }}
            wrapperCol={{ sm: { span: 18 } }}
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
      <Row type="flex" justify="center">
        <Col
          xs={{ span: 6, order: 2 }}
          sm={{ span: 4 }}
          lg={{ span: 2 }}
          style={{ marginRight: 10, marginTop: 10 }}
        >
          {/* a button used for demo only, to save time typing data manually */}
          <Button
            block
            onClick={() => {
              setValues({ ...values, ...DEV_INITIAL_VALUE });
            }}
            style={spaceRight}
          >
            快速
          </Button>
        </Col>
        {!isEditMode && (
          <Col
            xs={{ span: 6, order: 3 }}
            sm={{ span: 4 }}
            lg={{ span: 2 }}
            style={{ marginRight: 10, marginTop: 10 }}
          >
            <Button block onClick={() => resetForm({ values: INITIAL_VALUE })}>
              重設
            </Button>
          </Col>
        )}
        <Col
          xs={{ span: 6, order: 4 }}
          sm={{ span: 4 }}
          lg={{ span: 2 }}
          style={{ marginRight: 10, marginTop: 10 }}
        >
          <Button block onClick={handleCancel} style={spaceRight}>
            取消
          </Button>
        </Col>
        <Col
          xs={{ span: 19, order: 1 }}
          sm={{ span: 4, order: 4 }}
          lg={{ span: 2 }}
          style={{ marginRight: 10, marginTop: 10 }}
        >
          <Button block type="primary" onClick={submitForm}>
            送出
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
