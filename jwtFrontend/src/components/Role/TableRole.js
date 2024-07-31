import React, { useEffect, useState } from "react";
import { Space, Button, Popconfirm, Table, Pagination, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import roleApi from "../../api/roleApi";
import { toast } from "react-toastify";
import ModalUpdateRole from "./ModalUpdateRole";
/* eslint-disable */
const TableRole = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitRole, setLimitRole] = useState(5);
  const [totalRows, setTotalRows] = useState();
  const [totalPages, setTotalPages] = useState();
  const [spinIcon, setSpinIcon] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [roleSelected, setRoleSelected] = useState({
    url: "",
    description: "",
  });
  const fetchData = async () => {
    const res = await roleApi.getAllRole(currentPage, limitRole);
    if (res && res.EC === 0) {
      setLoadingData(false);
      setDataSource(res.DT.roles);
      setTotalRows(res.DT.totalRows);
      setSpinIcon(false);
      setTotalPages(res.DT.totalPages);
    } else if (res.EC === -1) {
      toast.error(res.EM, { autoClose: 1000 });
      setTimeout(() => {
        setLoadingData(false);
        setSpinIcon(false);
      }, 2000);
    } else {
      toast.error("Get all role fail!", { autoClose: 1000 });
      setTimeout(() => {
        setLoadingData(false);
        setSpinIcon(false);
      }, 2000);
    }
  };
  useEffect(() => {
    if (props.loading || !props.loading) {
      setLoadingData(true);
    }
    fetchData();
  }, [currentPage, props.loading]);
  const onChange = (pageNumber) => {
    setLoadingData(true);
    setCurrentPage(pageNumber);
    if (dataSource.length === 0) {
      setLoadingData(false);
    }
  };
  const reloadData = () => {
    fetchData();
    setLoadingData(true);
    setSpinIcon(true);
  };
  const onPopConfirmDelete = async (record) => {
    const role = {
      id: record.id,
    };
    const res = await roleApi.deleteRole(role);
    // console.log("Res:", res);
    if (res && res.EC === 0) {
      message.success("Delete role success!");
      setLoadingData(true);
      setSpinIcon(false);
      fetchData();
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
  const handlerOpenModal = (record) => {
    setRoleSelected(record);
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmitUpdateRole = () => {
    setOpenModal(false);
    setLoadingData(true);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 200,
    },
    {
      title: "URL",
      dataIndex: "url",
      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 500,
    },
    {
      title: "Action",
      key: "action",

      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={(e) => handlerOpenModal(record)}>
            Update
          </Button>
          <Popconfirm
            title="Delete a user"
            description="Are you sure to delete this role?"
            onConfirm={(e) => onPopConfirmDelete(record)}
            onCancel={onPopConfirmCancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
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
    <div className="table-container">
      <ModalUpdateRole
        open={openModal}
        onCancel={onCloseModal}
        roleSelect={roleSelected}
        onSubmit={onSubmitUpdateRole}
        fetchApi={fetchData}
      />
      <Button
        type="primary"
        className="btn-reload"
        icon={<ReloadOutlined spin={spinIcon} />}
        onClick={reloadData}
      >
        Reload
      </Button>
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
        <div
          className="container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Pagination
            style={{ marginLeft: "55%", paddingBottom: 10 }}
            total={totalRows}
            defaultCurrent={currentPage}
            pageSize={limitRole}
            onChange={(e) => onChange(e)}
            current={currentPage}
            itemRender={itemRender}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableRole;
