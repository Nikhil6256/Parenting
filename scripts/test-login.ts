import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const uri = process.env.MONGODB_URI!;

async function testLogin(email: string, pass: string) {
  await mongoose.connect(uri);
  const User = (await import('../models/User')).default;

  console.log(`Testing login for: ${email}`);
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    console.error('❌ User not found!');
    process.exit(1);
  }

  const isMatch = await bcrypt.compare(pass, user.password);
  console.log(`Password Match: ${isMatch ? '✅ SUCCESS (Valid Password)' : '❌ FAILED (Invalid Password)'}`);

  await mongoose.disconnect();
  process.exit(isMatch ? 0 : 1);
}

testLogin('rupali@risewithrupali.com', 'ChangeMe@123!');
