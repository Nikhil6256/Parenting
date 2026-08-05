import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const uri = process.env.MONGODB_URI;

console.log('\n--- MongoDB Connection Diagnostic ---');
if (!uri) {
  console.error('❌ MONGODB_URI environment variable is NOT set in .env or .env.local');
  process.exit(1);
}

// Mask password in output for security
const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
console.log(`Connecting to: ${maskedUri}`);

if (uri.includes('CHANGEME') || uri.includes('<db_password>')) {
  console.error('\n⚠️ WARNING: Your MONGODB_URI contains placeholder password ("CHANGEME").');
  console.error('Please replace "CHANGEME" in .env.local with your real MongoDB database password.\n');
}

async function testConnection() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri!, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ MongoDB Connection SUCCESSFUL!\n');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err: any) {
    console.error('\n❌ MongoDB Connection FAILED:');
    console.error(err.message || err);
    console.error('\nTroubleshooting Checklist:');
    console.error('1. Check if the password in MONGODB_URI in .env.local is correct.');
    console.error('2. Ensure your current IP address is added to Network Access in MongoDB Atlas (or set to 0.0.0.0/0 for access from anywhere).');
    process.exit(1);
  }
}

testConnection();
