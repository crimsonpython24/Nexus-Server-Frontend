import Cookies from 'js-cookie';
import React, {
  createContext,
  useEffect,
  useReducer,
  type Reducer,
} from 'react';

import {
  type Props,
  type UserAction,
  type UserData,
  type UserStateInterface,
} from '../util/types';

const InitialUserData: UserData = {
  username: '',
  conversations: [],
  secretKey: '',
  assistants: [],
  invoices: [],
  balance: 0,
};

const loadUserDataFromCookies = (): UserData => {
  if (Cookies.get('user') === undefined) return InitialUserData;
  const userCookie: string = Cookies.get('user');
  if (userCookie !== undefined) {
    const data = JSON.parse(userCookie);
    return data.user;
  } else {
    return InitialUserData;
  }
};

const loadUserAuthFromCookies = (): boolean => {
  if (Cookies.get('user') === undefined) return false;
  const userCookie: string = Cookies.get('user');
  if (userCookie !== undefined) {
    const data = JSON.parse(userCookie);
    return data.authenticated;
  } else {
    return false;
  }
};

const getUserInitialState = (): UserStateInterface => {
  return {
    user: loadUserDataFromCookies(),
    authenticated: loadUserAuthFromCookies(),
  };
};

export const UserContext = createContext<null | UserStateInterface>(null);
export const UserDispatchContext =
  createContext<React.Dispatch<UserAction> | null>(null);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, getUserInitialState());

  useEffect(() => {
    Cookies.set(
      'user',
      JSON.stringify({ user: user.user, authenticated: user.authenticated })
    );
  }, [user]);

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
      const UserLoginData: UserData = { ...state.user, ...cleanPayload };

      // console.log('user log in: ', cleanPayload);
      const newState = {
        user: UserLoginData,
        authenticated: true,
      };

      Cookies.set(
        'user',
        JSON.stringify({ user: newState.user, authenticated: true })
      );
      return newState;
    }
    case 'logged_out': {
      Cookies.remove('user');
      return { user: InitialUserData, authenticated: false };
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
};
