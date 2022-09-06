import connectToDatabase from '../../database';
import nc from 'next-connect';

let cachedDb = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .post(async (req, res) => {
    const { email } = req.body;

    const db = await connectToDatabase();

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
