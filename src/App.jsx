import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout.jsx';
import Listings from './pages/Listings/Listings.jsx';

// The listings page is the landing page, so it ships in the main bundle.
// The other pages download when first visited.
const PropertyDetails = lazy(() => import('./pages/PropertyDetails/PropertyDetails.jsx'));
const Favorites = lazy(() => import('./pages/Favorites/Favorites.jsx'));
const AgentProfile = lazy(() => import('./pages/AgentProfile/AgentProfile.jsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Listings />} />
        <Route path="property/:id" element={<PropertyDetails />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="agents/:id" element={<AgentProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
