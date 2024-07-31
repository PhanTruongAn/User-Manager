import React, { useEffect, useState } from "react";
import { Modal, Form, Col, Row, Input, message } from "antd";
import { toast } from "react-toastify";
import _ from "lodash";
import roleApi from "../../api/roleApi";
/*eslint-disable*/
const ModalUpdateRole = (props) => {
  const [form] = Form.useForm(); // Tạo form instance
  const [initialValue, setInitialValue] = useState({});
  const setDefaultValue = () => {
    const defaultValue = _.cloneDeep(props.roleSelect);
    setInitialValue(defaultValue);
    form.setFieldsValue(defaultValue);
  };
  useEffect(() => {
    setDefaultValue();
  }, [props.roleSelect, form]);
  const onCancel = () => {
    form.setFieldsValue(initialValue); // Thiết lập lại giá trị form về giá trị mặc định
    props.onCancel();
  };
  const onSubmit = async () => {
    const cpurole = _.cloneDeep(form.getFieldValue());
    const res = await roleApi.updateRole(cpurole);
    if (res && res.EC === 0) {
      message.success(res.message);
      props.fetchApi();
      props.onSubmit();
    } else if (res.EC === -1) {
      toast.error(res.EM, { autoClose: 1000 });
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="modal-container">
      <Modal
        open={props.open}
        title="Update Role"
        onCancel={onCancel}
        // loading={props.loading}
        onOk={onSubmit}
      >
        <Form layout="vertical" form={form} initialValues={initialValue}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="url" label="URL">
                <Input placeholder="Please enter url role" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="description" label="Description">
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalUpdateRole;
