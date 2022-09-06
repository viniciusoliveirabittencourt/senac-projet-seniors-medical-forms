import connectToDatabase from '../../database';
import nc from 'next-connect';
import upload from '../../database/upload';

let cachedDb = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .use(upload.single('file'))
  .post(async (req, res) => {
    const body = req.body;

    const db = await connectToDatabase();

    const collection = db.collection('seniors');

    delete body.file;

    body.photo = req.file.location;

    const returnUser = await collection.insertOne({ ...body });

    return res.status(201).json({ ok: true, id: returnUser, reqFileLocation: req.file.location });
  });

export const config = {
  api: {
    bodyParser: false,
  }
}

export default handler;
