import { useEffect } from 'react';

const DEFAULT_TITLE = 'WebDasturlashEdu | Zamonaviy web dasturlash ta’lim platformasi';
const DEFAULT_DESCRIPTION = 'WebDasturlashEdu — React, Vite, TailwindCSS va Framer Motion asosida qurilgan zamonaviy web dasturlash ta’lim platformasi.';

function Seo({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION }) {
  useEffect(() => {
    document.title = title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }
  }, [description, title]);

  return null;
}

export default Seo;
