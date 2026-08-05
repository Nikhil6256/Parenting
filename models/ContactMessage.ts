import { Schema, Document, models, model } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.ContactMessage || model<IContactMessage>('ContactMessage', ContactMessageSchema);
