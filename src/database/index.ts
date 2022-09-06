import { MongoClient } from 'mongodb';
import url from 'url';

const connectToDatabase = async (uri: string = undefined) => {
  const client = await MongoClient.connect(uri);

  const dbName = url.parse(uri).pathname.substring(1);

  const db = client.db(dbName);

  client.once('open', () => {

  })

  return db;
};

export default connectToDatabase;