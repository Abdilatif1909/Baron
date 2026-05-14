import { motion } from 'framer-motion';
import { FiBookOpen, FiCode, FiLayout, FiShield, FiTarget, FiTrendingUp } from 'react-icons/fi';

import Seo from '../components/Seo';
import SectionHeading from '../components/shared/SectionHeading';

const values = [
  { icon: FiCode, title: 'Toza arxitektura', description: 'Komponentlarga ajratilgan, kengayuvchan va GitHub Pages uchun yengil frontend tuzilmasi.' },
  { icon: FiLayout, title: 'Premium UI/UX', description: 'Glassmorphism, gradient background, yumshoq soyalar va interaktiv animatsiyalar.' },
  { icon: FiBookOpen, title: 'Ta’limga mos kontent', description: 'Kurslar, mentorlik oqimi va portfolio yo‘nalishi bilan edukatsion mahsulotlar uchun moslashgan dizayn.' },
  { icon: FiShield, title: 'Deploy readiness', description: 'Vite build, CNAME, SEO meta va static hostingga mos SPA fallback bilan tayyorlangan.' },
];

const milestones = [
  { icon: FiTarget, title: 'Maqsad', description: 'WebDasturlashEdu orqali ta’lim mahsulotiga zamonaviy, ishonchli va professional raqamli qiyofa berish.' },
  { icon: FiTrendingUp, title: 'Natija', description: 'User trust va conversionga yo‘naltirilgan hero, kurslar va CTA bloklari bilan kuchli landing page.' },
];

function AboutPage() {
  return (
    <section className="container-shell py-10">
      <Seo
        title="Platforma haqida | WebDasturlashEdu"
        description="WebDasturlashEdu loyihasi haqida: zamonaviy UI, static deploy readiness, ta’limga yo‘naltirilgan arxitektura va professional frontend tajribasi."
      />

      <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
        <SectionHeading
          eyebrow="Platforma haqida"
          title="WebDasturlashEdu — zamonaviy web dasturlash ta’lim brendi uchun tayyor frontend"
          description="Bu loyiha GitHub Pages va custom domain orqali tez deploy qilinadigan, ta’lim mahsulotlariga mos premium landing page sifatida ishlab chiqildi."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {values.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-button rounded-3xl p-6"
            >
              <div className="icon-chip"><Icon /></div>
              <h3 className="text-card-title mt-5">{title}</h3>
              <p className="text-body mt-3">{description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {milestones.map(({ icon: Icon, title, description }) => (
            <div key={title} className="soft-card-subtle rounded-[1.75rem] p-6">
              <div className="icon-chip"><Icon /></div>
              <h3 className="text-card-title mt-5">{title}</h3>
              <p className="text-body mt-3">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
