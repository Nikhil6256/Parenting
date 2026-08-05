'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Lock, FileText } from 'lucide-react';
import type { CourseType, LessonType } from '@/types';

interface Props {
  course: CourseType;
  activeLesson: LessonType | null;
  onSelectLesson: (lesson: LessonType) => void;
}

export default function CourseSidebar({ course, activeLesson, onSelectLesson }: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    setExpanded(prev => {
      const n = new Set(prev);
      if (n.has(i)) n.delete(i); else n.add(i);
      return n;
    });
  };

  return (
    <div className="w-full lg:w-80 bg-white border-r border-sage-100 overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b border-sage-100 sticky top-0 bg-white z-10">
        <h2 className="font-bold text-slate-800 text-sm line-clamp-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          {course.title}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {course.totalLessons} lessons · {course.level}
        </p>
      </div>

      <div className="py-2">
        {course.curriculum.map((module, mi) => (
          <div key={mi}>
            <button
              onClick={() => toggle(mi)}
              className="flex items-center gap-2 w-full px-4 py-3 hover:bg-sage-50 transition-colors text-left"
            >
              <div className="w-5 h-5 bg-sage-100 text-sage-700 rounded text-xs flex items-center justify-center font-bold flex-shrink-0">
                {mi + 1}
              </div>
              <span className="text-sm font-semibold text-slate-700 flex-1">{module.moduleTitle}</span>
              <span className="text-xs text-slate-400">{module.lessons.length}</span>
              {expanded.has(mi) ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {expanded.has(mi) && (
              <div className="pb-1">
                {module.lessons.map((lesson, li) => {
                  const isActive = activeLesson?.title === lesson.title;
                  return (
                    <button
                      key={li}
                      onClick={() => onSelectLesson(lesson)}
                      className={`flex items-start gap-3 w-full px-4 py-2.5 text-left transition-colors ${
                        isActive ? 'bg-sage-50 border-r-2 border-sage-500' : 'hover:bg-sage-50/50'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isActive ? 'bg-sage-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {lesson.videoUrl ? (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        ) : lesson.pdfUrl ? (
                          <FileText className="w-3.5 h-3.5" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium leading-snug ${isActive ? 'text-sage-700' : 'text-slate-600'}`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {lesson.duration && (
                            <span className="text-xs text-slate-400">{lesson.duration}m</span>
                          )}
                          {lesson.isFree && (
                            <span className="text-xs text-sage-500 font-medium">Free</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
