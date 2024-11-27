import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  ascoraApi: {
    baseUrl: 'https://api.ascora.com/v1',
    key: process.env.ASCORA_API_KEY
  }
};