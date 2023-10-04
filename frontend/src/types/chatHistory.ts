import { IChat } from './chat';

export type MessageHistory = {
  content: string;
  createdAt: number;
};

export type ConversationsHistory = {
  conversations?: IChat[];
  currentConversationId?: string;
  groupedConversations?: { [key: string]: IChat[] };
};
