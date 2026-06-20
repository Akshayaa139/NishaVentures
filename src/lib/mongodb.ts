import { MongoClient } from 'mongodb';

let uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Strip leading/trailing double or single quotes dynamically
uri = uri.replace(/^["']|["']$/g, '');

const client = new MongoClient(uri);

export default client;
