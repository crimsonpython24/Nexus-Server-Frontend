// User Stuffs
export interface UserData {
  username: string;
  conversations: string[];
  secretKey: string;
  assistants: string[];
  invoices: Invoice[];
  balance: number;
}

export interface UserStateInterface {
  user: UserData;
  authenticated: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface ModifiedLoginPayload {
  username: string;
  password: string;
  secretKey: string;
}

export interface UserAction {
  type: string;
  payload: LoginPayload;
}

export interface LoginResult {
  msg: string;
  status: boolean;
  secretKey: string;
}

// Chat Types
interface Invoice {
  id: string;
  description: string;
  timestamp: string;
  inputPrice?: number;
  outputPrice?: number;
  inputTokens?: number;
  outputTokens?: number;
  inputCost?: number;
  outputCost?: number;
  total: number;
}

// Navigation Props
export interface NavigationProps {
  children: (collapsed: boolean) => React.ReactNode;
  userState: UserStateInterface | null;
}

export interface Props {
  children: React.ReactNode;
}

// Miscellaneous
export interface HCaptchaType extends React.Component {}

// Popups
export interface PopupContextType {
  showMessage: boolean;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
}
