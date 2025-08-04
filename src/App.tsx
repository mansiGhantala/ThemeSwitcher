import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';

import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Product from './Pages/Product';
import NotFound from './Pages/NotFound';

import PageTransition from './components/PageTransition';

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/product"
              element={
                <PageTransition>
                  <Product />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </Layout>
      <Footer />
    </>
  );
}
