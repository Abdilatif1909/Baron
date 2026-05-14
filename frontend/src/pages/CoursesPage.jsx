import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiLayers, FiTarget } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Seo from '../components/Seo';
import SectionHeading from '../components/shared/SectionHeading';
import { COURSE_ITEMS } from '../utils/constants';

function CoursesPage() {
  return (
    <section className="container-shell py-10">
      <Seo
        title="Kurslar | WebDasturlashEdu"
        description="WebDasturlashEdu kurslari: frontend, JavaScript, React, backend va deployment bo‘yicha zamonaviy o‘quv yo‘nalishlari."
      />

      <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
        <SectionHeading
          eyebrow="Kurslar"
          title="Bozor talabiga mos web dasturlash kurslari"
          description="Har bir yo‘nalish bosqichma-bosqich o‘quv rejasi, amaliy topshiriqlar va yakuniy portfolio natijasi bilan qurilgan."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {COURSE_ITEMS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="soft-card rounded-[1.75rem] p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="icon-chip"><FiLayers /></div>
                <span className="brand-badge">{item.level}</span>
              </div>
              <h3 className="text-card-title mt-6 text-xl">{item.title}</h3>
              <p className="text-body mt-3">{item.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="soft-card-subtle rounded-2xl p-4">
                  <p className="text-muted inline-flex items-center gap-2"><FiClock /> Davomiyligi</p>
                  <p className="mt-2 font-semibold text-[var(--color-heading-3)]">{item.duration}</p>
                </div>
                <div className="soft-card-subtle rounded-2xl p-4">
                  <p className="text-muted inline-flex items-center gap-2"><FiTarget /> Natija</p>
                  <p className="mt-2 font-semibold text-[var(--color-heading-3)]">Portfolio tayyor</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-8 brand-dark-panel rounded-[2rem] p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-eyebrow !text-white/75">Kursga yozilish</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] sm:text-4xl">O‘zingizga mos yo‘nalishni tanlang va o‘qishni bugundan boshlang.</h2>
            <p className="mt-4 max-w-2xl text-white/80">Frontenddan full-stackgacha bo‘lgan barcha yo‘nalishlar yagona professional dizayn va qulay o‘quv oqimida jamlangan.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-[#0f172a]">
            Bog‘lanish <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CoursesPage;
