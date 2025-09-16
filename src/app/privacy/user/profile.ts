import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://webfoxshield:Webfoxshield1996@cluster0.yrx9m.mongodb.net/';
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name } = req.body;

  try {
    await client.connect();
    const db = client.db('webfoxshieldDB');
    const usersCollection = db.collection('users');
    
    // Update the user's name
    const result = await usersCollection.updateOne(
      { email: 'r.s.gokul.1996@gmail.com' },
      { $set: { name } }
    );
    
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }
    
    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}