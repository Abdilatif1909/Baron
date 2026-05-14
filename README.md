# WebDasturlashEdu

WebDasturlashEdu — `cloude.uz` domeniga deploy qilish uchun tayyorlangan zamonaviy **React + Vite** frontend loyihasi. Interfeys TailwindCSS va Framer Motion asosida qurilgan bo‘lib, professional landing page, kurslar sahifasi, glassmorphism bloklar, dark/light mode va GitHub Pages deploy tayyorgarligini o‘z ichiga oladi.

## Asosiy imkoniyatlar

- Zamonaviy professional UI
- To‘liq responsive layout
- TailwindCSS asosidagi dizayn tizimi
- Dark / Light mode
- Sticky navbar
- Hero section
- Features section
- Courses section
- Statistics cards
- CTA bloklar
- Footer
- Framer Motion animatsiyalari
- Glassmorphism elementlar
- Gradient background
- SEO title va meta description
- GitHub Pages + custom domain (`cloude.uz`) uchun tayyor sozlama

## Texnologiyalar

- React
- Vite
- TailwindCSS
- Framer Motion
- React Router
- React Icons

## Sahifalar

- `/` — Bosh sahifa
- `/courses` — Kurslar
- `/about` — Platforma haqida
- `/contact` — Bog‘lanish

## Deploy uchun tayyorlangan fayllar

- [frontend/vite.config.js](frontend/vite.config.js) — `base: '/'` bilan sozlangan
- [frontend/public/CNAME](frontend/public/CNAME) — custom domain: `cloude.uz`
- [frontend/public/404.html](frontend/public/404.html) — GitHub Pages uchun SPA redirect fallback
- [frontend/index.html](frontend/index.html) — SEO title va meta description

## Lokal ishga tushirish

### 1. Frontend papkaga o‘ting

- `cd frontend`

### 2. Paketlarni o‘rnating

- `npm install`

### 3. Development serverni ishga tushiring

- `npm run dev`

### 4. Production build yarating

- `npm run build`

Build muvaffaqiyatli yakunlangach [frontend/dist](frontend/dist) papkasi hosil bo‘ladi.

## GitHub Pages deploy

### Variant 1: GitHub Pages settings orqali

1. Repository ichida frontend build natijasini tayyorlang:
   - `cd frontend`
   - `npm install`
   - `npm run build`
2. `dist` papka tarkibini GitHub Pages publish source sifatida ishlating.
3. Repository settings ichida **Pages** bo‘limidan publish source tanlang.
4. Custom domain sifatida `cloude.uz` ni ulang.

### Variant 2: GitHub Actions orqali

Repository uchun GitHub Actions workflow qo‘shib, `frontend/dist` ni Pages ga publish qilish mumkin.

## Dizayn ranglari

- Primary: `#2563eb`
- Secondary: `#0f172a`

## Loyiha tuzilmasi

```text
frontend/
  public/
    CNAME
    404.html
  src/
    components/
    layouts/
    pages/
    utils/
    App.jsx
    main.jsx
  index.html
  vite.config.js
```

## Eslatma

Repository ichida backend bilan bog‘liq eski modullar mavjud bo‘lishi mumkin, ammo GitHub Pages deploy uchun asosiy qism **frontend** hisoblanadi.

## Muallif

- GitHub: [Abdilatif1909](https://github.com/Abdilatif1909)
- Repository: [cloude.uz](https://github.com/Abdilatif1909/cloude.uz)
