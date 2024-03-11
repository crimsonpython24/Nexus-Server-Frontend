// User Stuffs
export interface UserData {
  username: string;
  email: string;
  isAdmin: boolean;
  conversations: string[];
  secretKey: string;
  contacts: string[];
  assistants: string[];
  invoices: Invoice[];
  balance: number;
  remember: boolean;
}

export interface UserStateInterface {
  user: UserData;
  authenticated: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
  remember: boolean;
}

export interface UserAction {
  type: string;
  payload: LoginPayload;
}

export interface LoginResult {
  msg: string;
  status: boolean;
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
  userState: UserStateInterface;
}

export interface Props {
  children: React.ReactNode;
}

// Miscellaneous
export interface HCaptchaType extends React.Component {}
