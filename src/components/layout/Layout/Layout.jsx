import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../../ui/Spinner/Spinner.jsx';
import Footer from '../Footer/Footer.jsx';
import Header from '../Header/Header.jsx';
import ScrollToTop from '../ScrollToTop/ScrollToTop.jsx';
import SkipLink from '../SkipLink/SkipLink.jsx';
import styles from './Layout.module.scss';

// Page shell shared by every route.
export default function Layout() {
  return (
    <>
      <SkipLink targetId="main" />
      <ScrollToTop />
      <Header />
      <main id="main" className={styles.main} tabIndex={-1}>
        <Suspense
          fallback={
            <div className={styles.loading}>
              <Spinner label="Loading page" size={24} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
