import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const uri = process.env.MONGODB_URI!;

async function checkUsers() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  const User = (await import('../models/User')).default;
  const users = await User.find({}).select('+password').lean();

  console.log(`\nFound ${users.length} user(s) in MongoDB:\n`);
  for (const u of users) {
    console.log(`- ID: ${u._id}`);
    console.log(`  Name: ${u.name}`);
    console.log(`  Email: "${u.email}"`);
    console.log(`  Role: ${u.role}`);
    console.log(`  Password Hash: ${u.password ? u.password.substring(0, 25) + '...' : 'NONE'}`);
    console.log('---');
  }

  await mongoose.disconnect();
  process.exit(0);
}

checkUsers().catch((err) => {
  console.error('Error checking users:', err);
  process.exit(1);
});
