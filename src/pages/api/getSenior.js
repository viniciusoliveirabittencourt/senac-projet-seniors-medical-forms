import connectToDatabase from '../../database';
import nc from 'next-connect';

let cachedDb = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.headers;

    const db = await connectToDatabase();

    const collection = db.collection('seniors');

    const returnUser = await collection.findOne({ _id: id });

    if (!returnUser) {
      return res.status(400).send({ ok: false, message: 'Usuario não existe!' })
    }

    return res.status(200).send({ ok: true, message: returnUser, mySenior: returnUser});
  });

export default handler;
