export interface RequestInfo {
    method: string;
    originalUrl: string;
    userAgent: string;
    clientIp: string;
    timestamp: string;
    headers: Record<string, string | string[] | undefined>;
  }
  
  export interface RequestMetrics {
    method: string;
    path: string;
    query: Record<string, string>;
    duration: number;
    timestamp: string;
  }