import { useState, useEffect } from "react";
import "./UserManager.scss";
import { Table } from "antd";
import userApi from "../../../api/userApi";
const UserManager = (props) => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await userApi.getUsers();
      if (res && res.EC === 0) {
        setDataSource(res.DT);
      }
    };

    fetchApi();
  }, []);
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "GroupId",
      dataIndex: "groupId",
    },
  ];
  return (
    <Table
      style={{ padding: 15 }}
      bordered
      dataSource={dataSource}
      columns={columns}
      rowKey={"id"}
    />
  );
};
export default UserManager;
