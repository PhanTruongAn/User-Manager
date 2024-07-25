import {
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  MenuOutlined,
} from "@ant-design/icons";
const items = [
  {
    key: "/admin-home",
    icon: <UserOutlined />,
    label: "Admin",
  },
  {
    key: "users",
    icon: <UsergroupAddOutlined />,
    label: "User",
  },
  {
    key: "3",
    icon: <MenuOutlined />,
    label: "Project",
  },
  {
    key: "4",
    icon: <MenuOutlined />,
    label: "Role",
  },
  {
    key: "5",
    icon: <MenuOutlined />,
    label: "Group",
  },
  {
    key: "sub",
    icon: <SettingOutlined />,
    label: "Setting",
    children: [
      {
        key: "item1",
        icon: <SettingOutlined />,
        label: "Edit Information",
      },
      {
        key: "item2",
        icon: <SettingOutlined />,
        label: "Logout",
      },
    ],
  },
];
export default items;
