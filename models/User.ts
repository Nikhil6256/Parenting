import mongoose, { Schema, Document, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'owner' | 'customer';
  image?: string;
  purchasedCourses: mongoose.Types.ObjectId[];
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false, minlength: 6 },
    role: { type: String, enum: ['owner', 'customer'], default: 'customer' },
    image: { type: String },
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpiry: { type: Date, select: false },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$') || this.password.startsWith('$2y$')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default models.User || model<IUser>('User', UserSchema);
