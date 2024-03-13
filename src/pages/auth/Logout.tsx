import { Typography } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserDispatchContext } from '../../components/userContext.tsx';
import { type LoginPayload } from '../../util/types';
import './Logout.css';

const { Text } = Typography;

const LoginPayloadDummy: LoginPayload = {
  username: '',
  password: '',
};

const App: React.FC = () => {
  const userDispatch = useContext(UserDispatchContext);
  const nav = useNavigate();
  return (
    <>
      <Text
        className="logout-body-text"
        onClick={() => {
          userDispatch?.({ type: 'logged_out', payload: LoginPayloadDummy });
          nav(0);
        }}
      >
        Log out
      </Text>
    </>
  );
};

export default App;
