import {
  DesktopOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import './Navbar.css';

const { Header, Sider, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } satisfies MenuItem;
}

const subnav: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 3);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 3;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  ...subnav,
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 2,
          overflow: 'visible',
        }}
      >
        <div className="demo-logo-vertical" />
        <div
          style={{
            position: 'relative',
            width: '8px',
            top: '0px',
            backgroundColor: '#001529',
            backgroundRepeat: 'repeat-y',
            height: '8px',
            left: collapsed ? '0px' : '200px',
            marginBottom: '-8px',
            transitionBehavior: 'normal, normal',
            transitionDuration: '0.2s, 0s',
            transitionTimingFunction: 'ease, ease',
            transitionDelay: '0s, 0.2s',
            transitionProperty: 'all, background',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#f5f5f5',
              borderTopLeftRadius: borderRadiusLG,
            }}
          ></div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: '#ffffff' }} />
              ) : (
                <MenuFoldOutlined style={{ color: '#ffffff' }} />
              )
            }
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              position: 'absolute',
              left: collapsed ? '0px' : '200px',
            }}
          />
        </Header>
        <Content style={{ marginLeft: collapsed ? '0px' : '200px' }}>
          <Breadcrumb
            style={{ padding: '16px' }}
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
          />
        </Content>
        <Content
          style={{
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: collapsed ? '16px' : '216px',
            marginRight: '16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
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
          style={{
            textAlign: 'center',
            marginTop: '6px',
            marginBottom: '6px',
            marginLeft: collapsed ? '0px' : '200px',
          }}
        >
          crimsonpython24 | KevinKWZheng | zywang-j <br />
          ©2023-24
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
