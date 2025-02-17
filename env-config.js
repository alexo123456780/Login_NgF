// env-config.js
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envConfig = `export const environment = {
  production: false,
  apiUrl: '${process.env.API_URL}'
};`;

fs.writeFileSync('./src/environments/environment.ts', envConfig);
