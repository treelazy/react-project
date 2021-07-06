import React from "react";
import { Row, Col, Input, Radio, Form, Button } from "antd";
import { GENDERS } from "../data/const";

const itemProps = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
export default function Search() {
  return (
    <>
      <Row type="flex" justify="center">
        <Col span={4}>
          <Form.Item name="id" label="編號" {...itemProps}>
            <Input placeholder="請輸入" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="id" label="組織名稱" {...itemProps}>
            <Input placeholder="請輸入" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="id" label="性別" {...itemProps}>
            <Radio.Group>
              {GENDERS.map((g) => (
                <Radio key={g.key} value={g.value}>
                  {g.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Button>清除</Button>
        <Button type="primary" icon="search">
          搜尋
        </Button>
      </Row>
    </>
  );
}
