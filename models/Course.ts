import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ILesson {
  title: string;
  videoUrl?: string;
  duration?: number;
  isFree: boolean;
  pdfUrl?: string;
  description?: string;
}

export interface IModule {
  moduleTitle: string;
  lessons: ILesson[];
}

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  curriculum: IModule[];
  price: number;
  discountPrice?: number;
  thumbnail: string;
  category: string;
  status: 'draft' | 'published';
  enrolledCount: number;
  tags: string[];
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDuration?: number;
  totalLessons?: number;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  videoUrl: { type: String },
  duration: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  pdfUrl: { type: String },
  description: { type: String },
});

const ModuleSchema = new Schema<IModule>({
  moduleTitle: { type: String, required: true },
  lessons: [LessonSchema],
});

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 300 },
    curriculum: [ModuleSchema],
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number },
    thumbnail: { type: String, default: '' },
    category: {
      type: String,
      required: true,
      enum: [
        'Parenting Basics',
        'Child Development',
        'Discipline',
        'Emotional Intelligence',
        'Teen Parenting',
        'Special Needs',
        'Self Care for Parents',
        'Other',
      ],
    },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    enrolledCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    language: { type: String, default: 'English' },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    totalDuration: { type: Number, default: 0 },
    totalLessons: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CourseSchema.index({ status: 1, category: 1 });

export default models.Course || model<ICourse>('Course', CourseSchema);
