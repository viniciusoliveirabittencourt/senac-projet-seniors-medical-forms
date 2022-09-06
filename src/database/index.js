import { MongoClient } from 'mongodb';
import url from 'url';

const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI;
  const client = await MongoClient.connect(uri);

  const dbName = url.parse(uri).pathname.substring(1);

  const db = client.db(dbName);

  client.once('open', () => {

  })

  return db;
};

export default connectToDatabase;