import { useContext } from 'react';

import { type PopupContextType } from '../util/types';
import { PopupContext } from './PopupContext.tsx';

export const usePopupContext = (): PopupContextType =>
  useContext<PopupContextType>(PopupContext);
