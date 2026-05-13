import { useState } from 'react';
import { FiBookOpen, FiUploadCloud, FiUserPlus, FiUsers } from 'react-icons/fi';

import DashboardCard from '../../components/DashboardCard';

function AdminDashboard({ users, onCreateUser, onUploadResource }) {
  const [userForm, setUserForm] = useState({ username: '', email: '', full_name: '', role: 'student', password: '' });
  const [uploadType, setUploadType] = useState('lectures');
  const [uploadForm, setUploadForm] = useState({ title: '', author: '', file: null, image: null });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Foydalanuvchilar" value={users.length} subtitle="Barcha ro‘yxatdan o‘tgan akkauntlar" icon={FiUsers} />
        <DashboardCard title="O‘qituvchilar" value={users.filter((item) => item.role === 'teacher').length} subtitle="O‘qituvchi akkauntlari" icon={FiUserPlus} />
        <DashboardCard title="Talabalar" value={users.filter((item) => item.role === 'student').length} subtitle="Talaba akkauntlari" icon={FiBookOpen} />
        <DashboardCard title="Administratorlar" value={users.filter((item) => item.role === 'admin').length} subtitle="Boshqaruv akkauntlari" icon={FiUploadCloud} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-[#0f172a]">Foydalanuvchilar boshqaruvi</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-[#64748b]">
                <tr>
                  <th className="pb-3">Foydalanuvchi nomi</th>
                  <th className="pb-3">To‘liq ism</th>
                  <th className="pb-3">Elektron pochta</th>
                  <th className="pb-3">Rol</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item.id} className="border-t border-[#e6edf7] text-[#334155]">
                    <td className="py-3">{item.username}</td>
                    <td className="py-3">{item.full_name}</td>
                    <td className="py-3">{item.email}</td>
                    <td className="py-3 capitalize">{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onCreateUser(userForm);
              setUserForm({ username: '', email: '', full_name: '', role: 'student', password: '' });
            }}
            className="mt-6 grid gap-3 md:grid-cols-2"
          >
            <input value={userForm.username} onChange={(e) => setUserForm({ ...userForm, username: e.target.value })} placeholder="Foydalanuvchi nomi" className="input-shell" required />
            <input value={userForm.full_name} onChange={(e) => setUserForm({ ...userForm, full_name: e.target.value })} placeholder="To‘liq ism" className="input-shell" required />
            <input value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} type="email" placeholder="Elektron pochta" className="input-shell" required />
            <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} className="input-shell">
              <option value="student">Talaba</option>
              <option value="teacher">O‘qituvchi</option>
              <option value="admin">Administrator</option>
            </select>
            <input value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} type="password" placeholder="Parol" className="input-shell md:col-span-2" required />
            <button type="submit" className="brand-primary md:col-span-2 rounded-2xl px-5 py-3 text-sm font-semibold">Foydalanuvchi yaratish</button>
          </form>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-[#0f172a]">Yuklash boshqaruvi</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append('title', uploadForm.title);
              if (uploadType === 'books') {
                formData.append('author', uploadForm.author);
                if (uploadForm.image) formData.append('image', uploadForm.image);
              }
              if (uploadForm.file) formData.append('file', uploadForm.file);
              onUploadResource(uploadType, formData);
              setUploadForm({ title: '', author: '', file: null, image: null });
            }}
            className="mt-5 space-y-4"
          >
            <select value={uploadType} onChange={(e) => setUploadType(e.target.value)} className="input-shell">
              <option value="lectures">Ma’ruza yuklash</option>
              <option value="practicals">Amaliyot yuklash</option>
              <option value="books">Kitob yuklash</option>
            </select>
            <input value={uploadForm.title} onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })} placeholder="Sarlavha" className="input-shell" required />
            {uploadType === 'books' ? <input value={uploadForm.author} onChange={(e) => setUploadForm({ ...uploadForm, author: e.target.value })} placeholder="Muallif" className="input-shell" required /> : null}
            <input type="file" accept="application/pdf" onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })} className="w-full rounded-2xl border border-dashed border-[#dbe7f3] bg-[#f8fbff] px-4 py-4 text-sm text-[#334155]" required />
            {uploadType === 'books' ? <input type="file" accept="image/*" onChange={(e) => setUploadForm({ ...uploadForm, image: e.target.files?.[0] || null })} className="w-full rounded-2xl border border-dashed border-[#dbe7f3] bg-[#f8fbff] px-4 py-4 text-sm text-[#334155]" /> : null}
            <button type="submit" className="brand-primary w-full rounded-2xl px-5 py-3 text-sm font-semibold">Resursni yuklash</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
