import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const uri = process.env.MONGODB_URI!;

async function fixPasswords() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  const User = (await import('../models/User')).default;

  // Remove old accounts with corrupted double-hashed passwords so they can sign up / sign in cleanly
  const result = await User.deleteMany({
    email: { $in: ['rajc2538@gmail.com', 'choudharyraj10507@gmail.com'] }
  });

  console.log(`Deleted ${result.deletedCount} corrupted test account(s).`);

  // Create clean owner account: rupali@risewithrupali.com
  const ownerEmail = 'rupali@risewithrupali.com';
  await User.deleteOne({ email: ownerEmail });

  const owner = await User.create({
    name: 'Rupali',
    email: ownerEmail,
    password: 'ChangeMe@123!',
    role: 'owner',
  });

  console.log(`\n✅ Clean Owner Account Created:`);
  console.log(`   Email:    ${owner.email}`);
  console.log(`   Password: ChangeMe@123!`);
  console.log(`   Role:     ${owner.role}`);

  await mongoose.disconnect();
  process.exit(0);
}

fixPasswords().catch((err) => {
  console.error('Error fixing passwords:', err);
  process.exit(1);
});
