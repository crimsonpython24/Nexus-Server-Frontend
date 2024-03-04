import { ArrowLeftOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { key } from './Key.tsx';
import './Signup.css';

const { Text } = Typography;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 24, offset: 0 } },
};

interface HCaptchaFix extends React.Component {}
const HCaptchaNew = HCaptcha as object as new () => HCaptchaFix;

const App: React.FC = () => {
  const [regVerified, setRegVerified] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values: object): void => {
    console.log('Received values of form: ', values);
  };
  const HCaptchaProps = {
    sitekey: key,
    theme: 'light',
    onVerify: () => {
      setRegVerified(true);
    },
  };

  return (
    <>
      <RouterLink to="/">
        <Button type="text" icon={<ArrowLeftOutlined />} className="go-back">
          Go Back
        </Button>
      </RouterLink>
      <div className="signup-form-parent">
        <Form.Item>
          <Typography.Title className="hor-center-item" level={3}>
            Nexus-Client
          </Typography.Title>
        </Form.Item>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
          labelAlign="left"
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: 'email', message: 'Invalid E-Mail' },
              { required: true, message: 'E-mail cannot be empty' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Password cannot be empty' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (value === null || getFieldValue('password') === value) {
                    await Promise.resolve();
                    return;
                  }
                  return await Promise.reject(
                    new Error('Passwords do not match')
                  );
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item
            name="token"
            label="Token"
            tooltip="You need an invite code to register."
            rules={[{ required: true, message: 'Token cannot be empty' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            {...tailFormItemLayout}
            className="tail-form-items hor-center-item"
          >
            <HCaptchaNew {...HCaptchaProps} />
          </Form.Item>

          <Form.Item
            {...tailFormItemLayout}
            className="tail-form-items hor-center-item"
          >
            {regVerified && (
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            )}
            {!regVerified && (
              <Button type="primary" disabled={true}>
                Solve Captcha
              </Button>
            )}
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout}
            className="tail-form-text hor-center-item"
          >
            <Text type="secondary">
              By clicking the &quot;Register&quot; button, you confirmed to be
              at least the age of 18, and have read and agree to our{' '}
            </Text>

            <RouterLink to="/privacy-policy/" target="_blank">
              privacy policy{' '}
            </RouterLink>
            <Text type="secondary">and our </Text>
            <RouterLink to="/terms-of-service/" target="_blank">
              terms of service
            </RouterLink>
            <Text type="secondary">.</Text>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default App;
