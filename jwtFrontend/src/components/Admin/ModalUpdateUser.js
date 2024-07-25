import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import _ from "lodash";
import groupApi from "../../api/groupApi";
const { Option } = Select;
const ModalUpdateUser = React.memo((props) => {
  const [form] = Form.useForm(); // Tạo form instance
  const [listGroup, setListGroup] = useState([]);
  const fetchAllGroup = async () => {
    const data = await groupApi.getAllGroup();
    if (data && data.EC === 0) {
      setListGroup(data.DT);
    }
  };
  useEffect(() => {
    if (props.userSelect) {
      const userData = _.cloneDeep(props.userSelect);
      form.setFieldsValue({
        ...userData,
        groupId: userData.Group ? userData.Group.id : null,
      });
    }
  }, [props.userSelect, form]);

  useEffect(() => {
    fetchAllGroup();
  }, []);
  const onSubmit = async () => {
    const cpususer = _.cloneDeep(form.getFieldValue());
    const res = await userApi.updateUser(cpususer);
    if (res && res.EC === 0) {
      toast.success(res.message, { autoClose: 1000 });
      props.fetchApi();
      props.onCancel();
    } else {
      toast.warning(res.message);
    }
  };
  return (
    <>
      <Modal
        open={props.open}
        title="Update User"
        onCancel={props.onCancel}
        loading={props.loading}
        onOk={onSubmit}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={form.setFieldsValue({
            ...props.userSelect,
            groupId: props.userSelect.Group ? props.userSelect.Group.id : null,
          })}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter email",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter email"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter phone number",
                  },
                ]}
              >
                <Input placeholder="Please enter phone number" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="address" label="Address">
                <Input placeholder="Please enter address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sex" label="Sex">
                <Select placeholder="Please select sex">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="groupId"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: "Please select role",
                  },
                ]}
              >
                <Select placeholder="Please select role">
                  {listGroup &&
                    listGroup.length > 0 &&
                    listGroup.map((item, index) => {
                      return (
                        <Option key={index} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
});

export default ModalUpdateUser;
