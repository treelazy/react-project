import React, { useState } from "react";
import { Row, Col, Input, Radio, Form, Button } from "antd";
import { GENDERS } from "../data/const";

const itemProps = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

export default function Search({ onSearch }) {
  const [state, setState] = useState({ id: "", orgName: "", gender: "" });
  const { id, orgName, gender } = state;

  function handleChange({ target: { name, value } }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSearch() {
    onSearch({
      id: id.toUpperCase(),
      orgName: orgName.toUpperCase(),
      gender: gender.toUpperCase(),
    });
  }
  return (
    <>
      <Row type="flex" justify="center">
        <Col span={4}>
          <Form.Item label="編號" {...itemProps}>
            <Input
              name="id"
              placeholder="請輸入"
              value={id}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="組織名稱" {...itemProps}>
            <Input
              name="orgName"
              placeholder="請輸入"
              value={orgName}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="性別" {...itemProps}>
            <Radio.Group name="gender" value={gender} onChange={handleChange}>
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
        <Button type="primary" icon="search" onClick={handleSearch}>
          搜尋
        </Button>
      </Row>
    </>
  );
}
