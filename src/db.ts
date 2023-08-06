import { MongoClient, Db } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
export const client = new MongoClient(url, { family:4 });

// Database Name
const dbName = 'BondAcconting';

export let db:Db
export async function connectDB() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to DB');
  db = client.db(dbName);
}

