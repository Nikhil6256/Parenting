import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: Date;
  readingTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    coverImage: { type: String, required: true },
    author: { type: String, default: 'Rupali' },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
    readingTime: { type: Number },
  },
  { timestamps: true }
);

BlogPostSchema.index({ status: 1, publishedAt: -1 });

export default models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema);
