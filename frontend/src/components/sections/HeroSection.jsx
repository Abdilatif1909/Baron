import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen, FiLayers, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="glass inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-500">
            React + Django ta’lim platformasi
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Web dasturlashni <span className="gradient-text">zamonaviy</span> platformada o‘rganing.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Ma’ruzalar, amaliy mashg‘ulotlar, testlar, kitoblar va rollarga asoslangan boshqaruv paneli bilan to‘liq ta’lim ekotizimi.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-4 font-semibold text-white">
              Boshlash <FiArrowRight />
            </Link>
            <Link to="/lectures" className="glass rounded-2xl px-6 py-4 font-semibold">
              PDF kutubxonasini ko‘rish
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { icon: FiBookOpen, title: 'PDF materiallar', desc: 'Backend avtomatik skan qiladi' },
          { icon: FiLayers, title: 'Onlayn testlar', desc: 'Ko‘p variantli savollar va natijalar saqlanadi' },
          { icon: FiUsers, title: 'Rollarga asoslangan', desc: 'Talaba, o‘qituvchi, administrator panellari' },
          { icon: FiArrowRight, title: 'Moslashuvchan UI', desc: 'Glassmorphism va qorong‘i/yorug‘ rejim' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-6"
            >
              <div className="inline-flex rounded-2xl bg-gradient-to-r from-violet-600/20 to-cyan-500/20 p-3 text-xl text-violet-500">
                <Icon />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default HeroSection;
