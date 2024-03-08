import { Layout, theme, Typography } from 'antd';
import React from 'react';

import tospdf from '../../../src/assets/terms-of-service.pdf';
import Navigation from '../../components/Navigation';
import { useUser } from '../../components/userContextConst';
import './ToS.css';

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
              Terms of Service
            </Typography.Title>
            <div className="tos-parent">
              <iframe className="tos-pdf" src={tospdf} />
            </div>
          </Content>
        </>
      )}
    </Navigation>
  );
};

export default App;
