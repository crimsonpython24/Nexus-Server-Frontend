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
import { Button, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import '../App.css';

const { Header, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
interface NavigationProps {
  children: (collapsed: boolean) => React.ReactNode;
}

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

const Navigation: React.FC<NavigationProps> = ({ children }) => {
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
          items={items}
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
