import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
  UserAddOutlined,
  DollarOutlined,
  BellOutlined,
  LogoutOutlined,
  KeyOutlined,
  DownOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Avatar,
  Badge,
  Space,
  Dropdown,
  Flex,
  Switch,
} from "antd";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AddUserIndex from "../../components/add_user";
import DashbordIndex from "../../components/dashboard";
import PageNotFoundIndex from "../../components/page_not_found";
import LoginPageIndex from "../../components/user_login_page";
import ForgotPasswordIndex from "../../components/user_forgot_password";
import ProfileIndex from "../../components/profile_index";
import ChangePasswordIndex from "../../components/change_password";
import NotificationIndex from "../../components/notifications";
import CustomerIndex from "../../components/customer";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserData,
  getUserError,
  setThemeColor,
} from "../../features/user/userSlice";
const { Header, Sider, Content } = Layout;

const LayoutIndex = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [time, setTime] = useState(0);
  const [themeColor, changeThemeColor] = useState("#050505");

  const user_data = useSelector(getUserData);
  const application_proparties = useSelector((state) => {
    return state.user.application_proparties;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeTheme = (checked) => {
    dispatch(setThemeColor(checked ? "#050505" : "#ffffff"));
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            navigate("user/profile");
          }}
        >
          <Space size={5}>
            <UserOutlined />
            Profile
          </Space>
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            navigate("user/change_password");
          }}
        >
          <Space size={5}>
            <KeyOutlined />
            Change Password
          </Space>
        </a>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => {
            sessionStorage.clear();
            setLoginStatus(false);
          }}
        >
          <Space size={5}>
            <LogoutOutlined />
            Logout
          </Space>
        </a>
      ),
    },
  ];
  useEffect(() => {
    let result =
      sessionStorage.getItem("user_data") === null
        ? false
        : JSON.parse(sessionStorage.getItem("user_data")).login_status === "ok"
        ? true
        : false;
    setLoginStatus(result);
  }, [user_data]);
  useEffect(() => {
    console.log("1---111", application_proparties.theme_color);
  }, [application_proparties]);
  const onClick = (data) => {
    navigate(data.key);
  };
  return (
    <>
      {loginStatus ? (
        <Layout style={{ width: "100vw", height: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              onClick={onClick}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["dashboard"]}
              items={[
                {
                  key: "dashboard",
                  icon: (
                    <DashboardOutlined
                      style={collapsed ? { fontSize: "24px" } : {}}
                    />
                  ),
                  label: "Dashboard",
                  navigation_string: "dashboard",
                },
                {
                  key: "user/add",
                  icon: <UserOutlined />,
                  label: "User",
                  children: [
                    {
                      key: "user/add",
                      icon: <UserAddOutlined />,
                      label: "Add User",
                    },
                    {
                      key: "4",
                      icon: <UserOutlined />,
                      label: "User List",
                    },
                  ],
                },
                {
                  key: "customer",
                  icon: <UploadOutlined />,
                  label: "Customer",
                },
                {
                  key: "5",
                  icon: <UploadOutlined />,
                  label: "Employee",
                },
                {
                  key: "6",
                  icon: <DollarOutlined />,
                  label: "Accounting",
                  children: [
                    {
                      key: "7",
                      icon: <UserOutlined />,
                      label: "Debters List",
                    },
                    {
                      key: "8",
                      icon: <UserOutlined />,
                      label: "Crediters List",
                    },
                  ],
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <Flex width={"100%"} justify={"space-between"} align={"center"}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                <Space align="center" size={24}>
                  <Switch
                    onChange={onChangeTheme}
                    checkedChildren={<SunOutlined />}
                    unCheckedChildren={<MoonOutlined />}
                    defaultChecked
                  />
                  <Badge count={10}>
                    <BellOutlined
                      style={{ fontSize: "24px" }}
                      onClick={() => {
                        navigate("notifications");
                      }}
                    />
                  </Badge>
                  <Avatar shape="circle" icon={<UserOutlined />} />
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        {sessionStorage.getItem("user_data")
                          ? JSON.parse(sessionStorage.getItem("user_data"))
                              .user_name
                          : "User"}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </Space>
              </Flex>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                {/* <Route path="/" element={<LoginPageIndex />}></Route> */}
                {/* <Route path="layout" element={<LayoutIndex />}></Route> */}
                <Route path="/" element={<DashbordIndex />}></Route>
                <Route path="dashboard" element={<DashbordIndex />}></Route>
                <Route
                  path="notifications"
                  element={<NotificationIndex />}
                ></Route>
                <Route path="customer" element={<CustomerIndex />}></Route>
                <Route path="user/add" element={<AddUserIndex />}></Route>
                <Route path="user/profile" element={<ProfileIndex />}></Route>
                <Route
                  path="user/change_password"
                  element={<ChangePasswordIndex />}
                ></Route>
                <Route path="*" element={<PageNotFoundIndex />}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <LoginPageIndex />
      )}
    </>
  );
};
export default LayoutIndex;
