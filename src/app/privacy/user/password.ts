import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

const uri = process.env.MONGODB_URI!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { currentPassword, newPassword } = req.body;

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    const users = db.collection('users');

    // Find user (replace with your auth logic)
    const user = await users.findOne({ email: 'r.s.gokul.1996@gmail.com' });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password (compare hashed passwords in production)
    if (user.password !== currentPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash new password and update
    const hashedPassword = await hash(newPassword, 12);
    await users.updateOne(
      { email: 'r.s.gokul.1996@gmail.com' },
      { $set: { password: hashedPassword } }
    );

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}