'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1, name: 'प्रिया शर्मा', location: 'मुंबई', role: 'दोन मुलांची आई',
    rating: 5, avatar: '👩',
    text: 'रुपाली यांच्या Positive Parenting कोर्समुळे माझ्या मुलांकडे बघण्याचा दृष्टिकोनच बदलला. रोज रागावण्यापासून आता आईपण खरोखरच आनंददायी वाटू लागले आहे. माझा ६ वर्षांचा मुलगा शांत झाला आहे — आणि मीही!',
    course: 'Positive Parenting Foundations',
  },
  {
    id: 2, name: 'Arjun & Deepika Menon', location: 'Bangalore', role: 'Parents of 3',
    rating: 5, avatar: '👨‍👩‍👦',
    text: "We had tried many parenting books but nothing clicked until Rupali's course. Her practical strategies for mealtime battles and bedtime routines have made our evenings so much more peaceful.",
    course: 'Gentle Discipline That Works',
  },
  {
    id: 3, name: 'कविता नायर', location: 'चेन्नई', role: 'एकल माता',
    rating: 5, avatar: '👩‍👦',
    text: 'एकट्या आईसारखं राहताना मला स्वतःवरचा विश्वासच उडाला होता. रुपाली यांच्या Emotional Intelligence कोर्सने मला साधनेच नव्हे, तर आत्मविश्वासही दिला. माझ्या मुलाचे शाळेतील मार्क खूप सुधारले आहेत.',
    course: 'Raising Emotionally Intelligent Kids',
  },
  {
    id: 4, name: 'Rohit Gupta', location: 'Delhi', role: 'Father of twins',
    rating: 5, avatar: '👨',
    text: "I was sceptical about online parenting courses, but Rupali's teaching style is so warm and relatable. I've recommended this to every parent I know. Best investment I've made for my family.",
    course: 'Positive Parenting Foundations',
  },
  {
    id: 5, name: 'स्नेहा पाटील', location: 'पुणे', role: 'किशोरवयीन मुलीची आई',
    rating: 5, avatar: '👩‍👧',
    text: 'माझ्या १४ वर्षांच्या मुलीशी नाते खूपच ताणले होते. Teen Parenting Module नंतर मला तिचं जग समजायला लागलं. आता आम्ही आठवड्यातून एकत्र बसतो आणि मनमोकळं बोलतो. रुपाली, तुम्ही आमचं आयुष्यच बदललंत!',
    course: 'Teen Parenting Masterclass',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const navigate = (dir: 'prev' | 'next') => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === 'next'
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length
      );
      setAnimating(false);
    }, 200);
  };

  const active = testimonials[current];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-beige-50 text-beige-700 rounded-full text-sm font-semibold mb-4 border border-beige-100">
            💬 Parent Stories
          </div>
          <h2 className="section-title mb-4">
            Real Transformations,{' '}
            <span className="gradient-text">Real Families</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Hear from parents who took the first step and never looked back.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-10">
          <div
            className={`card p-8 md:p-10 transition-all duration-200 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            <Quote className="w-10 h-10 text-sage-200 mb-4" />

            <div className="flex gap-1 mb-5">
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-sage-700 text-lg leading-relaxed mb-6 italic">
              &ldquo;{active.text}&rdquo;
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center text-2xl">
                  {active.avatar}
                </div>
                <div>
                  <p className="font-bold text-sage-900">{active.name}</p>
                  <p className="text-sm text-sage-500">{active.role} · {active.location}</p>
                </div>
              </div>
              <div className="badge badge-green text-xs">
                {active.course}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => navigate('prev')}
              className="w-10 h-10 rounded-xl border border-sage-200 flex items-center justify-center text-sage-600 hover:bg-sage-50 hover:border-sage-300 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-sage-500' : 'w-2 bg-sage-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate('next')}
              className="w-10 h-10 rounded-xl border border-sage-200 flex items-center justify-center text-sage-600 hover:bg-sage-50 hover:border-sage-300 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.filter((_, i) => i !== current).slice(0, 4).map((t) => (
            <div
              key={t.id}
              onClick={() => setCurrent(testimonials.indexOf(t))}
              className="card p-4 cursor-pointer hover:border-sage-200 transition-all duration-200 hover:shadow-card-hover"
            >
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sage-600 text-xs leading-relaxed line-clamp-3 mb-3">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.avatar}</span>
                <div>
                  <p className="text-xs font-semibold text-sage-800">{t.name}</p>
                  <p className="text-xs text-sage-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
