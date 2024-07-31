import {
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  // MenuOutlined,
  LogoutOutlined,
  HomeOutlined,
  ProjectOutlined,
  MessageOutlined,
  ControlOutlined,
} from "@ant-design/icons";

const items = [
  {
    key: "/admin-home",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "users",
    icon: <UsergroupAddOutlined />,
    label: "User",
  },
  {
    key: "projects",
    icon: <ProjectOutlined />,
    label: "Project",
  },
  {
    key: "roles",
    icon: <ControlOutlined />,
    label: "Role",
  },
  {
    key: "messages",
    icon: <MessageOutlined />,
    label: "Message",
  },
  {
    key: "sub",
    icon: <SettingOutlined />,
    label: "Setting",
    children: [
      {
        key: "edit-info",
        icon: <UserOutlined />,
        label: "Information",
      },
      {
        key: "log-out",
        icon: <LogoutOutlined />,
        label: "Logout",
      },
    ],
  },
];
export default items;
