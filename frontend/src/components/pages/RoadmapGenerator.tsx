import { useState, type FormEvent } from 'react';
import { Sparkles } from 'lucide-react';
import { api, type RoadmapDraft, type SavedRoadmap } from '../../services/api';
import { Modal } from '../common/Modal';

interface Props {
  studentId: number;
  onSaved: (roadmap: SavedRoadmap) => void;
}

const primary = 'rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50';
const input = 'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-600';

export function RoadmapGenerator({ studentId, onSaved }: Props) {
  const [goal, setGoal] = useState('');
  const [skills, setSkills] = useState('');
  const [draft, setDraft] = useState<RoadmapDraft | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [busy, setBusy] = useState<'generating' | 'saving' | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const reportedSkills = [...new Set(skills.split(',').map(skill => skill.trim()).filter(Boolean))];
    setError('');
    setSuccess('');
    if (!goal.trim() || reportedSkills.length > 20 || reportedSkills.some(skill => skill.length > 150)) {
      setError('Enter a learning goal and up to 20 skills, with at most 150 characters per skill.');
      return;
    }

    setBusy('generating');
    try {
      setDraft(await api.generateRoadmap({
        student_id: studentId,
        learning_goal: goal.trim(),
        skills: reportedSkills,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Roadmap generation failed. Try again.');
    } finally {
      setBusy(null);
    }
  }

  async function save() {
    if (!draft || busy) return;
    setError('');
    setBusy('saving');
    try {
      const saved = await api.saveRoadmap(draft.save_payload);
      setDraft(null);
      setReviewing(false);
      setSuccess('Roadmap saved. Your learning path and Dashboard have been updated.');
      onSaved(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The roadmap could not be saved. Try again.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8" aria-labelledby="roadmap-generator-title" aria-busy={busy !== null}>
      <h3 id="roadmap-generator-title" className="flex items-center gap-2 text-lg font-bold text-slate-900">
        <Sparkles className="h-5 w-5 text-indigo-600" aria-hidden="true" /> Generate a learning roadmap
      </h3>
      <form onSubmit={generate} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-semibold text-slate-700">
            <span>Learning goal</span>
            <textarea className={input} rows={2} required maxLength={800} value={goal}
              onChange={event => setGoal(event.target.value)} disabled={busy !== null}
              placeholder="Learn Python for backend development" />
          </label>
          <label className="space-y-1.5 text-sm font-semibold text-slate-700">
            <span>Skills you already know (optional)</span>
            <input className={input} value={skills} onChange={event => setSkills(event.target.value)}
              disabled={busy !== null} placeholder="Variables, loops, Git" />
          </label>
        </div>
        <button type="submit" className={primary} disabled={busy !== null || !goal.trim()}>
          {busy === 'generating' ? 'Generating roadmap…' : 'Generate Roadmap'}
        </button>
      </form>

      {error && !reviewing && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {success && <p role="status" className="text-sm text-emerald-700">{success}</p>}

      {draft && (
        <div className="space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
          <p className="text-xs font-semibold text-indigo-700">Granite draft · Unsaved</p>
          <h4 className="font-bold text-slate-900">{draft.save_payload.title}</h4>
          <p className="text-sm text-slate-700">{draft.save_payload.description}</p>
          <ol className="space-y-3">
            {draft.milestones.map(milestone => (
              <li key={milestone.sequence} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
                <h5 className="font-semibold text-slate-900">{milestone.sequence}. {milestone.title} · {milestone.estimated_weeks} {milestone.estimated_weeks === 1 ? 'week' : 'weeks'}</h5>
                <p className="mt-1">{milestone.description}</p>
                <p className="mt-1">Skills: {milestone.skills.join(', ')}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {milestone.modules.map((module, index) => (
                    <li key={index}>
                      <span className="font-medium">{module.title}</span> · {module.duration_minutes} min · {module.type}
                      <p>{module.description}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <button type="button" className={primary} disabled={busy !== null} onClick={() => {
            setError('');
            setReviewing(true);
          }}>Review &amp; Save</button>
        </div>
      )}

      {draft && (
        <Modal isOpen={reviewing} onClose={() => {
          if (busy !== 'saving') {
            setReviewing(false);
            setError('');
          }
        }} title="Save this learning roadmap?">
          <div className="space-y-4 text-sm text-slate-700">
            <p><strong>{draft.save_payload.title}</strong> will become your current learning path.</p>
            {error && <p role="alert" className="text-red-700">{error}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" disabled={busy === 'saving'} className="rounded-xl border border-slate-300 px-4 py-2.5 font-semibold disabled:opacity-50"
                onClick={() => { setReviewing(false); setError(''); }}>Cancel</button>
              <button type="button" className={primary} disabled={busy === 'saving'} onClick={save}>
                {busy === 'saving' ? 'Saving…' : 'Confirm Save'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}