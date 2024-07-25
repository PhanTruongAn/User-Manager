import React, { useEffect, useState } from "react";
import groupApi from "../../api/groupApi";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import { Col, Form, Input, Modal, Row, Select, message } from "antd";
import _ from "lodash";
const { Option } = Select;
const ModalCreateUser = React.memo((props) => {
  const user = {
    username: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    sex: "",
    role: null,
  };
  const [listGroup, setListGroup] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState(user);
  const fetchAllGroup = async () => {
    const data = await groupApi.getAllGroup();
    if (data && data.EC === 0) {
      setListGroup(data.DT);
    }
  };

  useEffect(() => {
    fetchAllGroup();
  }, []);
  const handlerOnChange = (value, name) => {
    const _user = _.cloneDeep(data);
    _user[name] = value;
    setData(_user);
  };
  const onSubmit = async () => {
    const res = await userApi.createUser(data);
    if (res && res.EC === 0) {
      toast.success("Create new user success!", { autoClose: 1000 });
      props.fetchApi();
      props.onCancel();
    } else {
      messageApi.error(res.EM);
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Create New User"
        open={props.open}
        onCancel={props.onCancel}
        onOk={onSubmit}
      >
        <Form layout="vertical">
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
                <Input
                  placeholder="Please enter user name"
                  onChange={(e) => handlerOnChange(e.target.value, "username")}
                />
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
                  onChange={(e) => handlerOnChange(e.target.value, "email")}
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
                <Input
                  placeholder="Please enter phone number"
                  onChange={(e) => handlerOnChange(e.target.value, "phone")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter password",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Please enter password"
                  onChange={(e) => handlerOnChange(e.target.value, "password")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="address" label="Address">
                <Input
                  placeholder="Please enter address"
                  onChange={(e) => handlerOnChange(e.target.value, "address")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sex" label="Sex">
                <Select
                  placeholder="Please select sex"
                  onChange={(value) => handlerOnChange(value, "sex")}
                >
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
                <Select
                  placeholder="Please select role"
                  onChange={(value) => handlerOnChange(value, "role")}
                >
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

export default ModalCreateUser;
