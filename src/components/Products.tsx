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
        <Loader2 className="animate-spin text-red-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 italic">
            <Link to="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
            <ChevronRight size={12} className="mx-2 text-slate-300" />
            <span className="text-slate-900">Sản phẩm</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-red-600 text-white px-6 py-4 font-black text-xs uppercase tracking-widest flex items-center gap-3 italic">
                 <Filter size={16} /> Danh mục
              </div>
              <div className="divide-y divide-slate-100">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSearchParams({ category: cat })}
                    className={cn(
                      "w-full text-left px-6 py-3.5 text-sm font-bold transition-all italic",
                      currentCategory === cat 
                        ? "bg-slate-900 text-white" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-red-600"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <h4 className="font-black text-xl italic text-white leading-tight">ƯU ĐÃI<br/><span className="text-red-600">HÔM NAY</span></h4>
                <p className="text-[11px] text-white/60 font-bold leading-relaxed italic">Giảm thêm 5% khi quét mã QR thanh toán qua VNPay tại hệ thống.</p>
                <button className="w-full py-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-red-600/20 active:scale-95">Xem ngay</button>
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-red-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                {currentCategory} 
                <span className="text-sm font-black text-slate-300 ml-4 tracking-widest">({filteredProducts.length})</span>
              </h1>
              <div className="relative group w-full sm:w-auto">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm điện thoại..." 
                  className="pl-12 pr-6 py-3 bg-white rounded-2xl text-xs font-bold w-full sm:w-72 outline-none border border-slate-200 focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all shadow-sm italic"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                   <Search size={32} />
                </div>
                <p className="text-lg font-black text-slate-400 uppercase italic tracking-widest">Không tìm thấy sản phẩm nào</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSearchParams({ category: 'Tất cả' })}}
                  className="mt-8 px-10 py-3.5 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all shadow-xl shadow-red-100"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 group relative overflow-hidden flex flex-col shadow-none hover:shadow-2xl transition-all duration-300">
      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-red-600 text-white text-[10px] font-black italic rounded-lg">
        -10%
      </div>
      <Link to={`/product/${product.id}`} className="aspect-square p-8 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform duration-500">
        <img src={product.image} className="w-full h-full object-contain" alt={product.name} />
      </Link>
      <div className="p-6 flex flex-col flex-1 space-y-3">
        <Link to={`/product/${product.id}`} className="block">
           <h3 className="text-sm font-black text-slate-800 line-clamp-1 group-hover:text-red-600 transition-colors italic uppercase">{product.name}</h3>
        </Link>
        <div className="mt-auto">
           <div className="text-lg font-black text-red-600 italic leading-none mb-1">
              {new Intl.NumberFormat('vi-VN').format(product.price)}đ
           </div>
           {product.oldPrice && (
              <div className="text-[11px] text-slate-300 line-through font-bold">
                 {new Intl.NumberFormat('vi-VN').format(product.oldPrice)}đ
              </div>
           )}
        </div>
        <button className="w-full py-3 bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95">
           Mua ngay
        </button>
      </div>
    </div>
  );
}
