import { useTheme } from '../Context/ThemeContext';

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isColorful = theme === 'colorful';
  const isLight = theme === 'light' || (!isDark && !isColorful);

  // Derived classes
  const outerBg = isLight
    ? 'bg-gray-50'
    : isDark
    ? 'bg-black'
    : 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600';
  const cardBg = isLight
    ? 'bg-white'
    : isDark
    ? 'bg-[#1e1f36]'
    : 'bg-white/10 backdrop-blur-md';
  const textPrimary = isLight ? 'text-gray-900' : 'text-white';
  const subtleText = isLight ? 'text-gray-600' : isColorful ? 'text-gray-200' : 'text-gray-300';

  return (
    <div className={`${outerBg} w-full overflow-hidden m-0 p-0 transition-colors duration-300`}>
      {/* Hero */}
      <section className="relative w-full h-[45vh] md:h-[55vh] xl:h-[55vh] min-h-[250px] overflow-hidden mb-12 flex items-center justify-center">
        <img
          src="./theme.png"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          <h1
            className={`font-extrabold text-4xl sm:text-5xl drop-shadow-2xl ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}
          >
            About Us
          </h1>
          <p className="mt-2 text-sm md:text-base max-w-2xl mx-auto text-gray-200">
            Adaptive, theme-aware, and built for developers who care about both form and function.
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row gap-12">
        {/* Sidebar (only for dark) */}
        {isDark && (
          <aside
            className={`w-full lg:w-1/3 rounded-xl p-6 shadow-lg flex flex-col gap-6 ${cardBg} text-gray-200`}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">About Menu</h2>
              <p className="text-sm mb-2">Navigate key sections of our platform quickly.</p>
            </div>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="#" className="block hover:underline">
                Team
              </a>
              <a href="#" className="block hover:underline">
                Mission
              </a>
              <a href="#" className="block hover:underline">
                Contact
              </a>
            </nav>
          </aside>
        )}

        <main className={`flex-1 ${isDark ? '' : 'max-w-4xl mx-auto'}`}>
          <section
            className={`mb-12 rounded-xl shadow-lg p-8 transition-all duration-300 ${
              cardBg
            } ${isColorful ? 'border-2 border-pink-500' : ''}`}
            style={isColorful ? { fontFamily: "'Pacifico', cursive" } : undefined}
          >
            <h2
              className={`text-4xl font-bold mb-4 ${
                isColorful ? 'text-pink-600' : 'text-primary'
              }`}
            >
              About Our App
            </h2>
            <p className={`text-base leading-relaxed mb-6 ${subtleText}`}>
              This app is a modern React + Tailwind CSS project featuring multi-theme support:
              minimalist light, focused dark, and playful colorful. Fonts, layouts, and UI elements
              adjust dynamically for a truly adaptive experience.
            </p>
            <p className={`text-base leading-relaxed ${subtleText}`}>
              Built with TypeScript and responsive design in mind, it’s ideal for developers who value
              flexibility, speed, and stunning aesthetics.
            </p>
          </section>

          <section>
            <h3 className={`text-2xl font-semibold mb-3 ${textPrimary}`}>Our Vision</h3>
            <p className={`leading-relaxed ${subtleText}`}>
              We believe apps should adapt to people — not the other way around. Whether you're working
              late (dark theme), enjoying clarity (light theme), or embracing creativity (colorful theme),
              we’ve designed a layout to match.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
