'use client';

import { Link as LinkIcon, Share2 } from 'lucide-react';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const open = (target: string) => window.open(target, '_blank', 'noopener,noreferrer');

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="pill px-3 py-1.5 text-[10px]">
        <Share2 className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
        Share
      </span>
      <button
        type="button"
        onClick={() => open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`)}
        className="btn-secondary h-10 w-10 rounded-full p-0"
        aria-label="Share on X"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M18.9 2H21l-4.6 5.26L21.82 22h-4.24l-3.32-4.34L10.46 22H8.33l4.92-5.62L2.18 2h4.35l3 3.96L12.98 2h5.92Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)}
        className="btn-secondary h-10 w-10 rounded-full p-0"
        aria-label="Share on LinkedIn"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M4.98 3.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM3.5 8.75h2.96V20H3.5V8.75Zm5.1 0h2.84v1.54h.04c.4-.75 1.37-1.54 2.83-1.54 3.03 0 3.59 1.99 3.59 4.58V20h-2.96v-5.89c0-1.4-.03-3.21-1.95-3.21-1.96 0-2.26 1.53-2.26 3.11V20H8.6V8.75Z" />
        </svg>
      </button>
      <button type="button" onClick={copyToClipboard} className="btn-secondary h-10 w-10 rounded-full p-0" aria-label="Copy link">
        <LinkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
