import { useTheme } from '../Context/ThemeContext';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { Link } from 'react-router-dom';

export default function Home() {
  const { theme } = useTheme();
  const { data: products, loading, error } = useFetchProducts();

  const isDarkLayout = theme === 'dark';
  const isColorfulLayout = theme === 'colorful';

  const featuredProducts = products?.slice(-5) || [];

  return (
    <div className={`${isDarkLayout ? 'bg-gray-900 min-h-screen' : ''} flex flex-col md:flex-row`}>
      {/* Sidebar for dark layout: stacked on small, side on md+ */}
      {isDarkLayout && (
        <aside className="w-full md:w-1/4 lg:w-1/5 px-4 py-6 bg-gray-800 flex-shrink-0">
          <h2 className="text-xl font-bold mb-4 text-white">Navigation</h2>
          <nav className="space-y-2 text-sm">
            <a href="#" className="block text-gray-300 hover:underline">Dashboard</a>
            <a href="#" className="block text-gray-300 hover:underline">Orders</a>
            <a href="#" className="block text-gray-300 hover:underline">Profile</a>
          </nav>
        </aside>
      )}

      <main
        className={`
          flex-1
          ${isDarkLayout ? 'px-4 py-6' : 'max-w-6xl mx-auto mt-20 px-4'}
        `}
      >
        <section className="mb-10 animate-fade-in">
          <h1
            className={`text-4xl font-bold mb-4 ${
              isColorfulLayout ? 'font-pacifico text-pink-600' : ''
            } ${isDarkLayout ? 'text-white' : ''}`}
          >
            Welcome to Multi-Theme Store
          </h1>
          <p
            className={`max-w-prose mb-4 text-base ${
              isDarkLayout ? 'text-gray-300' : 'text-muted'
            }`}
          >
            Experience a modern interface with theme switching. Choose between minimal, 
            sidebar-based dark, or playful colorful layouts. Below are our featured items.
          </p>
          <Link to="/product">
            <button className="primary">Explore Products</button>
          </Link>
        </section>

        <section className="mb-8 animate-fade-in">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isColorfulLayout ? 'text-rose-600 font-pacifico' : ''
            } ${isDarkLayout ? 'text-white' : ''}`}
          >
            Featured Products
          </h2>

          {loading && (
            <p className="text-sm italic" style={{ color: isDarkLayout ? '#ccc' : undefined }}>
              Loading products...
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm">
              Error: {error}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className={`
                  p-4 rounded-lg transition-transform transform hover:scale-[1.02]
                  ${
                    isColorfulLayout
                      ? 'bg-gradient-to-br from-pink-100 via-rose-200 to-yellow-100 text-gray-900 border border-rose-300 shadow-lg font-comic'
                      : isDarkLayout
                      ? 'bg-gray-800 text-white border border-gray-700 shadow-md'
                      : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-sm" style={{ opacity: 0.8 }}>
                      ₹{(p.price * 83).toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-3 line-clamp-3 opacity-90">
                  {p.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base">
                    ₹{(p.price * 83).toFixed(2)}
                  </span>
                  <button className="primary text-sm">Buy</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
