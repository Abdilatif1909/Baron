import { useEffect, useMemo, useState } from 'react';
import {
  FiArrowRight,
  FiBookOpen,
  FiClipboard,
  FiDownload,
  FiLayers,
  FiTrendingDown,
  FiUsers,
} from 'react-icons/fi';
import { Link, Navigate } from 'react-router-dom';

import EmptyState from '../components/shared/EmptyState';
import SectionHeading from '../components/shared/SectionHeading';
import TeacherTestEditor from '../components/tests/TeacherTestEditor';
import TeacherTestLibrary from '../components/tests/TeacherTestLibrary';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { contentService } from '../services/contentService';
import { testService } from '../services/testService';
import { formatDate, normalizePaginated } from '../utils/format';
import { downloadStorage } from '../utils/storage';
import DashboardCard from '../components/DashboardCard';

function TeacherPanelPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [tests, setTests] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorLoading, setEditorLoading] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    loadPanel();
  }, []);

  useEffect(() => {
    if (!selectedTestId) {
      setSelectedTest(null);
      return;
    }

    const loadDetail = async () => {
      setEditorLoading(true);
      try {
        const detail = await testService.getTestById(selectedTestId);
        setSelectedTest(detail);
      } finally {
        setEditorLoading(false);
      }
    };

    loadDetail();
  }, [selectedTestId]);

  const loadPanel = async (preferredSelectedId = selectedTestId) => {
    setLoading(true);
    try {
      const [studentData, resultData, testsData, booksData] = await Promise.all([
        authService.getStudents(),
        testService.getTeacherResults(),
        testService.getTests(),
        contentService.getBooks(),
      ]);

      const normalizedStudents = normalizePaginated(studentData);
      const normalizedResults = normalizePaginated(resultData);
      const normalizedTests = normalizePaginated(testsData);
      const normalizedBooks = normalizePaginated(booksData);

      setStudents(normalizedStudents);
      setResults(normalizedResults);
      setTests(normalizedTests);
      setBooks(normalizedBooks);

      const fallbackId = normalizedTests[0]?.id || null;
      const resolvedId = preferredSelectedId && normalizedTests.some((item) => item.id === preferredSelectedId)
        ? preferredSelectedId
        : fallbackId;
      setSelectedTestId(resolvedId);
      if (!resolvedId) setSelectedTest(null);
    } finally {
      setLoading(false);
    }
  };

  const downloads = useMemo(() => downloadStorage.getDownloads(), []);

  const lowMasteryTopics = useMemo(() => {
    const grouped = new Map();

    results.forEach((item) => {
      const percent = item.total_questions ? (item.score / item.total_questions) * 100 : 0;
      const current = grouped.get(item.test_title) || {
        title: item.test_title,
        attempts: 0,
        scoreTotal: 0,
        completionTotal: 0,
      };

      current.attempts += 1;
      current.scoreTotal += percent;
      current.completionTotal += item.completion_percent || 0;
      grouped.set(item.test_title, current);
    });

    return Array.from(grouped.values())
      .map((item) => ({
        ...item,
        mastery: Math.round(item.scoreTotal / item.attempts),
        completion: Math.round(item.completionTotal / item.attempts),
      }))
      .sort((a, b) => a.mastery - b.mastery)
      .slice(0, 5);
  }, [results]);

  const bookLeaderboard = useMemo(() => {
    const counts = new Map();

    downloads
      .filter((item) => item.type === 'book')
      .forEach((item) => {
        counts.set(item.title, (counts.get(item.title) || 0) + (item.count || 1));
      });

    return books
      .map((book) => ({
        ...book,
        count: counts.get(book.title) || 0,
      }))
      .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, 'uz'))
      .slice(0, 5);
  }, [books, downloads]);

  const stats = useMemo(() => {
    const totalBookDownloads = bookLeaderboard.reduce((sum, item) => sum + item.count, 0);
    const strugglingTopics = lowMasteryTopics.filter((item) => item.mastery < 70).length;

    return [
      { title: 'Ro‘yxatdan o‘tgan talabalar', value: students.length, subtitle: 'Teacher kuzatuvidagi o‘quvchilar', icon: FiUsers },
      { title: 'Faol mavzular', value: tests.length, subtitle: 'Test bilan bog‘langan baholash mavzulari', icon: FiLayers },
      { title: 'Past o‘zlashtirish', value: strugglingTopics, subtitle: '70% dan past o‘rtacha mavzular', icon: FiTrendingDown },
      { title: 'Kitob yuklamalari', value: totalBookDownloads, subtitle: 'Lokal kuzatuv bo‘yicha eng faol kitoblar', icon: FiDownload },
    ];
  }, [bookLeaderboard, lowMasteryTopics, students.length, tests.length]);

  const handleCreateNew = () => {
    setSelectedTestId(null);
    setSelectedTest(null);
    setEditorLoading(false);
  };

  const handleEditorSaved = async (testId) => {
    await loadPanel(testId);
  };

  const handleEditorDeleted = async () => {
    await loadPanel(null);
  };

  if (user?.role !== 'teacher' && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section className="container-shell py-10">
      <div className="space-y-8">
        <div className="brand-dark-panel rounded-[2rem] p-8 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-eyebrow !text-white/75">Teacher panel</p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Talabalar oqimi, mavzu diagnostikasi va test laboratoriyasi bitta panelda.</h1>
              <p className="mt-4 text-base leading-8 text-white/80 sm:text-lg">
                Ranglarga tegmasdan, o‘qituvchi uchun kreativ boshqaruv maydoni tayyorlandi: talabalar ro‘yxati, o‘zlashtirish darajasi, kitob yuklamalari va tezkor test yaratish.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/teacher/tests" className="rounded-2xl bg-white px-6 py-4 font-semibold text-[#0f172a] shadow-lg">
                To‘liq test laboratoriyasi <FiArrowRight className="ml-2 inline-flex" />
              </Link>
              <Link to="/tests" className="glass-button rounded-2xl px-6 py-4 text-sm font-semibold text-white">
                Talaba ko‘rinishi
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <DashboardCard key={item.title} {...item} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Talabalar registri"
              title="Ro‘yxatdan o‘tgan talabalar ro‘yxati"
              description="Teacher nazoratida bo‘lgan talabalar va ularning ro‘yxatdan o‘tgan sanasi shu yerda ko‘rinadi."
            />
            {loading ? (
              <div className="mt-6 space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-20 animate-pulse rounded-3xl bg-[#eef3f9]" />
                ))}
              </div>
            ) : students.length === 0 ? (
              <div className="mt-6">
                <EmptyState title="Talabalar hali yo‘q" description="Yangi student akkauntlar ro‘yxatdan o‘tgach shu yerda paydo bo‘ladi." />
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {students.slice(0, 8).map((student, index) => (
                  <div key={student.id} className="soft-card flex items-center justify-between gap-4 rounded-[1.5rem] p-5">
                    <div className="flex items-center gap-4">
                      <div className="icon-chip">{index + 1}</div>
                      <div>
                        <p className="text-card-title">{student.display_name || student.full_name || student.username}</p>
                        <p className="text-muted mt-1">{student.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[var(--color-heading-2)]">{student.username}</p>
                      <p className="text-muted mt-1">{formatDate(student.date_joined)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Mavzu diagnostikasi"
              title="Qaysi mavzuda o‘zlashtirish past?"
              description="Natijalar ichidan eng sust o‘zlashtirilgan mavzular avtomatik ajratib ko‘rsatiladi."
            />
            {loading ? (
              <div className="mt-6 space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-24 animate-pulse rounded-3xl bg-[#eef3f9]" />
                ))}
              </div>
            ) : lowMasteryTopics.length === 0 ? (
              <div className="mt-6">
                <EmptyState title="Diagnostika uchun ma’lumot kam" description="Talabalar test ishlagach mavzular bo‘yicha tahlil shu yerda paydo bo‘ladi." />
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {lowMasteryTopics.map((topic) => (
                  <div key={topic.title} className="rounded-[1.5rem] bg-[rgba(248,251,255,0.92)] p-5 shadow-[inset_0_0_0_1px_rgba(219,228,240,0.65)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-card-title">{topic.title}</p>
                        <p className="text-muted mt-2">{topic.attempts} ta urinish • Bajarilish {topic.completion}%</p>
                      </div>
                      <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-sm font-semibold text-[var(--color-link)]">
                        {topic.mastery}%
                      </span>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e6edf7]">
                      <div className="h-full rounded-full bg-[var(--color-link)]" style={{ width: `${Math.max(topic.mastery, 8)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Kitoblar pulse"
              title="Eng ko‘p yuklab olingan kitoblar"
              description="Lokal kuzatuv asosida qaysi kitoblar ko‘proq ochilayotgani va yuklanayotgani ko‘rsatiladi."
            />
            {loading ? (
              <div className="mt-6 space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-20 animate-pulse rounded-3xl bg-[#eef3f9]" />
                ))}
              </div>
            ) : bookLeaderboard.length === 0 ? (
              <div className="mt-6">
                <EmptyState title="Kitoblar topilmadi" description="Kitoblar yuklangandan keyin yuklama faolligi shu yerda ko‘rinadi." />
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {bookLeaderboard.map((book, index) => (
                  <div key={book.id} className="soft-card flex items-center justify-between gap-4 rounded-[1.5rem] p-5">
                    <div className="flex items-center gap-4">
                      <div className="icon-chip"><FiBookOpen /></div>
                      <div>
                        <p className="text-card-title">{book.title}</p>
                        <p className="text-muted mt-1">Top {index + 1} • PDF kutubxona</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-sm font-semibold text-[var(--color-link)]">
                      {book.count} marta
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Tezkor xulosa"
              title="Teacher uchun kreativ signal paneli"
              description="Eng muhim signallar bir joyda: qaysi mavzu sust, nechta talaba faol va qaysi kitob ko‘proq aylanmoqda."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="soft-card rounded-[1.5rem] p-5">
                <p className="text-muted">Faol urinishlar</p>
                <p className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--color-heading-2)]">{results.length}</p>
              </div>
              <div className="soft-card rounded-[1.5rem] p-5">
                <p className="text-muted">Eng sust mavzu</p>
                <p className="mt-3 text-lg font-bold text-[var(--color-heading-2)]">{lowMasteryTopics[0]?.title || '—'}</p>
              </div>
              <div className="soft-card rounded-[1.5rem] p-5">
                <p className="text-muted">Yuklama lideri</p>
                <p className="mt-3 text-lg font-bold text-[var(--color-heading-2)]">{bookLeaderboard[0]?.title || '—'}</p>
              </div>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-[rgba(219,228,240,0.75)] bg-[rgba(248,251,255,0.88)] p-6">
              <p className="text-card-title">Kreativ tavsiya</p>
              <p className="text-body mt-3">
                Past o‘zlashtirilgan mavzular uchun mini-quiz oching, yuklama yetakchi kitob bilan birga amaliy vazifa bering va keyingi testni shu panelning pastidan yaratib yuboring.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.42fr_1fr]">
          <TeacherTestLibrary
            tests={tests}
            selectedTestId={selectedTestId}
            loading={loading}
            onSelect={setSelectedTestId}
            onCreateNew={handleCreateNew}
          />

          <TeacherTestEditor
            test={selectedTest}
            loading={editorLoading}
            onSaved={handleEditorSaved}
            onDeleted={handleEditorDeleted}
          />
        </div>

        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionHeading
              eyebrow="Yakuniy qatlam"
              title="Teacher workflow endi to‘liq"
              description="Ro‘yxatdan o‘tgan talabalar, past o‘zlashtirilgan mavzular, kitob yuklamalari va test yaratuvchi bir sahifada birlashdi."
            />
            <Link to="/dashboard" className="brand-primary rounded-2xl px-5 py-3 text-sm font-semibold">
              Asosiy dashboardga qaytish
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeacherPanelPage;