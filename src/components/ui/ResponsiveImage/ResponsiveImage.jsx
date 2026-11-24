import { useState } from 'react';
import { cx } from '../../../utils/cx.js';
import Icon from '../Icon/Icon.jsx';
import styles from './ResponsiveImage.module.scss';

const isUnsplash = (src) => src.startsWith('https://images.unsplash.com/');

// Unsplash serves any width on request, so each image gets a srcset sized for its slot.
const unsplashUrl = (src, width) => `${src}?auto=format&fit=crop&w=${width}&q=70`;

// An image in a fixed-ratio frame, so the layout never jumps while it loads.
// If the file fails to load, a neutral placeholder takes its place.
//   widths: candidate widths in px     sizes: the <img sizes> attribute
//   ratio:  CSS aspect-ratio value, or null to set it from `className` instead
//   priority: load eagerly (use for the first visible image)
export default function ResponsiveImage({
  src,
  alt,
  widths = [400, 640, 960],
  sizes = '100vw',
  ratio = '4 / 3',
  priority = false,
  className,
}) {
  const [failed, setFailed] = useState(false);
  const frameStyle = ratio ? { aspectRatio: ratio } : undefined;

  if (!src || failed) {
    return (
      <div
        className={cx(styles.frame, styles.fallback, className)}
        style={frameStyle}
        role={alt ? 'img' : undefined}
        aria-label={alt ? `${alt} (photo unavailable)` : undefined}
      >
        <Icon name="home" size={28} />
        <span aria-hidden="true">Photo unavailable</span>
      </div>
    );
  }

  const responsive = isUnsplash(src);
  const fallbackWidth = widths[Math.min(1, widths.length - 1)];

  return (
    <div className={cx(styles.frame, className)} style={frameStyle}>
      <img
        className={styles.image}
        src={responsive ? unsplashUrl(src, fallbackWidth) : src}
        srcSet={
          responsive
            ? widths.map((width) => `${unsplashUrl(src, width)} ${width}w`).join(', ')
            : undefined
        }
        sizes={responsive ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
