import type React from 'react';
import { useContext } from 'react';

import { type UserAction, type UserStateInterface } from '../util/types';
import { UserContext, UserDispatchContext } from './UserContext';

export const useUser = (): UserStateInterface | null => {
  return useContext(UserContext);
};

export const useUserDispatch = (): React.Dispatch<UserAction> | null => {
  return useContext(UserDispatchContext);
};
