import type React from 'react';
import { useContext } from 'react';
import {
  UserContext,
  UserDispatchContext,
  type UserAction,
  type UserInterface,
} from './userContext';

export const useUser = (): UserInterface => {
  return useContext<UserInterface>(UserContext);
};

export const useUserDispatch = (): React.Dispatch<UserAction> | null => {
  return useContext(UserDispatchContext);
};
