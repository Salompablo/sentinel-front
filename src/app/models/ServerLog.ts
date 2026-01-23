export interface ServerLog {
  id: string;
  serverId: number;
  serverName: string;
  region: string;
  errorType: string;
  content: string;
  aiAnalysis?: string;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; 
}