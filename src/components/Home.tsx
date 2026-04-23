import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Star, TrendingUp, ShieldCheck, Truck, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, NEWS, CATEGORIES, cn, type Product } from '@/src/lib/constants';
import { getProducts } from '@/src/services/dbService';

function ProductCard({ product }: { product: any; key?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bento-card group flex flex-col h-full bg-white"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {product.oldPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </div>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] uppercase font-bold text-blue-600 tracking-widest mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-lg font-black text-slate-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
          {product.oldPrice && (
            <span className="text-slate-400 line-through text-xs">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.oldPrice)}</span>
          )}
        </div>
        <button className="w-full py-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-xl text-sm font-bold text-slate-700">
          Mua ngay
        </button>
      </div>
    </motion.div>
  );
}

export function Home() {
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

  const featured = products.filter(p => p.featured).slice(0, 4);
  const mainProduct = products.length > 0 ? products[0] : null;

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      {/* Hero Bento Section */}
      {mainProduct && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Large Feature Card */}
          <div className="md:col-span-8 bento-card relative min-h-[400px] sm:min-h-[500px] flex items-center">
            <div className="p-8 sm:p-12 md:p-16 space-y-6 z-10 w-full sm:w-2/3">
               <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Sản phẩm mới</div>
               <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight text-slate-900">
                 {mainProduct.name.split(' ').slice(0, 2).join(' ')}<br/>
                 <span className="text-blue-600 font-medium text-2xl sm:text-4xl">{mainProduct.name.split(' ').slice(2).join(' ')}</span>
               </h1>
               <p className="text-slate-500 text-sm max-w-sm line-clamp-2 sm:line-clamp-none">
                 {mainProduct.description}
               </p>
               <div className="flex items-end gap-3">
                 <span className="text-3xl font-black text-slate-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(mainProduct.price)}</span>
                 {mainProduct.oldPrice && (
                   <span className="text-slate-400 line-through text-sm mb-1">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(mainProduct.oldPrice)}</span>
                 )}
               </div>
               <div className="flex gap-4">
                 <Link to={`/product/${mainProduct.id}`} className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-colors">
                   Mua ngay
                 </Link>
                 <Link to={`/product/${mainProduct.id}`} className="bg-slate-100 text-slate-700 px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors">
                   Chi tiết
                 </Link>
               </div>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-full sm:w-1/2 bg-gradient-to-l from-slate-50 to-transparent flex items-center justify-center opacity-40 sm:opacity-100 pointer-events-none">
               <img 
                 src={mainProduct.image} 
                 className="w-full h-full object-contain p-10 transform scale-110 sm:scale-125" 
                 alt="Hero Product"
                 referrerPolicy="no-referrer"
               />
            </div>
          </div>

          {/* Small Navigation Bento Card */}
          <div className="md:col-span-4 bento-card-dark p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <TrendingUp size={24} className="text-blue-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Danh mục hot</span>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6">Dòng máy phổ biến</h3>
              <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                {CATEGORIES.filter(c => c !== 'Tất cả').slice(0, 4).map(cat => (
                   <Link key={cat} to={`/products?category=${cat}`} className="bg-white/10 p-4 rounded-2xl hover:bg-blue-600 transition-all cursor-pointer">
                      {cat}
                   </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        {/* Support Bento */}
        <div className="md:col-span-3 bento-card-accent p-8 flex flex-col justify-between">
           <div className="opacity-80 text-xs font-bold uppercase tracking-widest">Tin cậy 10 năm</div>
           <div className="mt-10">
              <h2 className="text-3xl font-black mb-3 italic leading-tight">TUYỆT ĐỐI AN TÂM</h2>
              <p className="text-sm opacity-90 leading-relaxed font-medium">Giáo pháp công nghệ chính hãng, bảo hành vàng 1 đổi 1 trong 30 ngày đầu.</p>
           </div>
        </div>

        {/* Special Offers Bento */}
        <div className="md:col-span-6 bento-card p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-slate-900">Ưu Đãi Đặc Biệt</h3>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
            </div>
          </div>
          <div className="flex gap-6 sm:gap-10 items-center">
            <div className="w-24 h-24 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center p-2 shrink-0">
               <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Giảm tới</span>
               <span className="text-3xl font-black text-red-500">45%</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-base font-bold text-slate-900">Chương trình đổi cũ lấy mới (Trade-in)</p>
              <p className="text-sm text-slate-500 leading-snug font-medium">Trợ giá lên tới 2.000.000đ khi nâng cấp các dòng Flagship tại hệ thống MobiStore.</p>
            </div>
          </div>
        </div>

        {/* Info Bento */}
        <div className="md:col-span-3 bento-card p-8 flex flex-col justify-between relative bg-slate-100 border-none">
           <div className="z-10 space-y-1">
             <h3 className="text-lg font-bold text-slate-900 mb-1">Dịch vụ</h3>
             <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Giao nhanh 2H</p>
           </div>
           <div className="space-y-4 z-10 pt-6">
             <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                <Truck size={18} className="text-blue-600" />
                <span>Giao hàng miễn phí</span>
             </div>
             <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                <ShieldCheck size={18} className="text-green-600" />
                <span>Bảo hành chính hãng</span>
             </div>
           </div>
           <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-200 rounded-full opacity-20 pointer-events-none"></div>
        </div>
      </div>

      {/* Featured Products List */}
      <section className="pt-10">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-slate-900 flex items-center">
              <div className="w-2 h-6 bg-blue-600 rounded-full mr-3"></div>
              Sản phẩm nổi bật
           </h2>
           <Link to="/products" className="text-blue-600 font-bold text-sm tracking-widest uppercase hover:underline flex items-center gap-1">
              Tất cả <ChevronRight size={16} />
           </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* News & Updates Bento */}
      <section className="pt-10">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-slate-900">Tin Công Nghệ</h2>
           <Link to="/news" className="text-sm font-bold text-blue-600 tracking-widest uppercase">Xem blog</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
           {NEWS.slice(0, 3).map((item) => (
             <Link to="/news" key={item.id} className="bento-card group p-6 flex flex-col gap-4 bg-white">
                <div className="aspect-[2/1] bg-slate-100 rounded-2xl overflow-hidden">
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-3">
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</div>
                   <h3 className="font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 italic underline underline-offset-4 decoration-blue-100 group-hover:decoration-blue-400">
                     {item.title}
                   </h3>
                   <button className="text-xs font-black text-blue-600 group-hover:translate-x-2 transition-transform inline-flex items-center gap-1 uppercase tracking-widest mt-2">
                     Đọc ngay <ArrowRight size={14} />
                   </button>
                </div>
             </Link>
           ))}
        </div>
      </section>
    </div>
  );
}
