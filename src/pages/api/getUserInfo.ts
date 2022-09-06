import { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../database';
import nc from 'next-connect';

let cachedDb = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .post(async (req: VercelRequest, res: VercelResponse) => {
    const { email } = req.body;
    console.log(req.body);

    const db = await connectToDatabase(process.env.MONGO_URI);

    const collection = db.collection('responsibles');
    const collectionTwo = db.collection('seniors');

    const returnUser = await collection.findOne({ email });
    const returnSenior = await collectionTwo.find({ myResponsible: email }).toArray();

    if (!returnUser) {
      return res.status(400).send({ ok: false, message: 'Usuario não existe!' })
    }

    return res.status(200).send({ ok: true, message: returnUser, mySenior: returnSenior});
  });

export default handler;
