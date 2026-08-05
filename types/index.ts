import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

export interface CourseType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  curriculum: ModuleType[];
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
  createdAt: string;
  updatedAt: string;
}

export interface ModuleType {
  _id?: string;
  moduleTitle: string;
  lessons: LessonType[];
}

export interface LessonType {
  _id?: string;
  title: string;
  videoUrl?: string;
  duration?: number;
  isFree: boolean;
  pdfUrl?: string;
  description?: string;
}

export interface OrderType {
  _id: string;
  userId: { name: string; email: string } | string;
  courseId: { title: string; price: number } | string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
}

export interface BlogPostType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: string;
  readingTime?: number;
  createdAt: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  purchasedCourses: string[];
  createdAt: string;
}
