// Inline SVG icons on a 24 x 24 grid. Decorative by default (hidden from screen readers);
// the surrounding text or an aria-label carries the meaning.

const ICONS = {
  heart: (
    <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
  ),
  rooms: <path d="M4 4h16v16H4zM4 12h7M11 4v5M11 15v5" />,
  area: <path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6" />,
  bath: (
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM6 12V6.5A2.5 2.5 0 0 1 8.5 4 2.5 2.5 0 0 1 11 6.5" />
  ),
  bed: <path d="M3 19v-8h18v8M3 15h18M5 11V7h14v4" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  map: <path d="M9 4 3 6.5V20l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4zM9 4v13.5M15 6.5V20" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  filter: (
    <>
      <path d="M4 7h9M19 7h1M4 17h1M11 17h9" />
      <circle cx="16" cy="7" r="2.5" />
      <circle cx="8" cy="17" r="2.5" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  alert: <path d="M12 4 2.5 20h19L12 4zM12 10v4.5M12 17.5h.01" />,
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
  ),
  mail: <path d="M3.5 6h17v12h-17zM3.5 7l8.5 6.5L20.5 7" />,
  home: <path d="M4 11.5 12 4l8 7.5M6 10v10h12V10M10 20v-6h4v6" />,
};

export default function Icon({ name, size = 20, filled = false, className }) {
  const shape = ICONS[name];
  if (!shape) return null;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  );
}
