import React, { useState } from "react";
import "./Role.scss";
import _ from "lodash";
import { Button, Input, Space, message } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import roleApi from "../../api/roleApi";
import TableRole from "./TableRole";
/* eslint-disable */
const Role = () => {
  const defaultValue = { url: "", description: "", validUrl: true };
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [listChild, setListChild] = useState({
    child1: defaultValue,
  });
  const handlerOnChange = (name, value, key) => {
    const _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;
    if (value && name === "url" && value.length > 0) {
      _listChild[key]["validUrl"] = true;
    }

    setListChild(_listChild);
  };

  const handlerAddNew = () => {
    const _listChild = _.cloneDeep(listChild);
    _listChild[`child${uuidv4()}`] = defaultValue;
    setListChild(_listChild);
  };

  const handlerDelete = (key) => {
    const _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
  };
  const buildDataToPersist = () => {
    const _listChild = _.cloneDeep(listChild);
    let result = [];
    Object.entries(_listChild).map(([key, value], index) => {
      result.push({
        url: value.url,
        description: value.description,
      });
    });
    return result;
  };
  const handlerSave = async () => {
    const invalidObj = Object.entries(listChild).find(([key, value], index) => {
      return value && !value.url;
    });

    if (!invalidObj) {
      const data = buildDataToPersist();
      const result = await roleApi.createRole(data);
      if (result && result.EC === 0) {
        toast.success(result.message, { autoClose: 1000 });
        setLoading(!loading);
      } else if (result.EC === -1) {
        toast.error(result.EM, { autoClose: 1000 });
      } else {
        toast.error(result.EM, { autoClose: 1000 });
      }
    } else {
      messageApi.error("Input URL must not be empty!");
      const _listChild = _.cloneDeep(listChild);
      const key = invalidObj[0];
      _listChild[key]["validUrl"] = false;
      setListChild(_listChild);
    }
  };
  return (
    <>
      <div className="role-container">
        {contextHolder}
        <div className="container">
          <div className="adding-row">
            <div className="m-3 title text-center">Add a new role...</div>
            <div className="container role-father">
              {Object.entries(listChild).map(([key, child], index) => {
                return (
                  <div className="row select-role" key={`${key}-${index}`}>
                    <Space size={"large"}>
                      <Space>
                        URL:
                        <div className="input">
                          <Input
                            style={{ width: "100%" }}
                            placeholder={
                              !child.validUrl
                                ? "Please enter role url"
                                : "Input role url"
                            }
                            value={child.url}
                            onChange={(e) =>
                              handlerOnChange("url", e.target.value, key)
                            }
                            status={!child.validUrl ? "error" : null}
                            prefix={
                              !child.validUrl ? <WarningOutlined /> : null
                            }
                          />
                        </div>
                      </Space>
                      <Space>
                        Description:
                        <div className="input">
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Description url"
                            value={child.description}
                            onChange={(e) =>
                              handlerOnChange(
                                "description",
                                e.target.value,
                                key
                              )
                            }
                          />
                        </div>
                      </Space>
                      <Space>
                        <div className="icon-plus">
                          <Button
                            size="small"
                            shape="circle"
                            onClick={() => handlerAddNew()}
                          >
                            <PlusOutlined />
                          </Button>
                        </div>
                        {index >= 1 && (
                          <div className="icon-minus">
                            <Button
                              size="small"
                              shape="circle"
                              onClick={() => handlerDelete(key)}
                            >
                              <MinusOutlined />
                            </Button>
                          </div>
                        )}
                        <div className="icon-minus"></div>
                      </Space>
                    </Space>
                  </div>
                );
              })}
            </div>
            <div className="btn-save">
              <Button type="primary" onClick={() => handlerSave()}>
                Save
              </Button>
            </div>
          </div>
          <div className="table-container container">
            <TableRole loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
