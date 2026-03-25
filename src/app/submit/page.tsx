'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, Send, Sparkles } from 'lucide-react';

interface CategoryOption {
  _id: string;
  name: string;
}

export default function SubmitProblem() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    problemDescription: '',
    whyItHappens: '',
    solutions: '',
    opportunity: '',
    tags: '',
  });

  useEffect(() => {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) return;

        setCategories(data.data);
        if (data.data.length > 0) {
          setFormData((current) => ({ ...current, category: data.data[0]._id }));
        }
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatus('idle');

    const formattedData = {
      ...formData,
      whyItHappens: formData.whyItHappens.split('\n').filter((value) => value.trim()),
      solutions: formData.solutions.split('\n').filter((value) => value.trim()),
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const response = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setTimeout(() => router.push('/admin?status=pending'), 1400);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <div className="page-shell pb-20">
      <section className="page-section pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="premium-card p-8 lg:p-10">
            <span className="pill text-[var(--accent-strong)]">
              <Sparkles className="h-3.5 w-3.5" />
              Add a high-signal problem
            </span>
            <h1 className="section-heading mt-5 text-white">Contribute a problem that builders should not ignore.</h1>
            <p className="mt-4 text-sm leading-7 text-app-muted">
              Keep it specific. Describe who feels the pain, why the problem persists, and what kind of product or workflow could unlock value.
            </p>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 sm:p-8">
            {status === 'success' ? (
              <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                Submission saved for review. Redirecting to pending problems.
              </div>
            ) : null}
            {status === 'error' ? (
              <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                Submission failed. Check the fields and try again.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Problem title</label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleInput}
                  placeholder="Why is cancelling gym memberships still painful?"
                  className="field"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Category</label>
                <div className="relative">
                  <select required name="category" value={formData.category} onChange={handleInput} className="field appearance-none pr-10">
                    {categories.map((category) => (
                      <option key={category._id} value={category._id} className="bg-slate-900 text-white">
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Problem description</label>
                <textarea
                  required
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleInput}
                  rows={4}
                  placeholder="Who faces this, how often it happens, and why it matters."
                  className="field resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Why it happens</label>
                <textarea
                  required
                  name="whyItHappens"
                  value={formData.whyItHappens}
                  onChange={handleInput}
                  rows={4}
                  placeholder={'One reason per line\nLegacy workflow\nHidden incentives\nPoor UX'}
                  className="field resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Current workarounds</label>
                <textarea
                  required
                  name="solutions"
                  value={formData.solutions}
                  onChange={handleInput}
                  rows={4}
                  placeholder={'One workaround per line\nManual spreadsheet\nCustomer support call\nExisting niche tool'}
                  className="field resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Startup opportunity</label>
                <textarea
                  required
                  name="opportunity"
                  value={formData.opportunity}
                  onChange={handleInput}
                  rows={4}
                  placeholder="What could a product, workflow, or service do better here?"
                  className="field resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Tags</label>
                <input
                  name="tags"
                  value={formData.tags}
                  onChange={handleInput}
                  placeholder="subscriptions, churn, consumer-fintech"
                  className="field"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-end">
                <Link href="/" className="btn-secondary">
                  Cancel
                </Link>
                <button type="submit" disabled={loading} className="btn-primary disabled:cursor-not-allowed disabled:opacity-70">
                  {loading ? 'Publishing...' : 'Publish problem'}
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
