import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'colorful';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  return ['light', 'dark', 'colorful'].includes(stored || '') ? (stored as Theme) : 'light';
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'colorful');
    root.classList.add(theme);

    if (theme === 'colorful') {
      root.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
      root.style.color = '#1a1a1a';
    } else {
      root.style.background = '';
      root.style.color = '';
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
