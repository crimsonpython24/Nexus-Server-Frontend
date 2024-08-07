import { ArrowLeftOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button, Form, Input, Typography, message } from 'antd';
import { type NoticeType } from 'antd/es/message/interface';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { usePopupContext } from '../../components/PopupContextConst';
import { UserContext } from '../../components/UserContext.tsx';
import {
  type HCaptchaType,
  type SignupPayload,
  type SignupResult,
} from '../../util/types';
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

const fetcher = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/http://api.fulcrum-ai.dev:11451/`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  validateStatus: (status) => {
    return status <= 500;
  },
});

const signup = async (
  username: string,
  email: string,
  password: string,
  token: string
): Promise<SignupResult> => {
  const body = { username, email, password, token };
  const response = await fetcher.post(`/register`, JSON.stringify(body));
  const result: SignupResult = response.data;
  return result;
};

const HCaptchaNew = HCaptcha as object as new () => HCaptchaType;

const App: React.FC = () => {
  const [regVerified, setRegVerified] = useState(false);
  const userState = useContext(UserContext);
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { setShowMessage, setMessageType } = usePopupContext();

  const showPopupMessage = async (
    type: NoticeType,
    content: string
  ): Promise<void> => {
    try {
      await messageApi.open({
        type,
        content,
      });
      setShowMessage(false);
    } catch (error) {
      console.error('Failed to show popup message:', error);
    }
  };

  useEffect(() => {
    if (userState?.user.username !== '') {
      setMessageType('loginredirecterror');
      setShowMessage(true);
      nav('/');
    }
  }, [userState?.user.username, nav, setShowMessage, setMessageType]);

  const onFinish = (values: SignupPayload): void => {
    signup(values.username, values.email, values.password, values.token)
      .then((result) => {
        if (result.status) {
          console.log(result);
          setMessageType('signupsuccess');
          setShowMessage(true);
          nav('/login');
        } else {
          void showPopupMessage('error', result.msg);
        }
      })
      .catch((error: string) => {
        void showPopupMessage('error', 'Error in server: ' + error);
      });
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
      {userState?.user.username === '' && (
        <>
          {contextHolder}
          <RouterLink to="/">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              className="go-back"
            >
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
                name="username"
                label="Username"
                rules={[
                  { required: true, message: 'Username cannot be empty' },
                ]}
              >
                <Input />
              </Form.Item>

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
                rules={[
                  { required: true, message: 'Password cannot be empty' },
                ]}
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
                      if (
                        value === null ||
                        getFieldValue('password') === value
                      ) {
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
                  By clicking the &quot;Register&quot; button, you confirmed to
                  be at least the age of 18, and have read and agree to our{' '}
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
      )}
    </>
  );
};

export default App;
