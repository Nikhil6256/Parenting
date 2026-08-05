import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { formatPrice, formatDate } from '@/lib/utils';
import { BookOpen, Clock, Users, Star, CheckCircle, Play, Lock } from 'lucide-react';
import BuyButton from '@/components/courses/BuyButton';
import type { CourseType } from '@/types';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const course = await Course.findOne({ slug: params.slug, status: 'published' }).lean() as any;
  if (!course) return { title: 'Course Not Found' };
  return {
    title: course.title,
    description: course.shortDescription,
    openGraph: { title: course.title, description: course.shortDescription, images: [course.thumbnail] },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  await dbConnect();
  const course = await Course.findOne({ slug: params.slug, status: 'published' }).lean() as CourseType;
  if (!course) notFound();

  const c = JSON.parse(JSON.stringify(course));
  const totalLessons = c.curriculum.reduce((a: number, m: any) => a + (m.lessons?.length || 0), 0);

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-10 bg-hero-gradient">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="badge badge-green">{c.category}</span>
                <span className="badge badge-blue">{c.level}</span>
              </div>
              <h1 className="section-title mb-4">{c.title}</h1>
              <p className="text-sage-600 text-lg mb-5 leading-relaxed">{c.shortDescription}</p>

              <div className="flex items-center gap-4 flex-wrap text-sm text-sage-600 mb-6">
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9 (120 reviews)</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {c.enrolledCount} students</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {totalLessons} lessons</span>
                {c.totalDuration && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {Math.round(c.totalDuration / 60)}h total</span>}
              </div>

              <p className="text-sm text-sage-500">By <span className="font-semibold text-sage-700">Rupali</span> · Last updated {formatDate(c.updatedAt)}</p>
            </div>

            {/* Purchase card — desktop */}
            <div className="hidden lg:block">
              <div className="card p-6 sticky top-24">
                {c.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.thumbnail} alt={c.title} className="w-full h-48 object-cover rounded-xl mb-5" />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-sage-100 to-sage-200 rounded-xl mb-5 flex items-center justify-center text-6xl">📚</div>
                )}
                <PricingBlock course={c} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section py-10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* What you'll learn */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-sage-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>What You&apos;ll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {['Evidence-based parenting strategies', 'How to regulate your own emotions', 'Communication techniques that work', 'Setting boundaries with love', 'Understanding child development', 'Building deep emotional connection'].map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-sage-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-sage-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>About This Course</h2>
                <div className="prose-custom text-sm whitespace-pre-wrap">{c.description}</div>
              </div>

              {/* Curriculum */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-sage-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>Course Curriculum</h2>
                <p className="text-sage-500 text-sm mb-5">{totalLessons} lessons · {c.curriculum.length} modules</p>

                <div className="space-y-3">
                  {c.curriculum.map((mod: any, mi: number) => (
                    <details key={mi} className="group border border-sage-100 rounded-xl overflow-hidden" open={mi === 0}>
                      <summary className="flex items-center gap-3 px-5 py-3.5 cursor-pointer hover:bg-sage-50 transition-colors">
                        <span className="w-6 h-6 bg-sage-100 text-sage-700 rounded-full text-xs flex items-center justify-center font-bold">{mi + 1}</span>
                        <span className="font-semibold text-slate-800 text-sm flex-1">{mod.moduleTitle}</span>
                        <span className="text-xs text-slate-400">{mod.lessons?.length} lessons</span>
                      </summary>
                      <div className="border-t border-sage-50">
                        {mod.lessons?.map((lesson: any, li: number) => (
                          <div key={li} className="flex items-center gap-3 px-5 py-3 border-b border-sage-50 last:border-0 hover:bg-sage-50/50 transition-colors">
                            <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                              {lesson.isFree ? (
                                <Play className="w-3 h-3 text-sage-600 fill-sage-600 ml-0.5" />
                              ) : (
                                <Lock className="w-3 h-3 text-slate-400" />
                              )}
                            </div>
                            <span className="text-sm text-slate-700 flex-1">{lesson.title}</span>
                            <div className="flex items-center gap-3">
                              {lesson.isFree && <span className="badge badge-green text-xs">Free preview</span>}
                              {lesson.duration && <span className="text-xs text-slate-400">{lesson.duration}m</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky purchase card — mobile/tablet */}
            <div className="lg:hidden">
              <div className="card p-6">
                <PricingBlock course={c} />
              </div>
            </div>

            {/* Sidebar purchase card — desktop (sticky) */}
            <div className="hidden lg:block">
              <div className="card p-6 sticky top-24 space-y-4">
                <PricingBlock course={c} />
                <div className="pt-4 border-t border-sage-50 space-y-2 text-xs text-slate-500">
                  <p className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-sage-500" /> Lifetime access</p>
                  <p className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-sage-500" /> Watch on any device</p>
                  <p className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-sage-500" /> Secure Razorpay checkout</p>
                  <p className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-sage-500" /> Certificate of completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PricingBlock({ course }: { course: any }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        {course.discountPrice ? (
          <>
            <span className="text-3xl font-bold text-sage-700">{formatPrice(course.discountPrice)}</span>
            <span className="text-lg text-slate-400 line-through">{formatPrice(course.price)}</span>
            <span className="badge bg-red-100 text-red-700">
              {Math.round(((course.price - course.discountPrice) / course.price) * 100)}% OFF
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-sage-700">{formatPrice(course.price)}</span>
        )}
      </div>
      <BuyButton courseId={course._id} courseSlug={course.slug} />
      <p className="text-xs text-center text-slate-400 mt-3">Secure payment via Razorpay</p>
    </div>
  );
}
