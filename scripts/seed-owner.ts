/**
 * Seed script: creates the initial owner account
 * Run with: npx ts-node -e "require('./scripts/seed-owner.ts')"
 * Or: npm run seed
 */

import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI!;
const OWNER_NAME = process.env.SEED_OWNER_NAME || 'Rupali';
const OWNER_EMAIL = process.env.SEED_OWNER_EMAIL || 'rupali@risewithrupali.com';
const OWNER_PASSWORD = process.env.SEED_OWNER_PASSWORD || 'ChangeMe@123!';

async function seedOwner() {
  if (!MONGODB_URI) {
    console.error('❌  MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  console.log('🌱  Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅  Connected');

  // Dynamically import model to avoid TS compilation issues
  const User = (await import('../models/User')).default;

  const existing = await User.findOne({ email: OWNER_EMAIL });
  if (existing) {
    if (existing.role !== 'owner') {
      existing.role = 'owner';
      await existing.save();
      console.log(`✅  Updated existing user "${OWNER_EMAIL}" to role "owner"`);
    } else {
      console.log(`ℹ️   Owner account already exists: ${OWNER_EMAIL}`);
    }
    await mongoose.disconnect();
    return;
  }

  await User.create({
    name: OWNER_NAME,
    email: OWNER_EMAIL,
    password: OWNER_PASSWORD,
    role: 'owner',
  });

  console.log(`\n🎉  Owner account created successfully!`);
  console.log(`    Email:    ${OWNER_EMAIL}`);
  console.log(`    Password: ${OWNER_PASSWORD}`);
  console.log(`\n⚠️   Change the password immediately after first login!\n`);

  await mongoose.disconnect();
  process.exit(0);
}

seedOwner().catch((err) => {
  console.error('❌  Seed failed:', err.message);
  process.exit(1);
});
