import { useTheme } from '../Context/ThemeContext';
import { useFetchProducts, type Product as ProductType } from '../hooks/useFetchProducts';
import { useState, useMemo } from 'react';

export default function Product() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isColorful = theme === 'colorful';
  const isLight = theme === 'light' || (!isDark && !isColorful);

  const { data: products, loading, error } = useFetchProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(
    () =>
      products?.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const outerBg = isLight
    ? 'bg-gray-50'
    : isDark
    ? 'bg-black'
    : 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600';
  const cardBg = isLight
    ? 'bg-white'
    : isDark
    ? 'bg-[#1f2430]'
    : 'bg-white/10 backdrop-blur-md';
  const textBase = isLight ? 'text-gray-900' : 'text-white';
  const subtleText = isLight ? 'text-gray-600' : 'text-gray-300';

  return (
    <div className={`${outerBg} min-h-screen transition-colors duration-300 py-12 px-4`}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${textBase}`}>Our Products</h1>
        <p className={`text-base mb-6 ${subtleText}`}>
          Explore a curated list of items fetched live from a sample API. Search, browse, and pick
          what fits your needs. Designed to adapt across themes and devices.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className={`
            w-full px-4 py-2 rounded-lg shadow-sm outline-none transition
            ${isDark ? 'bg-[#1e1f36] border border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border border-gray-300 text-gray-800 placeholder:text-gray-500'}
            focus:ring-2 focus:ring-primary
          `}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p className={`text-center mb-4 ${subtleText}`}>Loading products...</p>}
      {error && (
        <p className="text-center mb-4 text-red-500">
          Error: {error}
        </p>
      )}
      {filteredProducts?.length === 0 && !loading && (
        <p className={`text-center italic mb-4 ${subtleText}`}>No matching products found.</p>
      )}

      <div
        className={`
          w-full
          ${isColorful ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : isDark ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 sm:grid-cols-3 gap-5'}
          px-2
        `}
      >
        {filteredProducts?.map((p: ProductType) => (
          <div
            key={p.id}
            className={`
              rounded-xl overflow-hidden shadow-lg flex flex-col justify-between
              p-5
              transition
              ${isColorful ? 'font-[Pacifico] border-2 border-pink-400' : ''}
              ${isDark ? 'text-white' : ''}
              ${cardBg}
            `}
            style={
              isColorful
                ? { background: 'linear-gradient(135deg, #fce4f0 0%, #ffe4e1 60%)', color: '#1f2937' as any }
                : {}
            }
          >
            <div className="flex items-start gap-4 mb-3">
              <div className="w-16 h-16 flex-shrink-0">
                <img src={p.image} alt={p.title} className="w-full h-full object-contain rounded" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-base line-clamp-1 mb-1"
                  title={p.title}
                >
                  {p.title}
                </h3>
                <div className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                  Category: {p.category}
                </div>
              </div>
            </div>

            <p className="text-sm mb-4 line-clamp-3 opacity-90">{p.description}</p>

            <div className="flex justify-between items-center mt-auto">
              <div className="flex flex-col">
                <span className="font-bold text-lg">
                  ₹{(p.price * 83).toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition
${isDark 
      ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
      : 'bg-black text-white hover:bg-gray-900'
    }                  `}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
