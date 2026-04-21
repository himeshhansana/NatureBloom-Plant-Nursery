import React, { useEffect, Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation } from
'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
// Contexts
import { CartProvider } from './contexts/CartContext';
// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { PlantCare } from './pages/PlantCare';
import { Blog } from './pages/Blog';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
// Layout wrapper to conditionally show Nav/Footer
function Layout({ children }: {children: React.ReactNode;}) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin) {
    return <>{children}</>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </main>
      <Footer />
      <CartDrawer />
    </div>);

}
export function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <Toaster position="top-right" richColors />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/plant-care" element={<PlantCare />} />
            <Route path="/blog/*" element={<Blog />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>);

}