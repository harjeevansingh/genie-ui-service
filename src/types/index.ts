export interface Message {
    id: number;
    conversationId: number;
    senderType: 'USER' | 'AI';
    content: string;
    timestamp: string;
  }
  
  export interface Conversation {
    id: number;
    userId: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  }