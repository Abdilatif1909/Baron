import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';

import { NAV_LINKS } from '../utils/constants';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-4">
        <div className="glass-panel flex items-center justify-between rounded-[2rem] px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="brand-primary flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black">
              WE
            </div>
            <div>
              <p className="text-[15px] font-semibold tracking-[-0.015em] text-[var(--color-heading-2)]">WebDasturlashEdu</p>
              <p className="text-soft text-xs">cloude.uz uchun zamonaviy frontend</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#2563eb] text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]'
                      : 'text-navbar hover:bg-[#eef6ff] hover:text-[var(--color-link-hover)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <ThemeToggle />
            <Link to="/contact" className="brand-primary inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold">Bog‘lanish <FiArrowRight /></Link>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle />
            <button type="button" onClick={() => setMobileOpen((prev) => !prev)} className="glass-button rounded-2xl p-3">
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container-shell mt-3 xl:hidden"
          >
            <div className="glass-panel rounded-[2rem] p-4">
              <div className="grid gap-2">
                {NAV_LINKS.map((item) => (
                  <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="text-navbar rounded-2xl px-4 py-3 hover:bg-[#eef6ff] hover:text-[var(--color-link-hover)]">
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link to="/courses" onClick={() => setMobileOpen(false)} className="glass-button rounded-2xl px-4 py-3 text-center text-sm font-semibold">Kurslarni ko‘rish</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="brand-primary rounded-2xl px-4 py-3 text-center text-sm font-semibold">Bog‘lanish</Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
