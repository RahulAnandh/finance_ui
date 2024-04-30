import { useEffect, useState, useRef } from "react";
import "./index.css";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/user/userSlice";
import { getUserData, getUserError } from "../../features/user/userSlice";
import { getUserStatus } from "../../features/user/userSlice";
const LoginPageIndex = () => {
  const user_data = useSelector(getUserData);
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const loadingStatus = useSelector(getUserStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);
    dispatch(loginUser({ user: values })).unwrap();
  };

  const [open, setOpen] = useState(true);
  useEffect(() => {}, [loadingStatus]);
  return (
    <>
      <Modal
        open={open}
        title="User Login"
        footer={false}
        closable={false}
        maskClosable={false}
        width={350}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="user_name"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loadingStatus === "loading" ? true : false}
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default LoginPageIndex;
