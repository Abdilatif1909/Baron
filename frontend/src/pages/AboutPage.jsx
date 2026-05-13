import { FiBookOpen, FiCode, FiLayout, FiShield } from 'react-icons/fi';

import SectionHeading from '../components/shared/SectionHeading';

const values = [
  { icon: FiCode, title: 'Toza arxitektura', description: 'Servis qatlami, kontekstlar, hooklar va qayta ishlatiladigan komponentlar bilan kengayuvchan frontend.' },
  { icon: FiLayout, title: 'Zamonaviy UI/UX', description: 'Glassmorphism, gradient, qorong‘i/yorug‘ rejim va silliq animatsiyalar.' },
  { icon: FiBookOpen, title: 'Ta’limga yo‘naltirilgan dizayn', description: 'O‘quv oqimi ma’ruza, amaliyot, testlar va boshqaruv paneli atrofida qurilgan.' },
  { icon: FiShield, title: 'Xavfsiz kirish', description: 'JWT autentifikatsiyasi, himoyalangan yo‘nalishlar va rollarga asoslangan oqimlar bilan himoyalangan.' },
];

function AboutPage() {
  return (
    <section className="container-shell py-10">
      <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
        <SectionHeading
          eyebrow="Platforma haqida"
          title="WebDasturlashEdu — zamonaviy web dasturlash ta’lim platformasi"
          description="Nazariya, amaliyot va tahlilni yagona mahsulot tajribasiga aylantiruvchi ta’lim platformasi."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <article key={title} className="glass-button rounded-3xl p-6">
              <div className="icon-chip"><Icon /></div>
              <h3 className="text-card-title mt-5">{title}</h3>
              <p className="text-body mt-3">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
