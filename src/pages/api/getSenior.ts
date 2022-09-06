import { VercelRequest, VercelResponse } from '@vercel/node';
import { Db } from 'mongodb';
import connectToDatabase from '../../database';
import nc from 'next-connect';

let cachedDb: Db = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .get(async (req: VercelRequest, res: VercelResponse) => {
    const { id } = req.headers;

    const db = await connectToDatabase(process.env.MONGO_URI);

    const collection = db.collection('seniors');

    const returnUser = await collection.findOne({ _id: id });

    if (!returnUser) {
      return res.status(400).send({ ok: false, message: 'Usuario não existe!' })
    }

    return res.status(200).send({ ok: true, message: returnUser, mySenior: returnUser});
  });

export default handler;
