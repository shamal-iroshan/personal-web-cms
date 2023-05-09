export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
  isRead: boolean;
}

export interface AllMessages {
  total: number;
  data: Message[];
}

export interface MessageState {
  getMessageIsLoading: boolean;
  getMessageIsSuccess: boolean;
  getMessageError: { hasError: boolean; description: string };
  message: Message | undefined;
  getAllMessageIsLoading: boolean;
  getAllMessageIsSuccess: boolean;
  getAllMessageError: { hasError: boolean; description: string };
  allMessages: AllMessages;
  updateMessageIsLoading: boolean;
  updateMessageIsSuccess: boolean;
  updateMessageError: { hasError: boolean; description: string };
  deleteMessageIsLoading: boolean;
  deleteMessageIsSuccess: boolean;
  deleteMessageError: { hasError: boolean; description: string };
}
