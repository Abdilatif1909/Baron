import { useEffect, useMemo, useState } from 'react';

import PdfCard from '../components/PdfCard';
import PdfViewerModal from '../components/PdfViewerModal';
import SearchBar from '../components/SearchBar';
import SectionHeading from '../components/shared/SectionHeading';
import EmptyState from '../components/shared/EmptyState';
import { contentService } from '../services/contentService';
import { normalizePaginated } from '../utils/format';
import { downloadStorage } from '../utils/storage';

const getNaturalOrder = (title = '') => {
  const match = title.match(/^(\d+)/);
  if (match) {
    return Number(match[1]);
  }

  return Number.MAX_SAFE_INTEGER;
};

function PracticalsPage() {
  const [practicals, setPracticals] = useState([]);
  const [query, setQuery] = useState('');
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    contentService.getPracticals().then((data) => setPracticals(normalizePaginated(data)));
  }, []);

  const filtered = useMemo(() => {
    return practicals
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const orderDifference = getNaturalOrder(a.title) - getNaturalOrder(b.title);
        if (orderDifference !== 0) {
          return orderDifference;
        }

        return a.title.localeCompare(b.title, 'uz');
      });
  }, [practicals, query]);

  return (
    <section className="container-shell py-10">
      <div className="brand-dark-panel rounded-[2rem] p-8 sm:p-10">
        <SectionHeading eyebrow="Amaliylar" title="Amaliy mashg‘ulotlar PDF bo‘limi" description="Oldingidek chiroyli ko‘rinish, Online ko‘rish oynasi va Yuklab olish tugmasi bilan." />
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
          <span className="rounded-full bg-white/10 px-4 py-2">{practicals.length} ta amaliy material</span>
          <span className="rounded-full bg-white/10 px-4 py-2">Modal preview</span>
          <span className="rounded-full bg-white/10 px-4 py-2">Tartibli kutubxona</span>
        </div>
      </div>
      <div className="mt-8 max-w-xl">
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} onSubmit={(e) => e.preventDefault()} placeholder="Amaliy mashg‘ulot qidirish" />
      </div>
      {filtered.length === 0 ? (
        <div className="mt-8"><EmptyState title="Amaliy material topilmadi" description="Qidiruv yoki import qilingan fayllarni tekshiring." /></div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <PdfCard
              key={item.id}
              item={item}
              type="Practical"
              onPreview={setActiveItem}
              onDownload={(pdf) => downloadStorage.trackDownload({ ...pdf, type: 'practical' })}
            />
          ))}
        </div>
      )}
      <PdfViewerModal
        item={activeItem}
        open={Boolean(activeItem)}
        onClose={() => setActiveItem(null)}
        onDownload={(pdf) => downloadStorage.trackDownload({ ...pdf, type: 'practical' })}
      />
    </section>
  );
}

export default PracticalsPage;
