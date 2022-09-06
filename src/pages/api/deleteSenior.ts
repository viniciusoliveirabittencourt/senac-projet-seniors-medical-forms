import { VercelRequest, VercelResponse } from '@vercel/node';
import { Db } from 'mongodb';
import connectToDatabase from '../../database';
import nc from 'next-connect';

let cachedDb: Db = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .delete(async (req: VercelRequest, res: VercelResponse) => {
    const { id } = req.headers;
    console.log(id);

    const db = await connectToDatabase(process.env.MONGO_URI);

    const collection = db.collection('seniors');

    const returnUser = await collection.deleteOne({ _id: id });

    console.log(returnUser);

    return res.status(200).send({ ok: true, message: returnUser });
  });

export default handler;
