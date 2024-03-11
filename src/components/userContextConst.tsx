import type React from 'react';
import { useContext } from 'react';

import { type UserAction, type UserStateInterface } from '../util/types';
import { UserContext, UserDispatchContext } from './userContext';

export const useUser = (): UserStateInterface => {
  return useContext<UserStateInterface>(UserContext);
};

export const useUserDispatch = (): React.Dispatch<UserAction> | null => {
  return useContext(UserDispatchContext);
};
