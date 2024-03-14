import { ArrowLeftOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button, Form, Input, Typography, message } from 'antd';
import { type NoticeType } from 'antd/es/message/interface';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { usePopupContext } from '../../components/PopupContextConst';
import {
  UserContext,
  UserDispatchContext,
} from '../../components/UserContext.tsx';
import {
  type HCaptchaType,
  type LoginPayload,
  type LoginResult,
  type ModifiedLoginPayload,
} from '../../util/types';
import { getHash, sign } from '../../util/util.ts';
import { key } from './Key.tsx';
import './Login.css';

const { Text } = Typography;

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

const login = async (
  username: string,
  password: string
): Promise<LoginResult> => {
  let secretKey: string = '';
  let signed: string = '';

  await getHash(password)
    .then((text: string) => {
      secretKey = text;
    })
    .catch((error) => {
      console.error('Error in getHash:', error);
    });

  const body = { username };

  await sign(JSON.stringify(body), secretKey)
    .then((text: string) => {
      signed = text;
    })
    .catch((error) => {
      console.error('Error in sign:', error);
    });

  const response = await fetcher.post(`/login`, JSON.stringify(body), {
    headers: {
      signature: signed,
    },
  });
  const result: LoginResult = response.data;
  result.secretKey = signed;

  return result;
};

const HCaptchaNew = HCaptcha as object as new () => HCaptchaType;

const App: React.FC = () => {
  const [logVerified, setlogVerified] = useState(false);
  const userDispatch = useContext(UserDispatchContext);
  const userState = useContext(UserContext);
  const nav = useNavigate();
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

  const onFinish = (values: LoginPayload): void => {
    login(values.username, values.password)
      .then((result) => {
        const secretKey: string = result.secretKey;
        const pl: ModifiedLoginPayload = { ...values, secretKey };
        if (result.status) {
          // set context provider values
          userDispatch?.({ type: 'logged_in', payload: pl });
          setMessageType('loginsuccess');
          setShowMessage(true);
          nav('/');
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
      setlogVerified(true);
    },
  };

  return (
    <>
      {userState?.user.username === '' && (
        <>
          {contextHolder}
          <Link to="/">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              className="go-back"
            >
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
                name="username"
                rules={[{ required: true, message: 'Username is required' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input.Password type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                {/* <Link className="login-form-forgot" to="/reset-password">
              Forgot Password?
            </Link> */}
                <Text type="secondary" className="login-form-forgot">
                  Please contact us to reset password.
                </Text>
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
      )}
    </>
  );
};

export default App;
