import React, { createContext, useReducer, type Reducer } from 'react';

interface Props {
  children: React.ReactNode;
}

interface LoginPayload {
  username: string;
  password: string;
  remember: boolean;
}

export interface UserAction {
  type: string;
  payload: LoginPayload;
}

export interface UserInterface {
  username: string;
  email: string;
  authenticated: boolean;
}

const InitialUser: UserInterface = {
  username: '',
  email: '',
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

const userReducer: Reducer<UserInterface, UserAction> = (state, action) => {
  switch (action.type) {
    case 'logged_in': {
      const { password, ...cleanPayload } = action.payload;
      return {
        ...state,
        ...cleanPayload,
        authenticated: true,
        email: '',
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
