import { FiAward, FiCheckCircle, FiClock, FiTrendingUp, FiXCircle } from 'react-icons/fi';

import { formatDuration } from '../../utils/format';

function ResultSummary({ result }) {
  const incorrectCount = Math.max((result.total_questions || 0) - (result.score || 0), 0);

  return (
    <div className="space-y-6">
      <div className="brand-dark-panel rounded-[2rem] p-8">
        <p className="text-eyebrow !text-white/75">Yakuniy natija</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em]">Tabriklaymiz! Test yakunlandi.</h1>
        <p className="mt-3 max-w-2xl text-white/80">
          Siz testni muvaffaqiyatli tugatdingiz. Quyida umumiy natija, vaqt va savollar bo‘yicha batafsil tahlil ko‘rsatilgan.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="glass-panel rounded-3xl p-5"><p className="text-muted">Ball</p><h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[var(--color-heading)]">{result.score}/{result.total_questions}</h3></div>
        <div className="glass-panel rounded-3xl p-5"><p className="text-muted">Bajarilish</p><h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[var(--color-heading)]">{result.completion_percent}%</h3></div>
        <div className="glass-panel rounded-3xl p-5"><p className="text-muted">Sarflangan vaqt</p><h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[var(--color-heading)]">{formatDuration(result.time_spent_seconds)}</h3></div>
        <div className="glass-panel rounded-3xl p-5"><p className="text-muted">Javob berilgan</p><h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[var(--color-heading)]">{result.answered_count}</h3></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.38fr_1fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-h3">Natijalar tahlili</h2>
          <div className="mt-5 space-y-4">
            <div className="soft-card rounded-2xl">
              <p className="text-muted inline-flex items-center gap-2"><FiCheckCircle /> To‘g‘ri</p>
              <p className="mt-1 text-2xl font-bold text-[#15803d]">{result.score}</p>
            </div>
            <div className="soft-card rounded-2xl">
              <p className="text-muted inline-flex items-center gap-2"><FiXCircle /> Noto‘g‘ri</p>
              <p className="mt-1 text-2xl font-bold text-[#b91c1c]">{incorrectCount}</p>
            </div>
            <div className="soft-card rounded-2xl">
              <p className="text-muted inline-flex items-center gap-2"><FiClock /> Vaqt</p>
              <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">{formatDuration(result.time_spent_seconds)}</p>
            </div>
            <div className="soft-card rounded-2xl">
              <p className="text-muted inline-flex items-center gap-2"><FiAward /> Bajarilish</p>
              <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">{result.completion_percent}%</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="icon-chip"><FiTrendingUp /></div>
            <div>
              <h2 className="text-h3">Savolma-savol tahlil</h2>
              <p className="text-muted mt-1">To‘g‘ri va noto‘g‘ri javoblar tafsiloti.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {(result.answer_payload || []).map((item) => (
              <div key={item.question_id} className="soft-card rounded-3xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-muted">Savol {item.question_number}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${item.is_correct ? 'bg-[#ecfdf5] text-[#15803d]' : 'bg-[#fff1f2] text-[#be123c]'}`}>
                    {item.is_correct ? 'To‘g‘ri' : 'Noto‘g‘ri'}
                  </span>
                </div>
                <h3 className="text-card-title mt-3">{item.question}</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl bg-[#f8fbff] px-4 py-3">
                    <p className="text-muted">Tanlangan javob</p>
                    <p className="mt-1 font-semibold text-[var(--color-heading-3)]">{item.selected_answer ? `${item.selected_answer}: ${item.options[item.selected_answer]}` : 'Javob berilmagan'}</p>
                  </div>
                  <div className="rounded-2xl bg-[#f8fbff] px-4 py-3">
                    <p className="text-muted">To‘g‘ri javob</p>
                    <p className="mt-1 font-semibold text-[var(--color-heading-3)]">{item.correct_answer}: {item.options[item.correct_answer]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultSummary;
