import { FiArrowRight, FiExternalLink, FiPlayCircle, FiVideo } from 'react-icons/fi';

import SectionHeading from '../components/shared/SectionHeading';

const PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLFRnhpV9odGBFQyKMFu-YhwO6qzzmGZUX';
const PLAYLIST_EMBED_URL = 'https://www.youtube-nocookie.com/embed/videoseries?list=PLFRnhpV9odGBFQyKMFu-YhwO6qzzmGZUX';

const videoHighlights = [
  {
    title: 'Web dasturlash asoslari',
    description: 'Fan bo‘yicha boshlang‘ich tushunchalar, umumiy yo‘nalish va o‘quv trayektoriyasi.',
  },
  {
    title: 'Frontend amaliy mavzulari',
    description: 'HTML, CSS, JavaScript va interfeys qurilishi bo‘yicha amaliy video darslar.',
  },
  {
    title: 'Mustaqil takrorlash uchun playlist',
    description: 'Talabalar istalgan payt qayta ko‘rib chiqishi mumkin bo‘lgan yagona video kutubxona.',
  },
];

function VideosPage() {
  return (
    <section className="container-shell py-10">
      <div className="space-y-8">
        <div className="brand-dark-panel rounded-[2rem] p-8 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-eyebrow !text-white/75">Video kutubxona</p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
                Fan bo‘yicha YouTube video darslari zamonaviy ko‘rinishda jamlandi.
              </h1>
              <p className="mt-4 text-base leading-8 text-white/80 sm:text-lg">
                Bir tugma bilan playlistni shu sahifaning o‘zida ko‘ring yoki to‘g‘ridan-to‘g‘ri YouTube ga o‘ting.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#playlist-viewer"
                className="rounded-2xl bg-white px-6 py-4 font-semibold text-[#0f172a] shadow-lg"
              >
                Ko‘rish <FiPlayCircle className="ml-2 inline-flex" />
              </a>
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noreferrer"
                className="glass-button inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white"
              >
                YouTube ga o‘tish <FiExternalLink />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div id="playlist-viewer" className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Inline player"
              title="Playlistni shu yerning o‘zida tomosha qiling"
              description="YouTube playlist iframe orqali ochiladi. Kerak bo‘lsa yangi oynada ham davom ettirish mumkin."
            />

            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-[rgba(219,228,240,0.8)] bg-black shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
              <div className="aspect-video w-full">
                <iframe
                  src={PLAYLIST_EMBED_URL}
                  title="Web dasturlash video playlist"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noreferrer"
                className="brand-primary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold"
              >
                To‘liq playlist <FiArrowRight />
              </a>
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noreferrer"
                className="glass-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold"
              >
                YouTube da ochish <FiExternalLink />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <SectionHeading
                eyebrow="Nima bor?"
                title="Playlist ichidagi yo‘nalishlar"
                description="Fan mavzulariga mos video darslar bir joyga jamlangan."
              />

              <div className="mt-6 space-y-4">
                {videoHighlights.map((item) => (
                  <article key={item.title} className="soft-card rounded-[1.5rem] p-5">
                    <div className="icon-chip"><FiVideo /></div>
                    <h3 className="text-card-title mt-4">{item.title}</h3>
                    <p className="text-body mt-3">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a href="#playlist-viewer" className="glass-button rounded-2xl px-4 py-3 text-sm font-semibold">
                        Ko‘rish
                      </a>
                      <a
                        href={PLAYLIST_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="brand-primary rounded-2xl px-4 py-3 text-sm font-semibold"
                      >
                        YouTube ga o‘tish
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <p className="text-eyebrow">Tezkor tavsiya</p>
              <h2 className="text-h3 mt-2">Ma’ruza va amaliy bilan parallel foydalaning</h2>
              <p className="text-body mt-3">
                Videoni ko‘rib, keyin [ma’ruzalar] va [amaliylar] bo‘limidagi materiallar bilan mustahkamlash tavsiya etiladi.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a href="/lectures" className="soft-card-subtle rounded-2xl px-4 py-4 text-sm font-semibold text-[var(--color-heading-2)]">
                  Ma’ruzalarni ochish
                </a>
                <a href="/practicals" className="soft-card-subtle rounded-2xl px-4 py-4 text-sm font-semibold text-[var(--color-heading-2)]">
                  Amaliylarni ochish
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideosPage;