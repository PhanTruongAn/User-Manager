import { Select, Spin, Checkbox, message, Button } from "antd";
import React, { useEffect, useState } from "react";
import groupApi from "../../api/groupApi";
import roleApi from "../../api/roleApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const GroupRole = () => {
  /* eslint-disable */
  const [listGroup, setListGroup] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedRoles, setSelectedRoles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllGroup();
    fetchAllRole();
  }, []);
  const fetchAllRole = async () => {
    const res = await roleApi.getAllRole();
    if (res && res.EC === 0) {
      setListRole(res.DT);
    } else if (res.EC === -1) {
      toast.error(res.EM, { autoClose: 1000 });
      setLoading(false);
    } else if (
      res.EM === "Token invalid or expired!" ||
      res.EM === "Unauthorized!"
    ) {
      navigate("/login");
    }
    toast.error(res.EM, { autoClose: 1000 });
  };

  const fetchAllGroup = async () => {
    const res = await groupApi.getAllGroup();
    if (res && res.EC === 0) {
      setListGroup(res.DT);
      setLoading(false);
    } else if (res.EC === -1) {
      toast.error(res.EM, { autoClose: 1000 });
      setLoading(false);
    } else if (
      res.EM === "Token invalid or expired!" ||
      res.EM === "Unauthorized!"
    ) {
      navigate("/login");
    }
    toast.error(res.EM, { autoClose: 1000 });
    setLoading(false);
  };

  const getRoleByGroupId = async (value) => {
    setLoading(true);
    setSelectedGroup(value);
    const res = await groupApi.getRoleByGroup(value);
    if (res && res.EC === 0 && res.DT.Roles.length > 0) {
      setSelectedRoles(res.DT.Roles.map((role) => role.id));
      setLoading(false);
    } else if (res.DT.name === "ADMIN") {
      setSelectedRoles(listRole.map((role) => role.id));
      setLoading(false);
    } else {
      message.error("This group don't have any roles!");
      setSelectedRoles([]);
      setLoading(false);
    }
  };

  const onChange = (roleId) => {
    setSelectedRoles((prevSelected) => {
      if (prevSelected.includes(roleId)) {
        // Nếu roleId đã được chọn, bỏ chọn nó
        return prevSelected.filter((id) => id !== roleId);
      } else {
        // Nếu chưa được chọn, thêm roleId vào danh sách
        return [...prevSelected, roleId];
      }
    });
  };

  const handlerSave = async () => {
    setLoading(true);
    const data = buildDataToSave();
    const res = await roleApi.assignRoleToGroup(data);

    if (res && res.EC === 0) {
      setLoading(false);
      toast.success(res.message, { autoClose: 1000 });
    } else if (res.EC === -1) {
      setLoading(false);
      toast.error(res.EM, { autoClose: 1000 });
    } else if (
      res.EM === "Token invalid or expired!" ||
      res.EM === "Unauthorized!"
    ) {
      navigate("/login");
    }
    toast.error(res.EM, { autoClose: 1000 });
  };
  const buildDataToSave = () => {
    const result = {};
    result.groupId = selectedGroup;
    result.groupRoles = selectedRoles.map((item) => {
      let data = { groupId: selectedGroup, roleId: item };
      return data;
    });

    return result;
  };
  return (
    <div
      className="group-role-container"
      style={{ position: "relative", minHeight: "400px" }}
    >
      <div className="container">
        <div className="title m-3">
          <h2>Group Role:</h2>
          <div>
            <h6>
              Select group (<span style={{ color: "red" }}>*</span>):
            </h6>
            <Select
              style={{ width: "30%" }}
              showSearch
              placeholder="Select a group"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={listGroup.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(value) => getRoleByGroupId(value)}
            />
            <Button
              style={{ marginLeft: 20 }}
              type="primary"
              onClick={handlerSave}
            >
              Save
            </Button>
          </div>
          {selectedGroup && (
            <div className="assign-role mt-4">
              <h6>Assign Roles: </h6>
              {listRole &&
                listRole.length > 0 &&
                listRole.map((item, index) => {
                  return (
                    <div className="list-role" key={`role-${index}`}>
                      <Checkbox
                        onChange={() => onChange(item.id)}
                        checked={selectedRoles.includes(item.id)}
                      >
                        {item.url}
                      </Checkbox>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "75%",
          left: "50%",
        }}
      >
        <Spin size="middle" spinning={loading} />
      </div>
    </div>
  );
};

export default GroupRole;
