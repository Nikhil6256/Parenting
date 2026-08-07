'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong</title>
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          body{
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            background:linear-gradient(135deg,#fdf2f6 0%,#fdf8f0 50%,#fce4ed 100%);
            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
            padding:1rem;
          }
          .card{
            background:#fff;
            border-radius:1.5rem;
            box-shadow:0 8px 40px rgba(229,72,128,0.12);
            border:1px solid #fce4ed;
            padding:2.5rem 2rem;
            max-width:420px;
            width:100%;
            text-align:center;
          }
          .icon{
            width:64px;height:64px;
            border-radius:50%;
            background:#fdf2f6;
            display:flex;align-items:center;justify-content:center;
            margin:0 auto 1.25rem;
            border:2px solid #fce4ed;
          }
          h1{font-size:1.375rem;font-weight:700;color:#1e293b;margin-bottom:.5rem}
          p{font-size:.875rem;color:#64748b;line-height:1.6;margin-bottom:1.5rem}
          .digest{
            font-size:.7rem;color:#94a3b8;
            background:#f8fafc;border:1px solid #e2e8f0;
            border-radius:.5rem;padding:.35rem .6rem;
            display:inline-block;margin-bottom:1.25rem;
            font-family:monospace;
          }
          .btn-row{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap}
          .btn-primary{
            padding:.65rem 1.5rem;
            background:#e54880;color:#fff;
            border:none;border-radius:.875rem;
            font-size:.875rem;font-weight:600;cursor:pointer;
            transition:background .15s;
          }
          .btn-primary:hover{background:#cc2d65}
          .btn-secondary{
            padding:.65rem 1.5rem;
            background:#fff;color:#475569;
            border:1px solid #e2e8f0;border-radius:.875rem;
            font-size:.875rem;font-weight:500;cursor:pointer;
            transition:background .15s;text-decoration:none;display:inline-block;
          }
          .btn-secondary:hover{background:#f8fafc}
        `}</style>
      </head>
      <body>
        <div className="card" style={{
          background:'#fff',borderRadius:'1.5rem',
          boxShadow:'0 8px 40px rgba(229,72,128,0.12)',
          border:'1px solid #fce4ed',padding:'2.5rem 2rem',
          maxWidth:420,width:'100%',textAlign:'center'
        }}>
          <div style={{
            width:64,height:64,borderRadius:'50%',
            background:'#fdf2f6',display:'flex',
            alignItems:'center',justifyContent:'center',
            margin:'0 auto 1.25rem',border:'2px solid #fce4ed'
          }}>
            {/* Warning icon */}
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#e54880" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          </div>

          <h1 style={{fontSize:'1.375rem',fontWeight:700,color:'#1e293b',marginBottom:'.5rem'}}>
            Something went wrong
          </h1>
          <p style={{fontSize:'.875rem',color:'#64748b',lineHeight:1.6,marginBottom:'1.25rem'}}>
            A critical error occurred. You can try refreshing the page or go back home.
          </p>

          {error?.digest && (
            <div style={{
              fontSize:'.7rem',color:'#94a3b8',background:'#f8fafc',
              border:'1px solid #e2e8f0',borderRadius:'.5rem',
              padding:'.35rem .6rem',display:'inline-block',
              marginBottom:'1.25rem',fontFamily:'monospace'
            }}>
              Error ID: {error.digest}
            </div>
          )}

          <div style={{display:'flex',gap:'.75rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button
              onClick={() => reset()}
              style={{
                padding:'.65rem 1.5rem',background:'#e54880',color:'#fff',
                border:'none',borderRadius:'.875rem',fontSize:'.875rem',
                fontWeight:600,cursor:'pointer'
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                padding:'.65rem 1.5rem',background:'#fff',color:'#475569',
                border:'1px solid #e2e8f0',borderRadius:'.875rem',
                fontSize:'.875rem',fontWeight:500,cursor:'pointer',
                textDecoration:'none',display:'inline-block'
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
