import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://webfoxshield:Webfoxshield1996@cluster0.yrx9m.mongodb.net/';
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await client.connect();
    const db = client.db('test'); // Replace with your database name
    const usersCollection = db.collection('users');
    
    // You should implement proper authentication to get the user ID
    // For now, I'm using the email you provided as an example
    const user = await usersCollection.findOne({ email: 'r.s.gokul.1996@gmail.com' });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json({
      name: user.name,
      email: user.email,
      subscription_status: user.subscription_status,
      subscriptionExpiry: user.subscriptionExpiry
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}