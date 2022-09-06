import { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../database';
import nc from 'next-connect';

let cachedDb = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .delete(async (req: VercelRequest, res: VercelResponse) => {
    const { id } = req.headers;

    const db = await connectToDatabase(process.env.MONGO_URI);

    const collection = db.collection('seniors');

    const returnUser = await collection.deleteOne({ _id: id });

    return res.status(200).send({ ok: true, message: returnUser });
  });

export default handler;
