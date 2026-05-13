import { useMemo } from 'react';
import { FiActivity, FiClipboard, FiTrendingUp, FiUsers } from 'react-icons/fi';

import DashboardCard from '../../components/DashboardCard';
import { formatDate } from '../../utils/format';

function TeacherDashboard({ tests, results }) {
  const averageScore = useMemo(() => {
    if (!results.length) return 0;
    return (results.reduce((sum, item) => sum + item.score, 0) / results.length).toFixed(1);
  }, [results]);

  const groupedStudents = useMemo(() => {
    const map = new Map();
    results.forEach((item) => {
      const current = map.get(item.student_name) || { student: item.student_name, attempts: 0, total: 0 };
      current.attempts += 1;
      current.total += item.score;
      map.set(item.student_name, current);
    });
    return Array.from(map.values()).map((item) => ({ ...item, average: (item.total / item.attempts).toFixed(1) }));
  }, [results]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Boshqariladigan testlar" value={tests.length} subtitle="O‘qituvchi yaratgan testlar" icon={FiClipboard} />
        <DashboardCard title="Talaba natijalari" value={results.length} subtitle="Topshirilgan javoblar" icon={FiUsers} />
        <DashboardCard title="O‘rtacha ball" value={averageScore} subtitle="Barcha natijalar bo‘yicha" icon={FiTrendingUp} />
        <DashboardCard title="Faol talabalar" value={groupedStudents.length} subtitle="Noyob ishtirokchilar" icon={FiActivity} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-[#0f172a]">Talabalar ballari</h3>
          <div className="mt-5 space-y-3">
            {groupedStudents.map((student) => (
              <div key={student.student} className="soft-card">
                <p className="font-medium text-[#0f172a]">{student.student}</p>
                <p className="mt-1 text-sm text-[#64748b]">Urinishlar: {student.attempts} • O‘rtacha ball: {student.average}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-[#0f172a]">So‘nggi tahlillar</h3>
          <div className="mt-5 space-y-3">
            {results.slice(0, 8).map((item) => (
              <div key={item.id} className="soft-card">
                <p className="font-medium text-[#0f172a]">{item.student_name}</p>
                <p className="mt-1 text-sm text-[#64748b]">{item.test_title} • Ball: {item.score} • {formatDate(item.created_at)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
