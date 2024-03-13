import React, { createContext, useState } from 'react';

import { type Props } from '../util/types';

export const PopupContext = createContext<{
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
}>({ showMessage: false, setShowMessage: () => {} });

export const PopupProvider: React.FC<Props> = ({ children }) => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <PopupContext.Provider value={{ showMessage, setShowMessage }}>
      {children}
    </PopupContext.Provider>
  );
};
