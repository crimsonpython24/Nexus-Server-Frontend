import { Typography } from 'antd';
import React, { useContext } from 'react';

import { UserDispatchContext } from '../../components/userContext.tsx';
import { type LoginPayload } from '../../util/types';
import './Logout.css';

const { Text } = Typography;

const LoginPayloadDummy: LoginPayload = {
  username: '',
  password: '',
  remember: false,
};

const App: React.FC = () => {
  const userDispatch = useContext(UserDispatchContext);
  return (
    <>
      <Text
        className="logout-body-text"
        onClick={() => {
          userDispatch?.({ type: 'logged_out', payload: LoginPayloadDummy });
        }}
      >
        Log out
      </Text>
    </>
  );
};

export default App;
