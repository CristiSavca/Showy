import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// REQUIRES .env in same directory
require('dotenv').config();

export const firebaseKey = {
  "type": "service_account",
  "project_id": "showy-92cc7",
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key,
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g3h0s%40showy-92cc7.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

export const firebaseURL = "https://showy-92cc7-default-rtdb.firebaseio.com/";
