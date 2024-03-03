import { ArrowLeftOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

interface HCaptchaFix extends React.Component {}
const HCaptchaNew = HCaptcha as object as new () => HCaptchaFix;

const App: React.FC = () => {
  const [logVerified, setlogVerified] = useState(false);
  const onFinish = (values: object): void => {
    console.log(values);
  };
  const HCaptchaProps = {
    sitekey: '81558575-6ce2-4a8b-aca8-06ac95dbec14',
    theme: 'light',
    onVerify: () => {
      setlogVerified(true);
      console.log('here');
    },
  };

  return (
    <>
      <Link to="/">
        <Button type="text" icon={<ArrowLeftOutlined />} className="go-back">
          Go Back
        </Button>
      </Link>
      <div className="login-form-parent">
        <Form.Item>
          <Typography.Title className="hor-center-item" level={3}>
            Nexus-Client
          </Typography.Title>
        </Form.Item>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className="login-form-forgot" to="/reset-password">
              Forgot Password?
            </Link>
          </Form.Item>

          <Form.Item className="tail-form-items hor-center-item">
            <HCaptchaNew {...HCaptchaProps} />
          </Form.Item>

          <Form.Item>
            {logVerified && (
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            )}
            {!logVerified && (
              <Button
                type="primary"
                className="login-form-button"
                disabled={true}
              >
                Solve Captcha
              </Button>
            )}

            <span className="hor-center-item">
              No account? <Link to="/signup">Sign up</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default App;
