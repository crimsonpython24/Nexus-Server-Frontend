import { Layout, message, theme } from 'antd';
import { type NoticeType } from 'antd/es/message/interface';
import React from 'react';

import './App.css';
import Navigation from './components/Navigation';
import { usePopupContext } from './components/PopupContextConst';
import { useUser } from './components/userContextConst';

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const userState = useUser();
  const { showMessage, setShowMessage, messageType, setMessageType } =
    usePopupContext();
  const [messageApi, contextHolder] = message.useMessage();
  const prevShowMessageRef = React.useRef(false);

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

  React.useEffect(() => {
    if (showMessage && !prevShowMessageRef.current) {
      if (messageType === 'loginsuccess') {
        console.log('login success');
        void showPopupMessage('success', 'Login successful!');
        setMessageType(null);
      } else if (messageType === 'loginredirecterror') {
        void showPopupMessage('error', 'You are already logged in.');
        setMessageType(null);
      }
    }
    prevShowMessageRef.current = showMessage;
  });

  return (
    <>
      {contextHolder}
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
    </>
  );
};

export default App;
