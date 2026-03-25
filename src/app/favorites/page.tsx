'use client';

import { useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Bookmark, Trash2 } from 'lucide-react';
import { DEMO_PROBLEMS } from '@/lib/demo-content';

const EMPTY_FAVORITES_SNAPSHOT = '[]';

export default function Favorites() {
  const favoritesSnapshot = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);
      window.addEventListener('pb-favorites-updated', onStoreChange);

      return () => {
        window.removeEventListener('storage', onStoreChange);
        window.removeEventListener('pb-favorites-updated', onStoreChange);
      };
    },
    () => window.localStorage.getItem('pb_favorites') ?? EMPTY_FAVORITES_SNAPSHOT,
    () => EMPTY_FAVORITES_SNAPSHOT
  );

  const favoriteIds = useMemo(() => JSON.parse(favoritesSnapshot) as string[], [favoritesSnapshot]);
  const favorites = useMemo(
    () => DEMO_PROBLEMS.filter((problem) => favoriteIds.includes(problem._id)),
    [favoriteIds]
  );

  const removeFavorite = (id: string) => {
    const nextIds = favoriteIds.filter((item) => item !== id);
    localStorage.setItem('pb_favorites', JSON.stringify(nextIds));
    window.dispatchEvent(new Event('pb-favorites-updated'));
  };

  return (
    <div className="page-shell pb-20">
      <section className="page-section pt-10 lg:pt-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-app-muted transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to discover
            </Link>
            <h1 className="section-heading mt-5 text-white">Your idea bank.</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-app-muted sm:text-lg">
              Save promising problems here, revisit them with a calmer lens, and decide which signals deserve validation,
              product framing, or a sharper startup angle.
            </p>
          </div>

          <div className="lg:text-right">
            <p className="text-5xl font-semibold tracking-[-0.08em] text-white sm:text-6xl">{favorites.length}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.34em] text-app-muted">Saved problems</p>
          </div>
        </div>
      </section>

      <section className="page-section mt-14">
        <AnimatePresence mode="popLayout">
          {favorites.length > 0 ? (
            <div className="border-t border-white/10">
              {favorites.map((favorite) => (
                <motion.article
                  key={favorite._id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid gap-6 border-b border-white/10 py-8 transition hover:border-white/20 md:grid-cols-[minmax(0,1fr)_260px] md:gap-12"
                >
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.34em] text-[var(--accent-strong)]">{favorite.category}</p>
                    <Link href={`/problem/${favorite.slug}`} className="group mt-4 block">
                      <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.05em] text-white transition group-hover:text-[var(--accent-soft)] sm:text-4xl">
                        {favorite.title}
                      </h2>
                    </Link>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-app-muted sm:text-base sm:leading-8">
                      {favorite.problemDescription}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-5 md:items-end md:text-right">
                    <p className="max-w-xs text-sm leading-7 text-white/84 sm:text-base">
                      <span className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-app-muted">Opportunity</span>
                      {favorite.opportunity}
                    </p>

                    <div className="flex items-center gap-6">
                      <Link
                        href={`/problem/${favorite.slug}`}
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-[var(--brand)] transition hover:text-[var(--accent-soft)]"
                      >
                        Open
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeFavorite(favorite._id)}
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-app-muted transition hover:text-red-200"
                        aria-label={`Remove ${favorite.title} from favorites`}
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border-t border-white/10 px-6 py-24 text-center">
              <div className="gold-ring flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(214,163,93,0.12)]">
                <Bookmark className="h-7 w-7 text-[var(--accent-strong)]" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-white">Nothing saved yet</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-app-muted sm:text-base">
                Start swiping on the homepage and keep the problems that feel painful, investable, or strategically useful.
              </p>
              <Link href="/" className="btn-primary mt-6">
                Start discovering
              </Link>
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
