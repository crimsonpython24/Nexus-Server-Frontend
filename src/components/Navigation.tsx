import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';
import Logout from '../pages/auth/Logout.tsx';
import { type NavigationProps } from '../util/types';

const { Header, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  disabled: boolean,
  style: React.CSSProperties | null = {},
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    label,
    key,
    disabled,
    style: style ?? {},
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

const LoggedInLabel: React.ReactNode = (
  <>
    Account | <Logout />
  </>
);

const NotLoggedInOptions: MenuItem[] = [
  getItem(NotLoggedInLabel, '1', false, null, null, [], 'group'),
];

const LoggedInOptions: MenuItem[] = [
  getItem('You have no active chats.', '1', false, null, null, [], 'group'),
  getItem(
    LoggedInLabel,
    '2',
    false,
    { position: 'absolute', bottom: 16, left: 0 },
    null,
    [],
    'group'
  ),
];

const Navigation: React.FC<NavigationProps> = ({ children, userState }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [manualCollapse, setManualCollapse] = useState(false);
  const [innerCorner, setInnerCorner] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

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
            userState !== null && !userState.authenticated
              ? NotLoggedInOptions
              : LoggedInOptions
          }
        />
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
