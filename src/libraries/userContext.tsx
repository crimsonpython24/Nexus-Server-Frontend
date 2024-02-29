import React, { createContext, useReducer, type Reducer } from 'react';

interface Props {
  children: React.ReactNode;
}

export interface UserAction {
  type: string;
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
      const user = state;
      const userData = action;
      return { ...user, ...userData };
    }
    case 'logged_out': {
      const user = InitialUser;
      return { ...user };
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
};
