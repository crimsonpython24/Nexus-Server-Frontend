import {
  Descriptions,
  Layout,
  Typography,
  message,
  theme,
  type DescriptionsProps,
} from 'antd';
import { type NoticeType } from 'antd/es/message/interface';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '../../components/Navigation';
import { usePopupContext } from '../../components/PopupContextConst';
import { useUser } from '../../components/UserContextConst';
import { type AssistantInfo } from '../../util/types';
import './Account.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const userState = useUser();
  const { showMessage, setShowMessage, messageType, setMessageType } =
    usePopupContext();
  const [messageApi, contextHolder] = message.useMessage();
  const prevShowMessageRef = React.useRef(false);
  const nav = useNavigate();

  const showPopupMessage = async (
    type: NoticeType,
    content: string
  ): Promise<void> => {
    try {
      await messageApi.open({
        type,
        content,
      });
      setShowMessage(false);
    } catch (error) {
      console.error('Failed to show popup message:', error);
    }
  };

  useEffect(() => {
    if (userState?.user.username === '') {
      setMessageType('usernotautherror');
      setShowMessage(true);
      nav('/');
    }
  }, [userState?.user.username, nav, setShowMessage, setMessageType]);

  React.useEffect(() => {
    if (showMessage && !prevShowMessageRef.current) {
      if (messageType === 'loginsuccess') {
        void showPopupMessage('success', 'Login successful!');
        setMessageType(null);
      } // placeholder for now in case new messages are needed
    }
    prevShowMessageRef.current = showMessage;
  });
  console.log(userState);

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Username',
      span: 24,
      children: userState?.user.username,
    },
    {
      key: '2',
      label: 'Balance',
      span: 24,
      children: userState?.user.balance,
    },
    {
      key: '3',
      label: 'Assistants',
      span: 24,
      children: (
        <div>
          {(userState?.user.assistants ?? []).length === 0
            ? 'None'
            : (userState?.user.assistants ?? []).map(
                (assistant: AssistantInfo, index) => (
                  <div key={index}>
                    <p>Name: {assistant.name}</p>
                    <p>ID: {assistant.id}</p>
                    <p>Model: {assistant.model}</p>
                    <p>Affiliation: {assistant.affiliation}</p>
                  </div>
                )
              )}
        </div>
      ),
    },
    {
      key: '4',
      label: 'Invoices',
      span: 24,
      children: (
        <div>
          {(userState?.user.invoices ?? []).length === 0
            ? 'None'
            : (userState?.user.invoices ?? []).map((invoice, index) => (
                <div key={index}>
                  <Text>ID: {invoice.id}</Text>
                  <Text>Description: {invoice.description}</Text>
                  <Text>Timestamp: {invoice.timestamp}</Text>
                  <Text>Input Price: {invoice.inputPrice}</Text>
                  <Text>Output Price: {invoice.outputPrice}</Text>
                  <Text>Total: {invoice.total}</Text>
                </div>
              ))}
        </div>
      ),
    },
  ];

  return (
    <>
      {userState?.user.username !== '' && (
        <>
          {contextHolder}
          <Navigation userState={userState}>
            {(collapsed) => (
              <>
                <Content
                  className="app-content-div"
                  style={{
                    marginLeft:
                      collapsed !== null && collapsed ? '16px' : '266px',
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <div className="account-page-content">
                    <Title level={4}>Account Management</Title>
                    <Descriptions items={items} size={'small'} />
                  </div>
                </Content>
              </>
            )}
          </Navigation>
        </>
      )}
      ;
    </>
  );
};

export default App;

export const AccountText: React.FC = () => {
  const nav = useNavigate();
  return (
    <Text
      className="logout-body-text"
      onClick={() => {
        nav('/account');
      }}
    >
      Account
    </Text>
  );
};
