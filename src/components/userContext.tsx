import React, { createContext, useReducer, type Reducer } from 'react';

import {
  type Props,
  type UserAction,
  type UserData,
  type UserStateInterface,
} from '../util/types';

const InitialUserData: UserData = {
  username: '',
  email: '',
  password: '',
  isAdmin: false,
  conversations: [],
  secretKey: '',
  contacts: [],
  assistants: [],
  invoices: [],
  balance: 0,
  remember: true,
};

const InitialUser: UserStateInterface = {
  user: InitialUserData,
  authenticated: false,
};

export const UserContext = createContext(InitialUser);
export const UserDispatchContext =
  createContext<React.Dispatch<UserAction> | null>(null);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, InitialUser);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

const userReducer: Reducer<UserStateInterface, UserAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'logged_in': {
      const { password, ...cleanPayload } = action.payload;
      console.log(cleanPayload);
      // console.log(state);
      const UserLoginData: UserData = { ...state.user, ...cleanPayload };
      console.log('userlogindata', UserLoginData);
      return {
        user: UserLoginData,
        authenticated: true,
      };
    }
    case 'logged_out': {
      return { ...InitialUser };
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
};
