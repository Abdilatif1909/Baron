import { motion } from 'framer-motion';
import { FiArrowRight, FiAward, FiBookOpen, FiCode, FiEdit3, FiFileText, FiInstagram, FiLayers, FiLogIn, FiPhone, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Seo from '../components/Seo';
import SectionHeading from '../components/shared/SectionHeading';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../contexts/AuthContext';
import { COURSE_ITEMS, FEATURE_ITEMS, STAT_ITEMS } from '../utils/constants';
import muqaddasImg from '../assets/muqaddas.png';

const heroMetrics = [
  { label: 'Frontend stack', value: 'React + Vite', description: 'Tezkor, zamonaviy va production-ready arxitektura', icon: FiCode },
  { label: 'Dizayn uslubi', value: 'Glass UI', description: 'Gradientlar, blur effektlar va yumshoq premium ko‘rinish', icon: FiLayers },
  { label: 'Deploy manzili', value: 'cloude.uz', description: 'GitHub Pages va custom domain uchun tayyorlangan', icon: FiTrendingUp },
  { label: 'Tajriba', value: 'Moslashuvchan', description: 'Mobil, planshet va desktop uchun optimallashtirilgan', icon: FiAward },
];

const quickSections = [
  { title: 'Ma’ruzalar', description: 'PDF ma’ruza kutubxonasini ko‘rish va yuklab olish.', to: '/lectures', icon: FiBookOpen },
  { title: 'Amaliylar', description: 'Amaliy mashg‘ulotlar bo‘limi va materiallari.', to: '/practicals', icon: FiCode },
  { title: 'Testlar', description: 'Interaktiv testlar, session va natijalar.', to: '/tests', icon: FiFileText },
  { title: 'Ro‘yxatdan o‘tish', description: 'Talaba yoki o‘qituvchi akkaunti yaratish.', to: '/register', icon: FiEdit3 },
  { title: 'Kirish', description: 'Avval yozilgan dashboard va auth oqimiga kirish.', to: '/login', icon: FiLogIn },
  { title: 'Videolar', description: 'Fan bo‘yicha YouTube playlistni zamonaviy sahifada ko‘rish.', to: '/videos', icon: FiTrendingUp },
  { title: 'Qidiruv', description: 'Ma’ruza, amaliy va kitoblar bo‘ylab izlash.', to: '/search', icon: FiTrendingUp },
];

const AUTHOR_IMAGE_URL = muqaddasImg;

function HomePage() {
  const { isAuthenticated } = useAuth();
  const visibleQuickSections = isAuthenticated
    ? quickSections.filter((item) => item.to !== '/register')
    : quickSections;

  return (
    <div className="space-y-12">
      <Seo
        title="WebDasturlashEdu | cloude.uz uchun zamonaviy frontend"
        description="WebDasturlashEdu — React + Vite + TailwindCSS + Framer Motion bilan yaratilgan, GitHub Pages va cloude.uz domeni uchun tayyor zamonaviy ta’lim platformasi frontendi."
      />

      <section className="container-shell grid gap-10 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="brand-secondary inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              GitHub Pages uchun production frontend
            </span>
            <h1 className="text-hero mt-6">
              WebDasturlashEdu bilan <span className="gradient-text">web dasturlashni</span> zamonaviy interfeysda o'rganing.
            </h1>
            <p className="text-body-lg mt-6 max-w-2xl">
              Professional landing page, responsive kurs bloklari, animatsiyalangan sectionlar, dark/light mode va premium glassmorphism komponentlari bilan tayyor loyiha.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/courses" className="brand-primary inline-flex items-center gap-2 rounded-2xl px-6 py-4 font-semibold">
                Kurslarni ko‘rish <FiArrowRight />
              </Link>
              <Link to="/contact" className="glass-button rounded-2xl px-6 py-4 font-semibold">
                Loyihani ishga tushirish
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="brand-badge">React</span>
              <span className="brand-badge">Vite</span>
              <span className="brand-badge">TailwindCSS</span>
              <span className="brand-badge">Framer Motion</span>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {heroMetrics.map((item) => (
            <StatsCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="container-shell py-4">
        <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
          <SectionHeading
            eyebrow="Avvalgi modullar"
            title="Localhost uchun barcha asosiy bo‘limlar qayta chiqarildi"
            description="Ma’ruza, amaliy, testlar, kirish va qidiruv sahifalari endi bosh sahifadan ham ochiladi."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleQuickSections.map(({ title, description, to, icon: Icon }) => (
              <Link key={to} to={to} className="soft-card rounded-[1.75rem] p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="icon-chip"><Icon /></div>
                <h3 className="text-card-title mt-5">{title}</h3>
                <p className="text-body mt-3">{description}</p>
                <span className="text-link mt-4 inline-flex items-center gap-2">Ochish <FiArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-4">
        <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
          <SectionHeading
            eyebrow="Afzalliklar"
            title="Nima uchun aynan WebDasturlashEdu frontendi?"
            description="Bu loyiha ta’lim mahsulotlari, kurs landing page va personal education startup saytlar uchun tayyor vizual asosni beradi."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {FEATURE_ITEMS.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="soft-card rounded-[1.75rem] p-6"
              >
                <div className="icon-chip"><FiBookOpen /></div>
                <h3 className="text-card-title mt-5">{item.title}</h3>
                <p className="text-body mt-3">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="brand-dark-panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-eyebrow !text-white/75">Hero + statistics</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] sm:text-4xl">Kurslar, statistika va CTA bitta vizual oqimda birlashtirilgan.</h2>
            <p className="mt-4 text-white/80">Sahifa tarkibi conversion va user trust oshirishga mos ravishda tuzilgan: hero, afzalliklar, kurslar, natijalar, footer.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {STAT_ITEMS.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                  <p className="text-3xl font-black tracking-[-0.03em]">{item.value}</p>
                  <p className="mt-2 text-sm text-white/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <SectionHeading
              eyebrow="Mashhur yo‘nalishlar"
              title="Eng talabgir kurs modullari"
              description="Asosiy kurs yo‘nalishlari qisqa card preview shaklida ko‘rsatiladi. To‘liq ro‘yxat Courses sahifasida mavjud."
            />
            <div className="mt-8 grid gap-4">
              {COURSE_ITEMS.slice(0, 3).map((item) => (
                <div key={item.title} className="soft-card-subtle rounded-[1.5rem] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-card-title">{item.title}</h3>
                    <span className="brand-badge">{item.level}</span>
                  </div>
                  <p className="text-body mt-3">{item.description}</p>
                </div>
              ))}
            </div>
            <Link to="/courses" className="text-link mt-6 inline-flex items-center gap-2">
              Barcha kurslarni ko‘rish <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-shell py-10">
        <div className="brand-dark-panel rounded-[2rem] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-center">
            <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.22)] backdrop-blur-md">
              <img
                src={AUTHOR_IMAGE_URL}
                alt="O‘ngboyeva Muqaddas Yo‘ldoshevna"
                className="h-[260px] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div>
              <p className="text-eyebrow !text-white/75">Muallif haqida</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                O‘ngboyeva Muqaddas Yo‘ldoshevna
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-white/85">
                Axborot texnologiyalari va menejment universiteti magistranti
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <a
                  href="tel:+998935773573"
                  className="rounded-3xl border border-white/10 bg-white/10 p-5 transition hover:bg-white/15"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    <FiPhone /> Telefon
                  </span>
                  <p className="mt-3 text-lg font-bold text-white">+998 93 577 35 73</p>
                </a>

                <a
                  href="https://instagram.com/buronraxmonov"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-3xl border border-white/10 bg-white/10 p-5 transition hover:bg-white/15"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    <FiInstagram /> Instagram
                  </span>
                  <p className="mt-3 text-lg font-bold text-white">@buronraxmonov</p>
                </a>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 transition hover:bg-white/15 sm:col-span-2 xl:col-span-1">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    <FiAward /> Status
                  </span>
                  <p className="mt-3 text-lg font-bold text-white">Magistrant</p>
                </div>
              </div>

              <p className="mt-6 max-w-2xl text-white/75">
                Zamonaviy web-ta’lim, amaliy yondashuv va raqamli o‘quv tajribasini uyg‘unlashtirgan muallif profili.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
