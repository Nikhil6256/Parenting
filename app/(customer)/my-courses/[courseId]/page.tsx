import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Course from '@/models/Course';
import { notFound, redirect } from 'next/navigation';
import CoursePlayerClient from './CoursePlayerClient';

interface Props { params: { courseId: string } }

export default async function CoursePlayerPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  await dbConnect();

  // Verify ownership
  const user = await User.findById(session.user.id).lean();
  const purchased = (user as any)?.purchasedCourses?.map((id: any) => id.toString()) || [];

  if (!purchased.includes(params.courseId)) {
    redirect(`/courses`);
  }

  const course = await Course.findById(params.courseId).lean();
  if (!course) return notFound();

  const courseData = JSON.parse(JSON.stringify(course));

  return <CoursePlayerClient course={courseData} />;
}
