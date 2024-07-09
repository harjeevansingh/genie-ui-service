export interface MessageDTO {
    id: number;
    conversationId: number;
    senderType: 'USER' | 'AI';
    content: string;
    timestamp: string;
  }
  
  export interface ConversationDTO {
    id: number;
    userId: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  }