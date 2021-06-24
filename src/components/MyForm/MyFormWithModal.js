import React from "react";
import { Modal, Button, Row, Col } from "antd";
import { useFormikContext } from "formik";
import MyForm from "./MyForm";
import { INITIAL_VALUE, DEV_INITIAL_VALUE } from "../../data/const";

export default function MyFormWitModal({ visible, onCancel, isEditMode }) {
  const { values, submitForm, resetForm } = useFormikContext();

  function handleCancel() {
    onCancel();
    // delay the data update to avoid showing unfriendly data to user
    setTimeout(() => resetForm({ values: INITIAL_VALUE }), 500);
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      okText={"Submit"}
      cancelText={"Cancel"}
      onOk={submitForm}
      width="45%"
      footer={
        <Row>
          <Col offset={0} span={2}>
            <Button
              // a button used for demo only, to save time typing data manually
              onClick={() =>
                resetForm({ values: { ...values, ...DEV_INITIAL_VALUE } })
              }
            >
              Cheat
            </Button>
          </Col>
          <Col span={13}>
            {isEditMode ? null : (
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
      <MyForm visible={visible} onCancel={onCancel} isEditMode={isEditMode} />
    </Modal>
  );
}
