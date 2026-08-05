import type { Metadata } from 'next';
import Image from 'next/image';
import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import Link from 'next/link';
import { BookOpen, Clock, Users, Star, Filter } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { CourseType } from '@/types';

// Revalidate every 60 seconds (ISR) — serve from cache, refresh in background
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'All Courses',
  description: 'Browse all parenting courses by Rupali. Expert-led, evidence-based programs for every stage of parenthood.',
};

const CATEGORIES = ['All', 'Parenting Basics', 'Child Development', 'Discipline', 'Emotional Intelligence', 'Teen Parenting', 'Special Needs', 'Self Care for Parents'];

async function getCourses(category?: string): Promise<CourseType[]> {
  try {
    await dbConnect();
    const filter: any = { status: 'published' };
    if (category && category !== 'All') filter.category = category;
    const courses = await Course.find(filter).sort({ enrolledCount: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(courses));
  } catch { return []; }
}

interface Props {
  searchParams: { cat?: string };
}

export default async function CoursesPage({ searchParams }: Props) {
  const selectedCat = searchParams.cat || 'All';
  const courses = await getCourses(selectedCat);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-hero-gradient">
        <div className="container-custom text-center">
          <h1 className="section-title mb-4">
            Learn at Your Own Pace,{' '}
            <span className="gradient-text">Grow Every Day</span>
          </h1>
          <p className="section-subtitle mx-auto">
            {courses.length > 0 ? `${courses.length} expert-led courses` : 'Expert-led courses'} — from newborn basics to teen communication.
          </p>
        </div>
      </section>

      <section className="section py-10">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            <Filter className="w-4 h-4 text-sage-500 flex-shrink-0" />
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                href={cat === 'All' ? '/courses' : `/courses?cat=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  selectedCat === cat
                    ? 'bg-sage-500 text-white border-sage-500 shadow-soft'
                    : 'bg-white text-sage-700 border-sage-100 hover:border-sage-300'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Grid */}
          {courses.length === 0 ? (
            <div className="text-center py-20 card p-10">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-sage-900 mb-2">Courses coming soon!</h3>
              <p className="text-sage-500">Check back soon — new courses are being added regularly.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="card card-hover group p-0">
                  {/* Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-sage-100 to-sage-200 relative overflow-hidden">
                    {course.thumbnail ? (
                      <Image src={course.thumbnail} alt={course.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105" style={{ transition: 'transform 400ms ease' }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl opacity-50">
                        {course.category === 'Parenting Basics' ? '🌱' :
                         course.category === 'Emotional Intelligence' ? '💚' :
                         course.category === 'Discipline' ? '⭐' :
                         course.category === 'Teen Parenting' ? '🌟' : '📖'}
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="badge badge-green shadow-soft">{course.category}</span>
                    </div>
                    {course.discountPrice && (
                      <div className="absolute top-3 right-3">
                        <span className="badge bg-red-100 text-red-700 shadow-soft">
                          {Math.round(((course.price - course.discountPrice) / course.price) * 100)}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-blue text-xs">{course.level}</span>
                      <div className="flex items-center gap-1 ml-auto">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-slate-500">4.9</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-sage-900 mb-2 group-hover:text-sage-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{course.shortDescription}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.totalLessons || 0} lessons</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.enrolledCount} enrolled</span>
                      {course.totalDuration && (
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{Math.round(course.totalDuration / 60)}h</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-sage-50">
                      <div>
                        {course.discountPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-sage-700">{formatPrice(course.discountPrice)}</span>
                            <span className="text-sm text-slate-400 line-through">{formatPrice(course.price)}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-sage-700">{formatPrice(course.price)}</span>
                        )}
                      </div>
                      <Link href={`/courses/${course.slug}`} className="btn-primary text-xs py-2 px-4">
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
