import { useState, useEffect } from "react";
import "./UserManager.scss";
import { Table } from "antd";
import userApi from "../../../api/userApi";
import { toast } from "react-toastify";
const UserManager = (props) => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await userApi.getUsers();
      if (res && res.EC === 0) {
        setDataSource(res.DT);
      } else {
        toast.error(res.EM);
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
