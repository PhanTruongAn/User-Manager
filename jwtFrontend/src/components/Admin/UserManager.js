import { useState, useEffect } from "react";
import { Table, Tag, Space, Button, message } from "antd";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalCreateUser from "./ModalCreateUser";
import { Pagination } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
const UserManager = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  /* eslint-disable */
  const [messageApi, contextHolder] = message.useMessage();
  const [limitUser, setLimitUser] = useState(5);
  const [totalRows, setTotalRows] = useState();
  const [totalPages, setTotalPages] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [userSelect, setUserSelect] = useState({});
  const [spinIcon, setSpinIcon] = useState(false);
  //Fetch data users
  useEffect(() => {
    fetchApi();
  }, [currentPage]);
  const fetchApi = async () => {
    const res = await userApi.getUsers(+currentPage, +limitUser);
    console.log("Pagination: ", res.DT);
    if (res && res.EC === 0) {
      setDataSource(res.DT.users);
      setTotalRows(res.DT.totalRows);
      setTotalPages(res.DT.totalPages);
      setLoadingData(false);
      setSpinIcon(false);
    } else if (res.EC === -1) {
      setDataSource([]);
      setLoadingData(false);
      setSpinIcon(false);
    }
    toast.error(res.EM, { autoClose: 1000 });
  };
  const showDrawer = (record) => {
    setUserSelect(record);
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Cân nhắc việc xử lý loading theo cách khác
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDeleteUser = async (record) => {
    const user = {
      id: record.id,
    };
    const res = await userApi.deleteUser(user);
    console.log("Res:", res);
    if (res && res.EC === 0) {
      toast.success("Delete user success!", { autoClose: 500 });
      setLoadingData(true);
      fetchApi();
      if (dataSource.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (res.EC === -1) {
      toast.error(res.EM, { autoClose: 1000 });
    } else {
      toast.error(res.EM, { autoClose: 1000 });
    }
  };
  const openCreateModal = () => {
    setOpenModal(true);
  };
  const onCloseCreateModal = () => {
    setOpenModal(false);
  };
  const onSubmitCreateUser = () => {
    setOpenModal(false);
    setLoadingData(true);
    setCurrentPage(totalPages);
  };
  const onChange = (pageNumber) => {
    setLoadingData(true);
    setCurrentPage(pageNumber);
  };
  const onReloadData = async () => {
    setCurrentPage(1);
    setDataSource([]);
    setLoadingData(true);
    setSpinIcon(true);
    fetchApi();
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    { title: "Phone", dataIndex: "phone" },
    { title: "Sex", dataIndex: "sex" },
    { title: "Address", dataIndex: "address" },
    {
      title: "Role",
      dataIndex: "Group",
      render: (text, record) => {
        // Kiểm tra xem Group có tồn tại không trước khi truy cập id
        const role = record.Group ? record.Group.id : null;

        if (role === 3) {
          return <Tag color="red">ADMIN</Tag>;
        } else if (role === 1) {
          return <Tag color="processing">DEV</Tag>;
        } else if (role === 2) {
          return <Tag color="success">USER</Tag>;
        } else {
          return <Tag color="default">GUEST</Tag>; // Hoặc hiển thị một thông báo mặc định
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={(e) => showDrawer(record)}>
            Update
          </Button>
          {record.Group.name === "ADMIN" ? (
            <Button type="link" disabled>
              Delete
            </Button>
          ) : (
            <Button type="link" danger onClick={(e) => onDeleteUser(record)}>
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <Button type="link">Previous</Button>;
    }
    if (type === "next") {
      return <Button type="link">Next</Button>;
    }
    return originalElement;
  };
  return (
    <>
      <Space
        style={{
          position: "absolute",
          right: 30,
          marginTop: 10,
        }}
      >
        <Button type="primary" onClick={onReloadData}>
          <ReloadOutlined style={{ fontSize: 16 }} spin={spinIcon} /> Reload
        </Button>
        <Button onClick={openCreateModal} style={{ borderWidth: 1.5 }}>
          <PlusOutlined style={{ fontSize: 16 }} />
          Create new user
        </Button>
      </Space>
      <Table
        style={{ padding: 15, marginTop: 40 }}
        dataSource={dataSource}
        bordered
        columns={columns}
        rowKey={"id"}
        scroll={{ x: "max-content" }}
        pagination={false}
        loading={loadingData}
      />
      {dataSource.length > 0 ? (
        <Pagination
          style={{ position: "absolute", right: 100, marginTop: 30 }}
          total={totalRows}
          defaultCurrent={currentPage}
          pageSize={limitUser}
          onChange={(e) => onChange(e)}
          current={currentPage}
          itemRender={itemRender}
        />
      ) : (
        <></>
      )}
      <ModalUpdateUser
        loading={loading}
        open={open}
        onCancel={onClose}
        userSelect={userSelect}
        fetchApi={fetchApi}
      />
      <ModalCreateUser
        fetchApi={fetchApi}
        open={openModal}
        onCancel={onCloseCreateModal}
        onSubmit={onSubmitCreateUser}
      />
    </>
  );
};
export default UserManager;
