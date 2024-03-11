import { ArrowLeftOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button, Form, Input, Typography } from 'antd';
import { InputOTP } from 'antd-input-otp';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { type HCaptchaType } from '../../util/types';
import { key } from './Key.tsx';
import './ResetPassword.css';

const HCaptchaNew = HCaptcha as object as new () => HCaptchaType;

const App: React.FC = () => {
  const [logVerified, setlogVerified] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>([]);
  const [clickedReset, setClickedReset] = useState(false);
  const onFinish = (values: object): void => {
    console.log(values);
    setClickedReset(true);
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
      <Link to="/login">
        <Button type="text" icon={<ArrowLeftOutlined />} className="go-back">
          Go Back
        </Button>
      </Link>
      <div className="reset-form-parent">
        <Form.Item>
          <Typography.Title className="hor-center-item" level={3}>
            Reset Password
          </Typography.Title>
        </Form.Item>
        <Form
          name="normal_reset"
          className="reset-form"
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'Invalid E-Mail' },
              { required: true, message: 'Email is required' },
            ]}
          >
            <Input disabled={clickedReset} placeholder="Email" />
          </Form.Item>

          {!clickedReset && (
            <>
              <Form.Item className="tail-form-items hor-center-item">
                <HCaptchaNew {...HCaptchaProps} />
              </Form.Item>
              <Form.Item>
                {logVerified && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="reset-form-button"
                  >
                    Send OTP Code
                  </Button>
                )}
                {!logVerified && (
                  <Button
                    type="primary"
                    className="reset-form-button"
                    disabled={true}
                  >
                    Solve Captcha
                  </Button>
                )}
              </Form.Item>
            </>
          )}
          {clickedReset && (
            <section className="card">
              <InputOTP
                inputType="custom"
                inputRegex="[^0-9]"
                onChange={setOtpValues}
                value={otpValues}
                inputClassName="input-classname"
                wrapperClassName="wrapper-classname"
              />
              <Button
                block
                type="primary"
                onClick={() => {
                  console.log(otpValues);
                }}
              >
                Submit
              </Button>
              <Button
                style={{ marginTop: 8 }}
                block
                ghost
                type="primary"
                onClick={() => {
                  setOtpValues([]);
                }}
              >
                Reset
              </Button>
            </section>
          )}
        </Form>
      </div>
    </>
  );
};

export default App;
