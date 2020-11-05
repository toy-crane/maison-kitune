declare namespace NodeJS {
  interface Process {
    /** running on server */
    isServer: boolean;
  }
  interface ProcessEnv {
    /** node environment */
    PORT: string;
    JWT_SECRET: string;
    NODEMAILER_USER: string;
    NODEMAILER_PASSWORD: string;
    ORIGIN: string;
    CLIENT_URL: string;
    SESSION_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_SECRET: string;
  }
}
