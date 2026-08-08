import React from 'react';

export default function LogoIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Heart Outline with Translucent Fill */}
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Parent Head */}
      <circle cx="9" cy="8.2" r="1.6" fill="currentColor" />
      {/* Parent Body / Embracing Arc */}
      <path
        d="M6.5 14c0-2.2 1.5-3.5 3.5-3.5s3.2 1.1 3.5 2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Child Head */}
      <circle cx="14.5" cy="10" r="1.3" fill="currentColor" />
      {/* Child Body */}
      <path
        d="M12.5 15c0-1.8 1.1-2.6 2.5-2.6s2.5.8 2.5 2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
