import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Filter, Search, ChevronRight, Loader2 } from 'lucide-react';
import { CATEGORIES, PRODUCTS, cn, type Product } from '@/src/lib/constants';
import { getProducts } from '@/src/services/dbService';

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'Tất cả';
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = currentCategory === 'Tất cả' || p.category === currentCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <ChevronRight size={12} className="mx-2 text-slate-300" />
            <span className="text-slate-900">Sản phẩm</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bento-card p-6 bg-white shrink-0">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center">
                <Filter size={14} className="mr-2 text-blue-600" />
                Danh mục
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSearchParams({ category: cat })}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
                      currentCategory === cat 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bento-card-dark p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Ưu đãi hôm nay</h4>
                <p className="text-xs text-white/60 mb-4 font-medium leading-relaxed">Giảm thêm 5% khi quét mã QR thanh toán qua VNPay tại hệ thống.</p>
                <button className="w-full py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-colors">Xem ngay</button>
              </div>
              <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-blue-600/20 rounded-full blur-xl"></div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {currentCategory} 
                <span className="text-sm font-bold text-slate-300 ml-3 uppercase tracking-widest">({filteredProducts.length})</span>
              </h1>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm điện thoại..." 
                  className="pl-10 pr-4 py-2.5 bg-white bento-card-border rounded-2xl text-xs font-bold w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <motion.div 
                    layout
                    key={product.id}
                    className="bento-card flex flex-col group h-full bg-white"
                  >
                    <Link to={`/product/${product.id}`} className="block h-64 p-8 bg-slate-50/50 relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {product.oldPrice && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
                          Giảm giá
                        </div>
                      )}
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{product.category}</div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2 text-lg">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-3 mb-6 mt-auto">
                        <span className="text-xl font-black text-slate-900">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-slate-400 line-through font-medium">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.oldPrice)}
                          </span>
                        )}
                      </div>
                      <button className="w-full py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95 shadow-slate-200">
                        Thêm giỏ hàng
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bento-card p-20 text-center bg-white border-dashed border-2">
                <Search size={48} className="mx-auto text-slate-200 mb-6" />
                <p className="text-slate-500 font-bold uppercase tracking-widest">Không tìm thấy sản phẩm nào phù hợp.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSearchParams({ category: 'Tất cả' })}}
                  className="mt-6 px-8 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
