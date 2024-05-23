import { Client, Account } from 'appwrite';

export const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('664f056c00342f4d4025');

export const account = new Account(client);
export { ID } from 'appwrite';