import { Users, BookOpen, Star, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '5,000+', label: 'Happy Parents', color: 'bg-sage-50 text-sage-600' },
  { icon: BookOpen, value: '20+', label: 'Expert Courses', color: 'bg-mist-50 text-mist-600' },
  { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'bg-beige-50 text-beige-600' },
  { icon: Award, value: '8 Years', label: 'Experience', color: 'bg-blush-50 text-blush-600' },
];

export default function StatsSection() {
  return (
    <section className="py-12 bg-white border-b border-sage-50">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-3 p-5 rounded-xl hover:bg-sage-50 transition-colors duration-200 group">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-sage-900" style={{ fontFamily: 'var(--font-playfair)' }}>{stat.value}</p>
                <p className="text-sm text-sage-500 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
