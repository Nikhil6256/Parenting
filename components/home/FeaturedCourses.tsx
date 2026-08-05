import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Users } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import type { CourseType } from '@/types';

async function getFeaturedCourses(): Promise<CourseType[]> {
  try {
    await dbConnect();
    const courses = await Course.find({ status: 'published' })
      .sort({ enrolledCount: -1 })
      .limit(3)
      .lean();
    return JSON.parse(JSON.stringify(courses));
  } catch {
    return [];
  }
}

const placeholderCourses = [
  {
    _id: '1', title: 'Positive Parenting Foundations', slug: 'positive-parenting-foundations',
    shortDescription: 'Build an unshakeable emotional bond with your child through science-backed strategies.',
    price: 2999, discountPrice: 1999, thumbnail: '', category: 'Parenting Basics',
    enrolledCount: 350, totalLessons: 24, totalDuration: 480, level: 'Beginner', status: 'published',
    tags: [], language: 'English', curriculum: [], description: '', createdAt: '', updatedAt: '',
  },
  {
    _id: '2', title: 'Raising Emotionally Intelligent Kids', slug: 'emotional-intelligence-kids',
    shortDescription: 'Help your child identify, express and regulate emotions from an early age.',
    price: 3499, thumbnail: '', category: 'Emotional Intelligence',
    enrolledCount: 220, totalLessons: 18, totalDuration: 360, level: 'Intermediate', status: 'published',
    tags: [], language: 'English', curriculum: [], description: '', createdAt: '', updatedAt: '',
  },
  {
    _id: '3', title: 'Gentle Discipline That Works', slug: 'gentle-discipline',
    shortDescription: 'Replace power struggles with connection — practical tools for everyday challenges.',
    price: 2499, thumbnail: '', category: 'Discipline',
    enrolledCount: 180, totalLessons: 15, totalDuration: 300, level: 'Beginner', status: 'published',
    tags: [], language: 'English', curriculum: [], description: '', createdAt: '', updatedAt: '',
  },
] as CourseType[];

const categoryColors: Record<string, string> = {
  'Parenting Basics': 'badge-green',
  'Child Development': 'badge-blue',
  'Discipline': 'badge-yellow',
  'Emotional Intelligence': 'badge-blue',
  'Teen Parenting': 'badge-green',
  'Special Needs': 'badge-yellow',
};

export default async function FeaturedCourses() {
  const dbCourses = await getFeaturedCourses();
  const courses = dbCourses.length > 0 ? dbCourses : placeholderCourses;

  return (
    <section className="section bg-sage-50/50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-semibold mb-4 border border-sage-200">
            📚 Featured Courses
          </div>
          <h2 className="section-title mb-4">
            Transform Your{' '}
            <span className="gradient-text">Parenting Journey</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Evidence-based courses designed for real parents facing real challenges. Learn at your own pace, from anywhere.
          </p>
        </div>

        {/* Courses grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {courses.map((course) => (
            <div key={course._id} className="card card-hover group">
              {/* Thumbnail */}
              <div className="relative h-44 bg-gradient-to-br from-sage-100 to-sage-200 overflow-hidden">
                {course.thumbnail ? (
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105"
                    style={{ transition: 'transform 400ms ease' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {course.category === 'Parenting Basics' ? '🌱' :
                         course.category === 'Emotional Intelligence' ? '💚' :
                         course.category === 'Discipline' ? '⭐' : '📖'}
                      </div>
                      <p className="text-sage-600 text-xs font-medium">{course.category}</p>
                    </div>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className={`badge ${categoryColors[course.category] || 'badge-green'} shadow-soft`}>
                    {course.category}
                  </span>
                </div>
                {course.discountPrice && (
                  <div className="absolute top-3 right-3">
                    <span className="badge bg-red-100 text-red-700 shadow-soft">
                      {Math.round(((course.price - course.discountPrice) / course.price) * 100)}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-sage-900 text-base mb-2 line-clamp-2 group-hover:text-sage-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {course.title}
                </h3>
                <p className="text-sage-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {course.shortDescription}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-sage-500 mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {course.totalLessons || 0} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.totalDuration ? `${Math.round(course.totalDuration / 60)}h` : 'Self-paced'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {course.enrolledCount}
                  </span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-sage-100">
                  <div>
                    {course.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-sage-700">{formatPrice(course.discountPrice)}</span>
                        <span className="text-sm text-sage-400 line-through">{formatPrice(course.price)}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-sage-700">{formatPrice(course.price)}</span>
                    )}
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="btn-primary text-xs py-2 px-4 gap-1"
                  >
                    View Course <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/courses" className="btn-secondary">
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
