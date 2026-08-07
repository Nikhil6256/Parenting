'use client';

import { useState } from 'react';
import CourseSidebar from '@/components/courses/CourseSidebar';
import type { CourseType, LessonType } from '@/types';
import { Play, FileText, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen, Home } from 'lucide-react';
import Link from 'next/link';

export default function CoursePlayerClient({ course }: { course: CourseType }) {
  const allLessons = course.curriculum.flatMap(m => m.lessons);
  const [activeLesson, setActiveLesson] = useState<LessonType | null>(allLessons[0] ?? null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentIndex = activeLesson
    ? allLessons.findIndex(l => l._id === activeLesson._id || l.title === activeLesson.title)
    : -1;
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Empty course guard — show a friendly message instead of crashing
  if (allLessons.length === 0) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 z-30">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Play className="w-8 h-8 text-white/30 ml-1" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No lessons yet</h2>
          <p className="text-white/50 text-sm mb-6">This course doesn&apos;t have any lessons added yet. Check back soon!</p>
          <Link href="/my-courses" className="inline-flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm">
            <Home className="w-4 h-4" /> Back to My Courses
          </Link>
        </div>
      </div>
    );
  }


  return (
    // Use fixed full-viewport layout so it doesn't inherit the root layout padding
    <div className="fixed inset-0 flex flex-col bg-slate-900 z-30">
      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <header className="h-14 bg-white/95 backdrop-blur-sm border-b border-sage-100 flex items-center gap-3 px-4 flex-shrink-0 shadow-soft z-10">
        <Link
          href="/my-courses"
          className="p-2 rounded-lg hover:bg-sage-50 text-sage-600 transition-colors flex-shrink-0"
          title="Back to My Courses"
        >
          <Home className="w-4 h-4" />
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex p-2 rounded-lg hover:bg-sage-50 text-sage-600 transition-colors flex-shrink-0"
          title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>

        {/* Breadcrumb */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-sage-400 truncate font-medium">{course.title}</p>
          <p className="text-sm font-semibold text-slate-800 truncate">{activeLesson?.title}</p>
        </div>

        {/* Lesson counter */}
        <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400 bg-sage-50 px-3 py-1 rounded-full border border-sage-100 flex-shrink-0">
          {currentIndex + 1} / {allLessons.length}
        </span>
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Course Sidebar */}
        {sidebarOpen && (
          <div className="hidden lg:block flex-shrink-0 overflow-y-auto bg-white border-r border-sage-100" style={{ width: 320 }}>
            <CourseSidebar
              course={course}
              activeLesson={activeLesson}
              onSelectLesson={setActiveLesson}
            />
          </div>
        )}

        {/* ── Main Player ─────────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-slate-900">

          {/* Video */}
          <div className="w-full bg-black flex-shrink-0" style={{ aspectRatio: '16/9' }}>
            {activeLesson?.videoUrl ? (
              <iframe
                key={activeLesson.videoUrl}
                src={activeLesson.videoUrl}
                className="w-full h-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                title={activeLesson.title}
                style={{ border: 'none', display: 'block' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white/40 ml-1" />
                  </div>
                  <p className="text-sm text-white/40">No video available for this lesson</p>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Info Card */}
          <div className="flex-1 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
              <div className="bg-white rounded-2xl shadow-card border border-sage-50 p-6">

                {/* Title row */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-sage-gradient rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-slate-800 leading-snug" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {activeLesson?.title}
                    </h2>
                    {/* Show duration only if it's > 0 */}
                    {activeLesson?.duration && activeLesson.duration > 0 ? (
                      <p className="text-sm text-sage-500 mt-1">{activeLesson.duration} min</p>
                    ) : null}
                  </div>
                </div>

                {/* Description */}
                {activeLesson?.description && (
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 pl-13">
                    {activeLesson.description}
                  </p>
                )}

                {/* PDF Download */}
                {activeLesson?.pdfUrl && (
                  <a
                    href={activeLesson.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 text-sm font-medium bg-sage-50 hover:bg-sage-100 px-4 py-2.5 rounded-xl transition-colors border border-sage-100 mb-4"
                  >
                    <FileText className="w-4 h-4" />
                    Download PDF Resources
                  </a>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-sage-50">
                  <button
                    onClick={() => prev && setActiveLesson(prev)}
                    disabled={!prev}
                    className="btn-ghost text-sm disabled:opacity-30 border border-sage-100 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {prev ? (
                      <span className="hidden sm:inline">Previous</span>
                    ) : (
                      <span className="hidden sm:inline">Previous</span>
                    )}
                  </button>

                  <span className="text-xs text-slate-400 sm:hidden">
                    {currentIndex + 1}/{allLessons.length}
                  </span>

                  <button
                    onClick={() => next && setActiveLesson(next)}
                    disabled={!next}
                    className="btn-primary text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {next ? (
                      <span className="hidden sm:inline">Next</span>
                    ) : (
                      <span className="hidden sm:inline">Finished</span>
                    )}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile lesson list (bottom sheet trigger) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-sage-100 flex items-center justify-between px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => prev && setActiveLesson(prev)}
          disabled={!prev}
          className="btn-ghost text-xs disabled:opacity-30 px-3 py-2"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <div className="text-center">
          <p className="text-xs font-medium text-slate-700 max-w-[160px] truncate">{activeLesson?.title}</p>
          <p className="text-xs text-slate-400">{currentIndex + 1} of {allLessons.length}</p>
        </div>
        <button
          onClick={() => next && setActiveLesson(next)}
          disabled={!next}
          className="btn-primary text-xs px-3 py-2 disabled:opacity-30"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
