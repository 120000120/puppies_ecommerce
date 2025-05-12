import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import CatalogPage from './pages/Catalog';
import CatCatalogPage from './pages/CatCatalogPage';
import ContactPage from './pages/Contact';
import AdminPage from './pages/AdminPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';

const App = () => {
  return (
    <CurrencyProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/catalogo-gatos" element={<CatCatalogPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
          </Routes>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </Router>
    </CurrencyProvider>
  );
};

export default App;

// DONE