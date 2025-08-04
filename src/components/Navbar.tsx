import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import type { Theme } from '../Context/ThemeContext';
import { FiSun, FiMoon, FiGrid, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* Helper hook to detect clicks outside of a ref */
function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

const themeButtons = [
  { value: 'light' as Theme, label: 'Theme 1', icon: <FiSun size={20} /> },
  { value: 'dark' as Theme, label: 'Theme 2', icon: <FiMoon size={20} /> },
  { value: 'colorful' as Theme, label: 'Theme 3', icon: <FiGrid size={20} /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const isActive = (t: Theme) => theme === t;
  const isCurrentPage = (path: string) => location.pathname === path;

  const getButtonStyle = (btn: { value: Theme }) => {
    const base: React.CSSProperties = {
      borderRadius: '999px',
      width: 42,
      height: 42,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      transition: 'all 0.2s ease',
      border: '2px solid transparent',
      background: 'var(--card-bg)',
      color: 'var(--text)',
      cursor: 'pointer',
    };

    if (isActive(btn.value)) {
      base.background = 'var(--primary)';
      base.color = '#fff';
    }

    return base;
  };

  const navLinkStyle = (path: string) => {
    const active = isCurrentPage(path);
    let hoverBg = '';
    let hoverText = '';

    if (theme === 'light') {
      hoverBg = 'hover:bg-gray-200';
      hoverText = 'hover:text-black';
    } else if (theme === 'dark') {
      hoverBg = 'hover:bg-gray-700';
      hoverText = 'hover:text-white';
    } else {
      hoverBg = 'hover:bg-pink-400';
      hoverText = 'hover:text-white';
    }

    return [
      'px-3 py-1 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)]',
      active
        ? 'text-white bg-[var(--primary)]'
        : `text-[var(--text)] ${hoverBg} ${hoverText}`,
    ].join(' ');
  };

  // close mobile menu when clicking outside
  useClickOutside(mobileMenuRef, () => {
    if (open) setOpen(false);
  });

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: 'var(--card-bg)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 w-full">
        <Link to="/" className="flex items-center gap-2">
          <img src="/theme.png" alt="logo" className="w-9 h-9 rounded-full" />
          <span className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
            Multi-Theme App
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <Link to="/about" className={navLinkStyle('/about')}>
            About
          </Link>
          <Link to="/product" className={navLinkStyle('/product')}>
            Product
          </Link>
          <Link to="/contact" className={navLinkStyle('/contact')}>
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {themeButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setTheme(btn.value)}
              style={getButtonStyle(btn)}
              aria-label={btn.label}
              className={`transition ${
                isActive(btn.value) ? 'scale-105 shadow-md' : 'hover:scale-100'
              }`}
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle Menu"
            aria-expanded={open}
className="
  p-2 rounded-xl
  text-neutral-800 dark:text-white colorful:text-indigo-900

  hover:bg-neutral-100 dark:hover:bg-white/10 colorful:hover:bg-gradient-to-r colorful:hover:from-pink-200 colorful:hover:to-yellow-200
  hover:text-amber-600 dark:hover:text-amber-100 colorful:hover:text-pink-700

  transition duration-200 ease-in-out
"
          >
            {open ? (
              <FiX size={24} style={{ color: 'var(--text)' }} />
            ) : (
              <FiMenu size={24} style={{ color: 'var(--text)' }} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden w-full px-4 pb-4"
            ref={mobileMenuRef}
          >
            <nav className="flex flex-col items-center gap-2 mb-3">
              <Link to="/about" className={navLinkStyle('/about')}>
                About
              </Link>
              <Link to="/product" className={navLinkStyle('/product')}>
                Product
              </Link>
              <Link to="/contact" className={navLinkStyle('/contact')}>
                Contact
              </Link>
            </nav>

            <div className="flex justify-center gap-3">
              {themeButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setTheme(btn.value)}
                  style={getButtonStyle(btn)}
                  className={`transition ${
                    isActive(btn.value) ? 'scale-105 shadow-md' : 'hover:scale-100'
                  }`}
                  aria-label={btn.label}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
