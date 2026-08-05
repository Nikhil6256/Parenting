import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed', 'refunded'],
      default: 'created',
    },
  },
  { timestamps: true }
);

OrderSchema.index({ userId: 1, courseId: 1 });
OrderSchema.index({ razorpayOrderId: 1 });

export default models.Order || model<IOrder>('Order', OrderSchema);
