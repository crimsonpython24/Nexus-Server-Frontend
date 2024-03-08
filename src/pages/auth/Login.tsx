import { ArrowLeftOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  UserContext,
  UserDispatchContext,
} from '../../components/userContext.tsx';
import { getHash, sign } from '../../util/util.ts';
import { key } from './Key.tsx';
import './Login.css';

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

interface HCaptchaFix extends React.Component {}

interface loginResult {
  msg: string;
  status: boolean;
}

interface loginValues {
  username: string;
  password: string;
  remember: boolean;
}

const login = async (
  username: string,
  password: string
): Promise<loginResult> => {
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
  const result: loginResult = response.data;

  // console.log(result);
  return result;
};

const HCaptchaNew = HCaptcha as object as new () => HCaptchaFix;

const App: React.FC = () => {
  const [logVerified, setlogVerified] = useState(false);
  const userDispatch = useContext(UserDispatchContext);
  const userState = useContext(UserContext);

  useEffect(() => {
    console.log('User state updated:', userState);
  }, [userState]);

  const onFinish = (values: loginValues): void => {
    login(values.username, values.password)
      .then((result) => {
        if (result.status) {
          console.log(result.status);
          console.log(result.msg);
          console.log(values);
          // set context provider values
          userDispatch?.({ type: 'logged_in', payload: values });
          console.log(userState);

          // show popup & redirect after timeout
        } else {
          console.error(result.msg);
        }
      })
      .catch((error) => {
        console.error('Error in login:', error);
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
