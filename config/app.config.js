const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development'; // default to dev
dotenv.config({ path: `.env.${env}` });

require('module-alias/register');