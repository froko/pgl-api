declare namespace NodeJS {
  export interface ProcessEnv {
    MAIL_HOST: string;
    MAIL_PASSWORD: string;
    MAIL_USER: string;
    MAIL_PORT: number;
    NEXT_PUBLIC_GITHUB_TOKEN: string;
    NEXT_PUBLIC_NETLIFY_URL: string;
    AUTH0_ID: string;
    AUTH0_SECRET: string;
  }
}
