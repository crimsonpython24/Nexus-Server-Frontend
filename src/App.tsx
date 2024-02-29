import { Breadcrumb, Layout, theme } from 'antd';
import React from 'react';
import './App.css';
import Navigation from './components/Navigation';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Navigation>
      {(collapsed) => (
        <>
          <Content
            style={{
              marginLeft: collapsed !== null && collapsed ? '0px' : '250px',
            }}
          >
            <Breadcrumb
              style={{ padding: '16px' }}
              items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            />
          </Content>
          <Content
            className="content-main"
            style={{
              marginLeft: collapsed !== null && collapsed ? '16px' : '266px',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {' '}
            <div>
              <p>long content</p>
              {Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && !isNaN(index) ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </Content>
          <Footer
            className="footer-main"
            style={{
              marginLeft: collapsed !== null && collapsed ? '0px' : '250px',
            }}
          >
            crimsonpython24 | KevinKWZheng | zywang-j <br />
            ©2023-24
          </Footer>
        </>
      )}
    </Navigation>
  );
};

export default App;
