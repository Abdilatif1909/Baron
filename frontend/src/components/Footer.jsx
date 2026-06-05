import { FiArrowUpRight, FiBookOpen, FiGithub, FiInstagram, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="border-t border-[var(--color-border)] py-12">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="icon-chip text-lg"><FiBookOpen /></div>
            <div>
              <h3 className="text-card-title text-[var(--color-heading-2)]">WebDasturlashEdu</h3>
              <p className="text-muted">cloude.uz uchun tayyor premium frontend</p>
            </div>
          </div>
          <p className="text-muted mt-4 max-w-md">
            React, Vite, TailwindCSS va Framer Motion asosida yaratilgan, GitHub Pages va custom domain uchun moslashtirilgan zamonaviy web dasturlash landing sayti.
          </p>
        </div>
        <div>
          <p className="text-eyebrow">Tezkor havolalar</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link to="/" className="text-link text-sm">Bosh sahifa</Link>
            <Link to="/lectures" className="text-link text-sm">Ma’ruzalar</Link>
            <Link to="/practicals" className="text-link text-sm">Amaliylar</Link>
            <Link to="/tests" className="text-link text-sm">Testlar</Link>
            {!isAuthenticated ? <Link to="/register" className="text-link text-sm">Ro‘yxatdan o‘tish</Link> : null}
            <Link to="/books" className="text-link text-sm">Kitoblar</Link>
            <Link to="/videos" className="text-link text-sm">Videolar</Link>
            <Link to="/search" className="text-link text-sm">Qidiruv</Link>
          </div>
        </div>
        <div>
          <p className="text-eyebrow">Bog‘lanish</p>
          <div className="mt-4 space-y-3 text-sm text-[var(--color-body)]">
            <p className="inline-flex items-center gap-3"><FiMail /> abdulatif1909@gmail.com</p>
            <p className="inline-flex items-center gap-3"><FiGithub /> github.com/Abdilatif1909/cloude.uz</p>
            <p className="inline-flex items-center gap-3"><FiInstagram /> @cloude.uz</p>
          </div>
          <a href="https://cloude.uz" target="_blank" rel="noreferrer" className="text-link mt-4 inline-flex items-center gap-2 text-sm">
            cloude.uz <FiArrowUpRight />
          </a>
          <p className="text-muted mt-4">© 2026 WebDasturlashEdu. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
