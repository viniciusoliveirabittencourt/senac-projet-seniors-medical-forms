import connectToDatabase from '../../database';
import nc from 'next-connect';

let cachedDb = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .delete(async (req, res) => {
    const { id } = req.headers;

    const db = await connectToDatabase();

    const collection = db.collection('seniors');

    const returnUser = await collection.deleteOne({ _id: id });

    return res.status(200).send({ ok: true, message: returnUser });
  });

export default handler;
