import { VercelRequest, VercelResponse } from '@vercel/node';
import { Db } from 'mongodb';
import connectToDatabase from '../../database';
import nc from 'next-connect';

let cachedDb: Db = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .put(async (req: VercelRequest, res: VercelResponse) => {
    const body = req.body;
    const { id } = req.headers;
    console.log(id);

    const db = await connectToDatabase(process.env.MONGO_URI);

    const collection = db.collection('seniors');

    const returnUser = await collection.replaceOne({ _id: id }, body);

    console.log(returnUser);

    if (!returnUser) {
      return res.status(400).send({ ok: false, message: 'Usuario não existe!' })
    }

    return res.status(200).send({ ok: true, message: returnUser });
  });

export default handler;
