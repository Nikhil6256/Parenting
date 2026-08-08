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
  title: 'सर्व कोर्सेस - Rise With Rupali',
  description: 'रुपाली मॅडमचे सर्व पॅरेंटिंग कोर्सेस. तुमच्या सोयीनुसार, कधीही आणि कुठूनही शिका.',
};

const CATEGORIES = ['सर्व', 'पॅरेंटिंग मूलतत्वे', 'बालविकास', 'सकारात्मक शिस्त', 'भावनिक विकास', 'किशोरवयीन पालकत्व'];

async function getCourses(category?: string): Promise<CourseType[]> {
  try {
    await dbConnect();
    const filter: any = { status: 'published' };
    if (category && category !== 'All' && category !== 'सर्व') filter.category = category;
    const courses = await Course.find(filter).sort({ enrolledCount: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(courses));
  } catch { return []; }
}

interface Props {
  searchParams: { cat?: string };
}

export default async function CoursesPage({ searchParams }: Props) {
  const selectedCat = searchParams.cat || 'सर्व';
  const courses = await getCourses(selectedCat);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-hero-gradient">
        <div className="container-custom text-center">
          <h1 className="section-title mb-4">
            तुमच्या वेळेनुसार शिका,{' '}
            <span className="gradient-text">दररोज समृद्ध व्हा</span>
          </h1>
          <p className="section-subtitle mx-auto">
            सोपे आणि प्रभावी कोर्सेस — लहान मुलांपासून ते किशोरावस्थेपर्यंतच्या सर्व टप्प्यांसाठी मार्गदर्शन.
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
                href={cat === 'सर्व' ? '/courses' : `/courses?cat=${encodeURIComponent(cat)}`}
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
              <h3 className="text-xl font-bold text-sage-900 mb-2">कोर्सेस लवकरच येत आहेत!</h3>
              <p className="text-sage-500">नवीन कोर्सेस जोडले जात आहेत, कृपया लवकरच तपासा.</p>
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
                        {course.category === 'Parenting Basics' || course.category === 'पॅरेंटिंग मूलतत्वे' ? '🌱' :
                         course.category === 'Emotional Intelligence' || course.category === 'भावनिक विकास' ? '💚' :
                         course.category === 'Discipline' || course.category === 'सकारात्मक शिस्त' ? '⭐' : '📖'}
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="badge badge-green shadow-soft">{course.category}</span>
                    </div>
                    {course.discountPrice && (
                      <div className="absolute top-3 right-3">
                        <span className="badge bg-red-100 text-red-700 shadow-soft">
                          {Math.round(((course.price - course.discountPrice) / course.price) * 100)}% सूट
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-blue text-xs">{course.level === 'Beginner' ? 'सोपा' : course.level}</span>
                      <div className="flex items-center gap-1 ml-auto">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-slate-500">४.९</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-sage-900 mb-2 group-hover:text-sage-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{course.shortDescription}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.totalLessons || 0} धडे</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.enrolledCount} पालक</span>
                      {course.totalDuration && (
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{Math.round(course.totalDuration / 60)} तास</span>
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
                        कोर्स पहा
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
