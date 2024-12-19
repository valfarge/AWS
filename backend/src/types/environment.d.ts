declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}