import React from "react";
import { Row, Col, Input, Radio, Form, Button } from "antd";
import { GENDERS } from "../data/const";

const itemProps = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

export default function Search({
  searchTerm: { tag, orgName, gender },
  onSearch,
  onSearchChange,
  onClear,
}) {
  function handleSearch() {
    onSearch({
      tag: tag.toUpperCase(),
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
              name="tag"
              placeholder="請輸入"
              value={tag}
              onChange={onSearchChange}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="組織名稱" {...itemProps}>
            <Input
              name="orgName"
              placeholder="請輸入"
              value={orgName}
              onChange={onSearchChange}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="性別" {...itemProps}>
            <Radio.Group name="gender" value={gender} onChange={onSearchChange}>
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
        <Button onClick={onClear}>清除</Button>
        <Button type="primary" icon="search" onClick={handleSearch}>
          搜尋
        </Button>
      </Row>
    </>
  );
}
