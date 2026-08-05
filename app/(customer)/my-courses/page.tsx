import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Course from '@/models/Course';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BookOpen, Play, ArrowRight, GraduationCap } from 'lucide-react';
import type { CourseType } from '@/types';

export default async function MyCoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  await dbConnect();
  const user = await User.findById(session.user.id)
    .populate({
      path: 'purchasedCourses',
      model: Course,
      select: 'title slug shortDescription thumbnail category price enrolledCount totalLessons level',
    })
    .lean();

  const purchased = ((user as any)?.purchasedCourses || []) as CourseType[];

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-sage-900 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
          My Learning 📚
        </h1>
        <p className="text-sage-500 text-sm">Welcome back, {session?.user?.name?.split(' ')[0]}! Continue your parenting journey.</p>
      </div>

      {purchased.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="w-20 h-20 bg-sage-100 rounded-3xl flex items-center justify-center mx-auto mb-4 text-4xl">📚</div>
          <h2 className="text-xl font-bold text-sage-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            No courses yet
          </h2>
          <p className="text-sage-500 mb-6">Browse our courses and start your parenting transformation today!</p>
          <Link href="/courses" className="btn-primary">
            <GraduationCap className="w-4 h-4" /> Browse Courses
          </Link>
        </div>
      ) : (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-sage-700">{purchased.length}</p>
              <p className="text-xs text-sage-500 mt-1">Courses Enrolled</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-mist-600">
                {purchased.reduce((a, c) => a + (c.totalLessons || 0), 0)}
              </p>
              <p className="text-xs text-sage-500 mt-1">Total Lessons</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-beige-600">∞</p>
              <p className="text-xs text-sage-500 mt-1">Lifetime Access</p>
            </div>
          </div>

          {/* Course cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {purchased.map((course) => (
              <div key={course._id} className="card card-hover p-0 overflow-hidden group">
                <div className="h-40 bg-gradient-to-br from-sage-100 to-sage-200 relative overflow-hidden">
                  {course.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🎓</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Link
                    href={`/my-courses/${course._id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft">
                      <Play className="w-5 h-5 text-sage-600 ml-0.5 fill-sage-600" />
                    </div>
                  </Link>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-sage-900 text-sm leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {course.title}
                    </h3>
                    <span className="badge badge-green text-xs whitespace-nowrap">{course.level}</span>
                  </div>
                  <p className="text-sage-500 text-xs mb-4 line-clamp-2">{course.shortDescription}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-sage-400">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {course.totalLessons || 0} lessons
                      </span>
                    </div>
                    <Link href={`/my-courses/${course._id}`} className="btn-primary text-xs py-2 px-4 gap-1">
                      Continue <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Browse more */}
          <div className="mt-8 card p-6 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sage-900">Want to learn more?</p>
              <p className="text-sage-500 text-sm">Explore more courses by Rupali</p>
            </div>
            <Link href="/courses" className="btn-secondary">
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
