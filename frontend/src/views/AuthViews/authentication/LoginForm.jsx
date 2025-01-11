/* eslint-disable no-unused-vars */
import { Form, Input, Button, Typography, Alert } from "antd";
import { useEffect } from "react";

import {
  authenticateUser,
  hideAuthMessage,
} from "../../../store/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

const LoginScreen = () => {
  const { loading, message, showMessage, token, redirect } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const onFinish = (values) => {
    dispatch(authenticateUser({ ...values }));
  };

  useEffect(() => {
    if (token !== null) {
      navigate(redirect);
    }
    if (showMessage) {
      const timer = setTimeout(() => dispatch(hideAuthMessage()), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showMessage]);

  return (
    <div>
      <Title className="text-center" level={3}>
        Get Started
      </Title>

      {message && <Alert message={message} showIcon type="error" />}
      <div className="mt-3">
        <Form name="auth" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              className="mt-3"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Log in / Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
