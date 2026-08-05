'use client';

import { useState } from 'react';
import CourseSidebar from '@/components/courses/CourseSidebar';
import type { CourseType, LessonType } from '@/types';
import { Play, FileText, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CoursePlayerClient({ course }: { course: CourseType }) {
  const allLessons = course.curriculum.flatMap(m => m.lessons);
  const [activeLesson, setActiveLesson] = useState<LessonType>(allLessons[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentIndex = allLessons.findIndex(l => l.title === activeLesson?.title);
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Sidebar (conditionally shown on desktop) */}
      {sidebarOpen && (
        <CourseSidebar
          course={course}
          activeLesson={activeLesson}
          onSelectLesson={setActiveLesson}
        />
      )}

      {/* Main player area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-14 bg-white border-b border-sage-100 flex items-center gap-3 px-4 flex-shrink-0">
          <Link href="/my-courses" className="p-1.5 rounded-lg hover:bg-sage-50 text-sage-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-sage-50 text-sage-600 transition-colors lg:flex hidden">
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-sage-500 truncate">{course.title}</p>
            <p className="text-sm font-semibold text-slate-800 truncate">{activeLesson?.title}</p>
          </div>
          <div className="text-xs text-slate-400 hidden sm:block">
            {currentIndex + 1} / {allLessons.length}
          </div>
        </div>

        {/* Video area */}
        <div className="flex-1 overflow-y-auto bg-slate-900">
          {activeLesson?.videoUrl ? (
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={activeLesson.videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={activeLesson.title}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-400">
              <div className="text-center">
                <Play className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No video for this lesson</p>
              </div>
            </div>
          )}

          {/* Lesson info */}
          <div className="bg-white p-6 max-w-3xl mx-auto mt-4 rounded-xl m-4 shadow-soft">
            <h2 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              {activeLesson?.title}
            </h2>
            {activeLesson?.description && (
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{activeLesson.description}</p>
            )}
            {activeLesson?.pdfUrl && (
              <a href={activeLesson.pdfUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 text-sm font-medium">
                <FileText className="w-4 h-4" /> Download PDF Resources
              </a>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-sage-50">
              <button
                onClick={() => prev && setActiveLesson(prev)}
                disabled={!prev}
                className="btn-ghost text-sm disabled:opacity-40 border border-sage-100"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={() => next && setActiveLesson(next)}
                disabled={!next}
                className="btn-primary text-sm"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
