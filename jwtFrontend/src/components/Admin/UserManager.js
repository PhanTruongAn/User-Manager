import { useState, useEffect } from "react";
import { Table, Tag, Space, message, Button, Popconfirm } from "antd";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalCreateUser from "./ModalCreateUser";
import { Pagination } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "@fontsource/roboto/500.css";
const UserManager = (props) => {
  /* eslint-disable */
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
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
    const res = await userApi.getUsers(currentPage, limitUser);
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
    } else if (
      res.EM === "Token invalid or expired!" ||
      res.EM === "Unauthorized!"
    ) {
      navigate("/login");
    }
    toast.error(res.EM, { autoClose: 1000 });
  };
  const showDrawer = (record) => {
    setUserSelect(record);
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onChange = (pageNumber) => {
    setLoadingData(true);
    setCurrentPage(pageNumber);
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
    if (currentPage === totalPages && dataSource.length === 5) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage === totalPages && dataSource.length < 5) {
      setCurrentPage(currentPage);
    } else if (currentPage < totalPages && totalRows % 10 !== 0) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(totalPages + 1);
    }
  };
  const onSubmitUpdateUser = () => {
    setOpen(false);
    setLoadingData(true);
  };

  const onReloadData = async () => {
    setCurrentPage(1);
    setDataSource([]);
    setLoadingData(true);
    setSpinIcon(true);
    fetchApi();
  };

  const onPopConfirmDelete = async (record) => {
    const user = {
      id: record.id,
    };
    const res = await userApi.deleteUser(user);
    // console.log("Res:", res);
    if (res && res.EC === 0) {
      message.success("Delete user success!");
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
  const onPopConfirmCancel = () => {};
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
            <Popconfirm
              title="Delete a user"
              description="Are you sure to delete this user?"
              onConfirm={(e) => onPopConfirmDelete(record)}
              onCancel={onPopConfirmCancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
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
    <div className="container-content">
      <Space
        style={{
          position: "absolute",
          right: 30,
          marginTop: -40,
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
        style={{ padding: 15, marginTop: 50 }}
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
          showQuickJumper
        />
      ) : (
        <></>
      )}
      <ModalUpdateUser
        loading={loading}
        open={open}
        onCancel={onClose}
        onSubmit={onSubmitUpdateUser}
        userSelect={userSelect}
        fetchApi={fetchApi}
      />
      <ModalCreateUser
        fetchApi={fetchApi}
        open={openModal}
        onCancel={onCloseCreateModal}
        onSubmit={onSubmitCreateUser}
      />
    </div>
  );
};
export default UserManager;
