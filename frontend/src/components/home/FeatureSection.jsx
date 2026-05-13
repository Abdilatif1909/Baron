import { motion } from 'framer-motion';
import { FiActivity, FiGlobe, FiLayers, FiZap } from 'react-icons/fi';

import SectionHeading from '../shared/SectionHeading';

const features = [
  {
    icon: FiLayers,
    title: 'Tartibli o‘quv oqimi',
    description: 'Ma’ruza, amaliyot, test va kitoblar yagona integratsiyalashgan o‘quv jarayonida jamlangan.',
  },
  {
    icon: FiZap,
    title: 'Tezkor zamonaviy interfeys',
    description: 'Glassmorphism, gradient, moslashuvchan tartib va Framer Motion animatsiyalari bilan premium interfeys.',
  },
  {
    icon: FiActivity,
    title: 'O‘qituvchi tahlili',
    description: 'O‘qituvchi o‘z testlari bo‘yicha talaba natijalari va umumiy tahlilni kuzatadi.',
  },
  {
    icon: FiGlobe,
    title: 'Hammasi bo‘yicha qidiruv',
    description: 'Ma’ruza, amaliyot va kitoblar bo‘yicha real vaqt qidiruv imkoniyati.',
  },
];

function FeatureSection() {
  return (
    <section className="container-shell py-20">
      <SectionHeading
        eyebrow="Imkoniyatlar"
        title="Zamonaviy ta’lim platformasi uchun barcha kerakli modullar"
        description="Frontend arxitekturasi qayta ishlatiladigan komponentlar va kengayuvchan servis qatlami asosida qurilgan."
        align="center"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ icon: Icon, title, description }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="icon-chip text-xl"><Icon /></div>
            <h3 className="mt-5 text-lg font-semibold text-[#0f172a]">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#334155]">{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
