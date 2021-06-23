import React from "react";
import { Modal, Button, Row } from "antd";
import { useFormikContext } from "formik";
import MyForm from "./MyForm";

export default function MyFormWitModal({ visible, onCancel, isEditMode }) {
  const { submitForm, resetForm } = useFormikContext();

  function handleCancel() {
    onCancel();
    resetForm();
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
        <Row type="flex" justify="center">
          <Button key="reset" onClick={resetForm}>
            Reset
          </Button>
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button key="submit" type="primary" onClick={submitForm}>
            Submit
          </Button>
        </Row>
      }
    >
      <MyForm visible={visible} onCancel={onCancel} isEditMode={isEditMode} />
    </Modal>
  );
}
