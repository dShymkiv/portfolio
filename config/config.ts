import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
export const config = {
  PORT: process.env['PORT'] || 5001,

  DATABASE_NAME: process.env['DATABASE_NAME'] || 'postgres',

  ACCESS_TOKEN_SECRET: process.env['ACCESS_TOKEN_SECRET'] || 'accessTokenSecret'
};
