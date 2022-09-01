import { VercelRequest, VercelResponse } from '@vercel/node';
import { Db } from 'mongodb';
import connectToDatabase from '../../database';

let cachedDb: Db = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const body = req.body;

  const db = await connectToDatabase(process.env.MONGO_URI);

  const collection = db.collection('responsibles');

  const returnUser = await collection.insertOne({ ...body });

  console.log(returnUser);

  return res.status(201).json({ ok: true });
}
