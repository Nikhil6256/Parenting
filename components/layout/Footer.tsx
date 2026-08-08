'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Mail, Phone, MapPin, Heart, Share2, MessageCircle, Video, Send } from 'lucide-react';

const footerLinks = {
  'मुख्य दुवे': [
    { href: '/about', label: 'रुपालींविषयी' },
    { href: '/courses', label: 'सर्व कोर्सेस' },
    { href: '/blog', label: 'ब्लॉग' },
    { href: '/contact', label: 'संपर्क' },
  ],
  'कोर्सेस': [
    { href: '/courses', label: 'पॅरेंटिंग मूलतत्वे' },
    { href: '/courses', label: 'बालविकास' },
    { href: '/courses', label: 'सकारात्मक शिस्त' },
    { href: '/courses', label: 'भावनिक विकास' },
  ],
  'मदत व सपोर्ट': [
    { href: '/contact', label: 'संपर्क करा' },
    { href: '/my-courses', label: 'माझे कोर्सेस' },
    { href: '/login', label: 'लॉगिन करा' },
    { href: '/signup', label: 'नवीन खाते' },
  ],
};

const socials = [
  { icon: MessageCircle, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: Share2, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: Video, href: 'https://youtube.com', label: 'YouTube', color: 'hover:text-red-500' },
  { icon: Send, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-500' },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  if (pathname?.match(/^\/my-courses\/.+/)) return null;
  if (pathname?.startsWith('/checkout')) return null;

  return (
    <footer className="bg-sage-900 text-sage-200">
      {/* Main footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-sage-500 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                Rise With Rupali
              </span>
            </Link>
            <p className="text-sage-400 text-sm leading-relaxed mb-6 max-w-xs">
              पालकांना प्रेमाने आणि समर्पक तंत्रांनी आपल्या मुलांचे भावनिक व मानसिक संगोपन करण्यास सक्षम बनवणे.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              <a href="mailto:rupalidabade999@gmail.com" className="flex items-center gap-2.5 text-sm text-sage-400 hover:text-sage-200 transition-colors">
                <Mail className="w-4 h-4 text-sage-500 flex-shrink-0" />
                <span>rupalidabade999@gmail.com</span>
              </a>
              <a href="tel:+919822176300" className="flex items-center gap-2.5 text-sm text-sage-400 hover:text-sage-200 transition-colors">
                <Phone className="w-4 h-4 text-sage-500 flex-shrink-0" />
                <span>+91 98221 76300</span>
              </a>
              <div className="flex items-center gap-2.5 text-sm text-sage-400">
                <MapPin className="w-4 h-4 text-sage-500 flex-shrink-0" />
                <span>सांगली, महाराष्ट्र</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-lg bg-sage-800 hover:bg-sage-700 flex items-center justify-center text-sage-400 ${color} transition-all duration-200`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sage-400 hover:text-sage-200 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sage-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sage-500 text-xs" suppressHydrationWarning>
            © {new Date().getFullYear()} Rise With Rupali. सर्व हक्क सुरक्षित.
          </p>
          <p className="text-sage-500 text-xs flex items-center gap-1">
            महाराष्ट्रातील पालकांसाठी <Heart className="w-3 h-3 text-red-400 fill-red-400" /> प्रेमाने तयार केले
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sage-500 hover:text-sage-300 text-xs transition-colors">गोपनीयता (Privacy)</Link>
            <Link href="/terms" className="text-sage-500 hover:text-sage-300 text-xs transition-colors">अटी व शर्ती (Terms)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
