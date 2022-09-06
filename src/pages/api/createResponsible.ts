import { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../database';
import nc from 'next-connect';
import upload from '../../database/upload';

let cachedDb = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

interface MulterRequest extends VercelRequest {
  file: any;
}

const handler = nc()
  .use(upload.single('file'))
  .post(async (req: VercelRequest, res: VercelResponse) => {
    const body = req.body;

    const db = await connectToDatabase(process.env.MONGO_URI);

    const collection = db.collection('responsibles');

    delete body.file;

    body.photo = (req as MulterRequest).file.location;

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
