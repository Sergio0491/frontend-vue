export interface Email {
  message_id: number;
  from: string;
  subject: string;
  body: string;
  date: string;
}

export interface ApiResponse {
  emails: Email[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}