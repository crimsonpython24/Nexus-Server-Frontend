import React, { createContext, useState } from 'react';

import { type MessageType, type Props } from '../util/types';

export const PopupContext = createContext<{
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  messageType: MessageType | null;
  setMessageType: React.Dispatch<React.SetStateAction<MessageType | null>>;
}>({
  showMessage: false,
  setShowMessage: () => {},
  messageType: null,
  setMessageType: () => {},
});

export const PopupProvider: React.FC<Props> = ({ children }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState<MessageType | null>(null);

  return (
    <PopupContext.Provider
      value={{ showMessage, setShowMessage, messageType, setMessageType }}
    >
      {children}
    </PopupContext.Provider>
  );
};
