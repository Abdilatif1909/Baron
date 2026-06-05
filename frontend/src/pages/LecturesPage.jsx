import { useEffect, useMemo, useState } from 'react';

import PdfCard from '../components/PdfCard';
import PdfViewerModal from '../components/PdfViewerModal';
import SearchBar from '../components/SearchBar';
import SectionHeading from '../components/shared/SectionHeading';
import EmptyState from '../components/shared/EmptyState';
import { contentService } from '../services/contentService';
import { normalizePaginated } from '../utils/format';
import { downloadStorage } from '../utils/storage';

function LecturesPage() {
  const [lectures, setLectures] = useState([]);
  const [query, setQuery] = useState('');
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    contentService.getLectures().then((data) => setLectures(normalizePaginated(data)));
  }, []);

  const filteredLectures = useMemo(
    () => lectures.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
    [lectures, query]
  );

  return (
    <section className="container-shell py-10">
      <div className="brand-dark-panel rounded-[2rem] p-8 sm:p-10">
        <SectionHeading eyebrow="Ma’ruzalar" title="Ma’ruza PDF kutubxonasi" description="Har bir ma’ruza kartasi chiroyli preview, Online ko‘rish va Yuklab olish tugmalari bilan taqdim etiladi." />
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
          <span className="rounded-full bg-white/10 px-4 py-2">{lectures.length} ta ma’ruza</span>
          <span className="rounded-full bg-white/10 px-4 py-2">Premium ko‘rinish</span>
          <span className="rounded-full bg-white/10 px-4 py-2">GitHub raw delivery</span>
        </div>
      </div>
      <div className="mt-8 max-w-xl">
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} onSubmit={(e) => e.preventDefault()} placeholder="Ma’ruza qidirish" />
      </div>
      {filteredLectures.length === 0 ? (
        <div className="mt-8"><EmptyState title="Ma’ruza topilmadi" description="Qidiruvni o‘zgartirib qayta urinib ko‘ring." /></div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredLectures.map((item) => (
            <PdfCard
              key={item.id}
              item={item}
              type="Ma’ruza"
              onPreview={setActiveItem}
              onDownload={(pdf) => downloadStorage.trackDownload({ ...pdf, type: 'lecture' })}
            />
          ))}
        </div>
      )}
      <PdfViewerModal
        item={activeItem}
        open={Boolean(activeItem)}
        onClose={() => setActiveItem(null)}
        onDownload={(pdf) => downloadStorage.trackDownload({ ...pdf, type: 'lecture' })}
      />
    </section>
  );
}

export default LecturesPage;
