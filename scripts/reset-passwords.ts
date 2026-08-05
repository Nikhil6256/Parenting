import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const uri = process.env.MONGODB_URI!;

async function resetPasswords() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  const User = (await import('../models/User')).default;
  const users = await User.find({});

  console.log(`Found ${users.length} users in database.`);

  // If password was double hashed, we can prompt or reset, or delete double-hashed test accounts so they can re-register freshly.
  // Alternatively, if the user specifies a new password, we set it cleanly.

  for (const u of users) {
    console.log(`User: ${u.email} (${u.name})`);
  }

  await mongoose.disconnect();
}

resetPasswords().catch(console.error);
