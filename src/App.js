import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import CatalogPage from './pages/Catalog';
import CatCatalogPage from './pages/CatCatalogPage';
import ContactPage from './pages/Contact';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/catalogo-gatos" element={<CatCatalogPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
};

export default App;

// DONE