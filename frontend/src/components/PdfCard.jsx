import { motion } from 'framer-motion';
import { FiDownload, FiEye, FiFileText } from 'react-icons/fi';

function PdfCard({ item, type, onPreview, onDownload }) {
  const pdfUrl = item.pdf_url || item.file_url || item.download_url;
  const downloadUrl = item.download_url || pdfUrl;
  const fileName = item.file_name || item.source_path?.split(/[\\/]/).pop() || pdfUrl?.split('/').pop() || 'PDF file';

  return (
    <motion.article whileHover={{ y: -8 }} className="glass-panel overflow-hidden rounded-[2rem] border border-white/50 p-0 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="bg-gradient-to-br from-[#eff6ff] via-white to-[#f8fafc] px-5 pb-4 pt-5">
      <div className="flex items-start justify-between gap-4">
        <div className="icon-chip text-xl shadow-[0_10px_30px_rgba(37,99,235,0.14)]">
          <FiFileText />
        </div>
        <span className="brand-badge shadow-sm">
          {type}
        </span>
      </div>
        <h3 className="mt-5 line-clamp-2 text-xl font-bold leading-8 tracking-[-0.02em] text-[#0f172a]">{item.title}</h3>
        <p className="mt-2 line-clamp-1 text-sm text-[#64748b]">{fileName}</p>
      </div>

      <div className="border-t border-slate-200/70 bg-white/80 px-5 py-4 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-[#f8fbff] px-4 py-3 text-sm">
          <span className="font-medium text-[#0f172a]">Tayyor holat</span>
          <span className="rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-semibold text-[#1d4ed8]">PDF material</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => onPreview(item)} disabled={!pdfUrl} className="glass-button rounded-2xl px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50">
          <span className="inline-flex items-center gap-2"><FiEye /> Online ko‘rish</span>
        </button>
        {downloadUrl ? (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => onDownload?.(item)}
            className="brand-primary rounded-2xl px-4 py-3 text-center text-sm font-semibold"
          >
            <span className="inline-flex items-center gap-2"><FiDownload /> Yuklab olish</span>
          </a>
        ) : (
          <button type="button" disabled className="brand-primary rounded-2xl px-4 py-3 text-center text-sm font-semibold opacity-50">
            <span className="inline-flex items-center gap-2"><FiDownload /> Yuklab olish</span>
          </button>
        )}
        </div>
      </div>
    </motion.article>
  );
}

export default PdfCard;
