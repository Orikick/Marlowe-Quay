import { useState } from 'react';
import { cx } from '../../../utils/cx.js';
import Icon from '../../ui/Icon/Icon.jsx';
import ResponsiveImage from '../../ui/ResponsiveImage/ResponsiveImage.jsx';
import styles from './PhotoGallery.module.scss';

// Large photo with previous/next buttons and a row of thumbnails.
// Left and right arrow keys move between photos while focus is inside the gallery.
export default function PhotoGallery({ photos, title }) {
  const [index, setIndex] = useState(0);
  const count = photos.length;

  if (count === 0) {
    return (
      <ResponsiveImage src={null} alt={`No photos yet of ${title}`} className={styles.stageImage} ratio={null} />
    );
  }

  const current = photos[index];
  const show = (next) => setIndex((next + count) % count);

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + 1);
    }
  }

  return (
    <section className={styles.gallery} aria-label={`Photos of ${title}`} onKeyDown={handleKeyDown}>
      <div className={styles.stage}>
        <ResponsiveImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          widths={[640, 960, 1280, 1600]}
          sizes="(min-width: 1280px) 1176px, 100vw"
          ratio={null}
          className={styles.stageImage}
          priority={index === 0}
        />

        {count > 1 && (
          <>
            <button
              type="button"
              className={cx(styles.arrow, styles.prev)}
              onClick={() => show(index - 1)}
              aria-label="Previous photo"
            >
              <Icon name="chevronLeft" size={24} />
            </button>
            <button
              type="button"
              className={cx(styles.arrow, styles.next)}
              onClick={() => show(index + 1)}
              aria-label="Next photo"
            >
              <Icon name="chevronRight" size={24} />
            </button>
          </>
        )}

        <p className={styles.counter} aria-live="polite">
          Photo {index + 1} of {count}
          <span className="visually-hidden">: {current.alt}</span>
        </p>
      </div>

      {count > 1 && (
        <ul className={styles.thumbs}>
          {photos.map((photo, photoIndex) => (
            <li key={photo.src}>
              <button
                type="button"
                className={cx(styles.thumb, photoIndex === index && styles.current)}
                onClick={() => setIndex(photoIndex)}
                aria-label={`Show photo ${photoIndex + 1}: ${photo.alt}`}
                aria-current={photoIndex === index ? 'true' : undefined}
              >
                <ResponsiveImage src={photo.src} alt="" widths={[160, 240]} sizes="120px" ratio="4 / 3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
