import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const uri = process.env.MONGODB_URI!;

async function testAuthFlow() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  const User = (await import('../models/User')).default;

  const testEmail = 'authtest@example.com';
  const testPassword = 'TestPassword123!';

  // Clean up any existing test user
  await User.deleteOne({ email: testEmail });

  console.log(`Creating user with password: "${testPassword}"`);
  const user = await User.create({
    name: 'Auth Test',
    email: testEmail,
    password: testPassword,
    role: 'customer',
  });

  console.log('User created. Fetching stored hashed password...');
  const fetchedUser = await User.findOne({ email: testEmail }).select('+password');

  console.log('Stored Password Hash:', fetchedUser?.password);

  const isMatch = await bcrypt.compare(testPassword, fetchedUser!.password);
  console.log(`Password Comparison Result: ${isMatch ? '✅ MATCH SUCCESSFUL' : '❌ MATCH FAILED'}`);

  // Clean up
  await User.deleteOne({ email: testEmail });
  await mongoose.disconnect();

  if (!isMatch) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

testAuthFlow().catch((err) => {
  console.error('Error during test:', err);
  process.exit(1);
});
