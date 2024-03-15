// User Stuffs
export interface UserData {
  username: string;
  conversations: Conversation[];
  secretKey: string;
  assistants: AssistantInfo[];
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
export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  token: string;
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

export interface SignupResult {
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

interface AssistantInfo {
  name: string;
  id: string;
  model: string;
  affiliation: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

interface Message {
  username: string;
  content: string;
  timestamp: string;
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
  messageType: MessageType | null;
  setMessageType: Dispatch<SetStateAction<MessageType | null>>;
}

export type MessageType =
  | 'success'
  | 'info'
  | 'error'
  | 'warning'
  | 'loginsuccess'
  | 'loginredirecterror'
  | 'loginerror'
  | 'signupsuccess'
  | 'usernotautherror';
