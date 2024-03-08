import { Layout, theme, Typography } from 'antd';
import React from 'react';

import privacypolicypdf from '../../../src/assets/privacy-policy.pdf';
import Navigation from '../../components/Navigation';
import { useUser } from '../../components/userContextConst';
import './PrivacyPolicy.css';

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const userState = useUser();

  return (
    <Navigation userState={userState}>
      {(collapsed) => (
        <>
          <Content
            className="content-main full-height"
            style={{
              marginLeft: collapsed !== null && collapsed ? '16px' : '266px',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Typography.Title className="hor-center-item" level={2}>
              Privacy Policy
            </Typography.Title>
            <div className="privacy-policy-parent">
              <iframe className="privacy-policy-pdf" src={privacypolicypdf} />
            </div>
          </Content>
        </>
      )}
    </Navigation>
  );
};

export default App;
