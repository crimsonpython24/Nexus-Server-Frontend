import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

const { Header, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface UserStateInterface {
  username: string;
  email: string;
  authenticated: boolean;
}

interface NavigationProps {
  children: (collapsed: boolean) => React.ReactNode;
  userState: UserStateInterface;
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  disabled: boolean,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    label,
    key,
    disabled,
    icon,
    children,
    type,
  } satisfies MenuItem;
}

const NotLoggedInLabel: React.ReactNode = (
  <>
    <span>You are not logged in. </span>
    <Link to="/login/">Log in</Link>
    <span> or </span>
    <Link to="/signup/">sign up</Link>
    <span> to continue.</span>
  </>
);

const AccountNode: React.ReactNode = (
  <>
    <span>Account management link </span>
  </>
);

const NotLoggedInOptions: MenuItem[] = [
  getItem(NotLoggedInLabel, '1', false, null, [], 'group'),
];

const LoggedInOptions: MenuItem[] = [
  getItem('You have no active chats.', '1', false, null, [], 'group'),
];

const Navigation: React.FC<NavigationProps> = ({ children, userState }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [manualCollapse, setManualCollapse] = useState(false);
  const [innerCorner, setInnerCorner] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  console.log(userState);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        breakpoint="md"
        collapsedWidth="0"
        collapsed={collapsed || manualCollapse}
        onCollapse={(collapsed) => {
          if (!manualCollapse) {
            setCollapsed(collapsed);
            setManualCollapse(false);
            setTimeout(() => {
              setInnerCorner(collapsed);
            }, 200);
          }
        }}
        width={250}
        className="sider-main"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={
            !userState.authenticated ? NotLoggedInOptions : LoggedInOptions
          }
        />
        {userState.authenticated && AccountNode}
      </Sider>
      <Layout>
        <Header className="header-main">
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className="header-collapse-btn-icon" />
              ) : (
                <MenuFoldOutlined className="header-collapse-btn-icon" />
              )
            }
            onClick={() => {
              if (collapsed && !manualCollapse) {
                setCollapsed(false);
                setTimeout(() => {
                  setInnerCorner(false);
                }, 200);
              } else {
                setCollapsed(!manualCollapse);
                setManualCollapse(!manualCollapse);
                setTimeout(() => {
                  setInnerCorner(!manualCollapse);
                }, 200);
              }
            }}
            className="header-collapse-btn"
            style={{ left: collapsed ? '0px' : '250px' }}
          />
        </Header>
        {!innerCorner && (
          <div
            className="sider-corner-outer"
            style={{ left: collapsed ? '0px' : '250px' }}
          >
            <div
              className="sider-corner-inner"
              style={{ borderTopLeftRadius: borderRadiusLG }}
            ></div>
          </div>
        )}
        {children(collapsed)}
      </Layout>
    </Layout>
  );
};

export default Navigation;
