import { VercelRequest, VercelResponse } from '@vercel/node';
import { Db } from 'mongodb';
import connectToDatabase from '../../database';
import nc from 'next-connect';
import upload from '../../database/upload';

let cachedDb: Db = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .use(upload.single('file'))
  .post(async (req: VercelRequest, res: VercelResponse) => {
    const body = req.body;
    console.log(req);

    const db = await connectToDatabase(process.env.MONGO_URI);

    const collection = db.collection('responsibles');

    delete body.file;

    body.photo = req.file.location;

    const returnUser = await collection.insertOne({ ...body });

    console.log(returnUser);

    return res.status(201).json({ ok: true, id: returnUser });
  });

export const config = {
  api: {
    bodyParser: false,
  }
}

export default handler;
