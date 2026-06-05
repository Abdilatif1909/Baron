import { FiBookOpen, FiFileText, FiPieChart, FiSettings, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const roleItems = {
  student: [
    { label: 'Umumiy ko‘rinish', icon: FiPieChart, to: '/dashboard' },
    { label: 'Testlar', icon: FiFileText, to: '/tests' },
    { label: 'Kitoblar', icon: FiBookOpen, to: '/books' },
  ],
  teacher: [
    { label: 'Teacher panel', icon: FiPieChart, to: '/teacher' },
    { label: 'Test laboratoriyasi', icon: FiFileText, to: '/teacher/tests' },
    { label: 'Talabalar', icon: FiUsers, to: '/teacher' },
    { label: 'Kitoblar', icon: FiBookOpen, to: '/books' },
  ],
  admin: [
    { label: 'Umumiy ko‘rinish', icon: FiPieChart, to: '/dashboard' },
    { label: 'Foydalanuvchilar', icon: FiUsers, to: '/dashboard' },
    { label: 'Resurslar', icon: FiFileText, to: '/dashboard' },
    { label: 'Sozlamalar', icon: FiSettings, to: '/dashboard' },
  ],
};

function Sidebar({ role }) {
  const items = roleItems[role] || roleItems.student;

  return (
    <aside className="glass-panel h-fit rounded-[2rem] p-6">
      <p className="text-eyebrow">{role} paneli</p>
      <h2 className="text-h3 mt-3">Boshqaruv markazi</h2>
      <div className="mt-6 space-y-2">
        {items.map(({ label, icon: Icon, to }) => (
          <Link key={label} to={to || '/dashboard'} className="text-sidebar flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-[#eef6ff] hover:text-[var(--color-link-hover)]">
            <Icon className="text-[#2563eb]" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
