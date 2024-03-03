import { Layout, theme } from 'antd';
import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { useUser } from './libraries/userContextConst';

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
            style={{
              marginLeft: collapsed !== null && collapsed ? '0px' : '250px',
            }}
          ></Content>
          <Content
            className="content-main"
            style={{
              marginLeft: collapsed !== null && collapsed ? '16px' : '266px',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div>
              {Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && !isNaN(index) ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </Content>
        </>
      )}
    </Navigation>
  );
};

export default App;
