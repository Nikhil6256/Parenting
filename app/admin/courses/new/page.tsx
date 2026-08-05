'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Trash2, ChevronDown, ChevronUp, Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatBunnyVideoUrl } from '@/lib/utils';

const CATEGORIES = [
  'Parenting Basics', 'Child Development', 'Discipline',
  'Emotional Intelligence', 'Teen Parenting', 'Special Needs',
  'Self Care for Parents', 'Other',
];

interface LessonForm {
  title: string;
  videoUrl: string;
  duration: number;
  isFree: boolean;
  description: string;
}

interface ModuleForm {
  moduleTitle: string;
  lessons: LessonForm[];
}

interface CourseForm {
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  discountPrice: number;
  thumbnail: string;
  category: string;
  level: string;
  language: string;
  status: string;
  curriculum: ModuleForm[];
}

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));

  const { register, control, handleSubmit, formState: { errors } } = useForm<CourseForm>({
    defaultValues: {
      title: '', shortDescription: '', description: '', price: 0, discountPrice: 0,
      thumbnail: '', category: 'Parenting Basics', level: 'Beginner',
      language: 'English', status: 'draft',
      curriculum: [{ moduleTitle: 'Introduction', lessons: [{ title: '', videoUrl: '', duration: 0, isFree: true, description: '' }] }],
    },
  });

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({ control, name: 'curriculum' });

  const toggleModule = (i: number) => {
    setExpandedModules(prev => {
      const n = new Set(prev);
      if (n.has(i)) n.delete(i); else n.add(i);
      return n;
    });
  };

  const onSubmit = async (data: CourseForm) => {
    setLoading(true);
    try {
      const formattedCurriculum = (data.curriculum || []).map(mod => ({
        ...mod,
        lessons: (mod.lessons || []).map(l => ({
          ...l,
          videoUrl: formatBunnyVideoUrl(l.videoUrl),
          duration: Number(l.duration) || 0,
        })),
      }));

      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          curriculum: formattedCurriculum,
          price: Number(data.price),
          discountPrice: data.discountPrice ? Number(data.discountPrice) : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || 'Failed to create course');
      } else {
        toast.success('Course created! 🎉');
        router.push('/admin/courses');
      }
    } catch {
      toast.error('Failed to create course. Please check fields.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloudinaryUpload = () => {
    toast('Cloudinary upload widget — plug in your cloud name to enable', { icon: '📷' });
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/courses" className="btn-ghost text-sm p-2">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-playfair)' }}>Create New Course</h1>
          <p className="text-slate-500 text-sm">Fill in the details below to publish your course</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info Card */}
        <div className="card p-6">
          <h2 className="font-bold text-slate-700 mb-5 text-base">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Course Title *</label>
              <input type="text" className="input" placeholder="e.g. Positive Parenting Foundations" {...register('title', { required: 'Title is required' })} />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="label">Short Description * <span className="text-slate-400 font-normal">(max 200 chars)</span></label>
              <textarea className="input resize-none" rows={2} maxLength={200} placeholder="One-line summary shown on course cards..." {...register('shortDescription', { required: 'Short description is required' })} />
            </div>

            <div>
              <label className="label">Full Description *</label>
              <textarea className="input resize-none" rows={5} placeholder="Detailed description of what students will learn, who it's for, etc." {...register('description', { required: 'Description is required' })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Category *</label>
                <select className="input" {...register('category')}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Level</label>
                <select className="input" {...register('level')}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Price (₹) *</label>
                <input type="number" min={0} className="input" placeholder="2999" {...register('price', { required: true, min: 0 })} />
              </div>
              <div>
                <label className="label">Discount Price (₹) <span className="text-slate-400 font-normal">optional</span></label>
                <input type="number" min={0} className="input" placeholder="1999" {...register('discountPrice')} />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="label">Thumbnail URL</label>
              <div className="flex gap-2">
                <input type="url" className="input" placeholder="https://res.cloudinary.com/..." {...register('thumbnail')} />
                <button type="button" onClick={handleCloudinaryUpload} className="btn-secondary text-sm px-4 whitespace-nowrap">
                  <Upload className="w-4 h-4" /> Upload
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Language</label>
                <input type="text" className="input" defaultValue="English" {...register('language')} />
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input" {...register('status')}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum Builder */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-700 text-base">Curriculum</h2>
            <button
              type="button"
              onClick={() => {
                appendModule({ moduleTitle: `Module ${moduleFields.length + 1}`, lessons: [] });
                setExpandedModules(prev => new Set([...prev, moduleFields.length]));
              }}
              className="btn-ghost text-xs border border-sage-200 text-sage-600"
            >
              <Plus className="w-3.5 h-3.5" /> Add Module
            </button>
          </div>

          <div className="space-y-4">
            {moduleFields.map((mod, mi) => (
              <ModuleEditor
                key={mod.id}
                moduleIndex={mi}
                control={control}
                register={register}
                expanded={expandedModules.has(mi)}
                onToggle={() => toggleModule(mi)}
                onRemove={() => removeModule(mi)}
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pb-8">
          <button type="submit" disabled={loading} className="btn-primary px-8">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Create Course'}
          </button>
          <Link href="/admin/courses" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

function ModuleEditor({ moduleIndex, control, register, expanded, onToggle, onRemove }: any) {
  const { fields: lessonFields, append: appendLesson, remove: removeLesson } = useFieldArray({
    control,
    name: `curriculum.${moduleIndex}.lessons`,
  });

  return (
    <div className="border border-sage-100 rounded-xl overflow-hidden">
      {/* Module header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-sage-50">
        <button type="button" onClick={onToggle} className="flex-1 flex items-center gap-2 text-left">
          <span className="w-6 h-6 bg-sage-500 text-white text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {moduleIndex + 1}
          </span>
          <input
            className="font-semibold text-slate-700 bg-transparent border-none outline-none flex-1 text-sm"
            placeholder="Module Title"
            {...register(`curriculum.${moduleIndex}.moduleTitle`)}
            onClick={e => e.stopPropagation()}
          />
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        <button type="button" onClick={onRemove} className="text-red-400 hover:text-red-600 p-1">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Lessons */}
      {expanded && (
        <div className="p-4 space-y-3">
          {lessonFields.map((lesson, li) => (
            <div key={lesson.id} className="border border-slate-100 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 w-6 text-center">{li + 1}</span>
                <input className="input flex-1 py-2 text-sm" placeholder="Lesson title" {...register(`curriculum.${moduleIndex}.lessons.${li}.title`)} />
                <label className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
                  <input type="checkbox" className="rounded" {...register(`curriculum.${moduleIndex}.lessons.${li}.isFree`)} />
                  Free
                </label>
                <button type="button" onClick={() => removeLesson(li)} className="text-red-400 hover:text-red-600 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex gap-2 pl-8">
                <input className="input flex-1 py-2 text-sm" placeholder="Bunny video URL (iframe embed)" {...register(`curriculum.${moduleIndex}.lessons.${li}.videoUrl`)} />
                <input type="number" className="input w-20 py-2 text-sm" placeholder="Min" {...register(`curriculum.${moduleIndex}.lessons.${li}.duration`)} />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendLesson({ title: '', videoUrl: '', duration: 0, isFree: false, description: '' })}
            className="btn-ghost text-xs text-sage-600 border border-dashed border-sage-200 w-full py-2"
          >
            <Plus className="w-3 h-3" /> Add Lesson
          </button>
        </div>
      )}
    </div>
  );
}
