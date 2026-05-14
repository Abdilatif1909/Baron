import { FiArrowUpRight, FiBookOpen, FiGithub, FiInstagram, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Footer() {
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
          <div className="mt-4 space-y-3">
            <Link to="/" className="text-link text-sm">Bosh sahifa</Link>
            <Link to="/courses" className="text-link text-sm">Kurslar</Link>
            <Link to="/about" className="text-link text-sm">Platforma haqida</Link>
            <Link to="/contact" className="text-link text-sm">Bog‘lanish</Link>
          </div>
        </div>
        <div>
          <p className="text-eyebrow">Bog‘lanish</p>
          <div className="mt-4 space-y-3 text-sm text-[var(--color-body)]">
            <p className="inline-flex items-center gap-3"><FiMail /> hello@cloude.uz</p>
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
