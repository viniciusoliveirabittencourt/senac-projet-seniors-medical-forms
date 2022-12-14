import connectToDatabase from '../../database';
import nc from 'next-connect';

let cachedDb = null;

if (!cachedDb) {
  cachedDb = connectToDatabase();
}

const handler = nc()
  .post(async (req, res) => {
    const { email, password } = req.body;

    const db = await connectToDatabase();

    const collection = db.collection('responsibles');

    const returnUser = await collection.findOne({ email: email });

    console.log(returnUser);

    if (!returnUser || returnUser.password !== password)
      return res.status(400).send({ ok: false, message: 'E-mail ou senha inválido!' })

    return res.status(201).send({ ok: true, message: returnUser._id });
  });

export default handler;
