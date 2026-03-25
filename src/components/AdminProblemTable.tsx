'use client';

import { useRouter } from 'next/navigation';
import { Check, Trash2 } from 'lucide-react';

type AdminProblem = {
  _id: string;
  title: string;
  views: number;
  createdAt: string;
  moderationStatus: 'pending' | 'approved' | 'spam';
  categoryName: string;
};

export default function AdminProblemTable({
  problems,
}: {
  problems: AdminProblem[];
}) {
  const router = useRouter();

  const updateStatus = async (id: string, moderationStatus: 'approved' | 'spam' | 'pending') => {
    const response = await fetch(`/api/problems/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moderationStatus }),
    });

    if (!response.ok) {
      return;
    }

    router.refresh();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/4 text-app-muted">
          <tr>
            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Title</th>
            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Category</th>
            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Status</th>
            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Views</th>
            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Date</th>
            <th className="px-6 py-4 text-right font-medium uppercase tracking-[0.2em]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem._id} className="border-t border-white/8 text-white/88">
              <td className="px-6 py-4 font-medium text-white">{problem.title}</td>
              <td className="px-6 py-4 text-app-muted">{problem.categoryName}</td>
              <td className="px-6 py-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                  {problem.moderationStatus}
                </span>
              </td>
              <td className="px-6 py-4 text-app-muted">{problem.views}</td>
              <td className="px-6 py-4 text-app-muted">{new Date(problem.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => updateStatus(problem._id, 'approved')}
                    className="btn-secondary h-10 w-10 rounded-full p-0"
                    aria-label="Approve problem"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(problem._id, 'spam')}
                    className="btn-secondary h-10 w-10 rounded-full p-0 hover:border-red-400/40 hover:text-red-200"
                    aria-label="Mark as spam"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
