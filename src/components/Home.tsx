import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Smartphone, 
  Tablet, 
  Headphones, 
  Watch, 
  Percent, 
  Box, 
  Truck, 
  CreditCard, 
  RotateCcw, 
  Headset, 
  ShoppingCart,
  Star,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  Newspaper,
  Heart,
  Loader2,
  Mail
} from 'lucide-react';
import { getProducts } from '../services/dbService';
import { Product, NEWS, cn } from '../lib/constants';

const SIDEBAR_CATEGORIES = [
  { name: 'iPhone', icon: <Smartphone size={16} /> },
  { name: 'Samsung', icon: <Smartphone size={16} /> },
  { name: 'Xiaomi', icon: <Smartphone size={16} /> },
  { name: 'OPPO', icon: <Smartphone size={16} /> },
  { name: 'Phụ kiện', icon: <Box size={16} /> },
  { name: 'Tablet', icon: <Tablet size={16} /> },
  { name: 'Tai nghe', icon: <Headphones size={16} /> },
  { name: 'Đồng hồ', icon: <Watch size={16} /> },
  { name: 'Khuyến mãi', icon: <Percent size={16} /> },
];

const SERVICE_BENEFITS = [
  { title: 'MIỄN PHÍ GIAO HÀNG', desc: 'Đơn từ 500k', icon: <Truck size={32} className="text-red-600" /> },
  { title: 'THANH TOÁN DỄ DÀNG', desc: 'Hỗ trợ thẻ/ví', icon: <CreditCard size={32} className="text-red-600" /> },
  { title: 'ĐỔI TRẢ 7 NGÀY', desc: 'Thủ tục nhanh', icon: <RotateCcw size={32} className="text-red-600" /> },
  { title: 'HỖ TRỢ 24/7', desc: 'Tư vấn nhiệt tình', icon: <Headset size={32} className="text-red-600" /> },
];

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const products = await getProducts();
        setFeaturedProducts(products.filter(p => p.featured));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-red-600" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans">
      {/* 1. Hero & Sidebar Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu */}
          <aside className="hidden lg:block w-72 shrink-0 bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-md self-start">
            <div className="bg-white/5 px-8 py-6 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-4 italic border-b border-white/5">
               <TrendingUp size={16} className="text-red-600" /> Danh mục
            </div>
            <div className="p-4 space-y-1">
               {SIDEBAR_CATEGORIES.map((cat, i) => (
                 <Link 
                  key={i} 
                  to={`/products?category=${cat.name}`} 
                  className="flex items-center justify-between px-6 py-3.5 text-slate-400 hover:bg-white/5 hover:text-red-500 rounded-2xl transition-all group"
                 >
                    <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest italic">
                       <span className="text-slate-600 group-hover:text-red-600 transition-colors">{cat.icon}</span>
                       {cat.name}
                    </div>
                    <ChevronRight size={14} className="text-slate-800 group-hover:text-red-600" />
                 </Link>
               ))}
            </div>
          </aside>

          {/* Hero Carousel */}
          <div className="flex-1 space-y-8">
             <div className="relative aspect-[16/8] sm:aspect-[21/9] bg-white rounded-[3rem] overflow-hidden shadow-2xl group border-4 border-white/5">
                <div className="absolute inset-0 flex items-center px-8 sm:px-24 z-10 pointer-events-none">
                   <div className="max-w-lg space-y-4 sm:space-y-8">
                      <div className="inline-flex items-center gap-3 bg-red-600/10 px-4 py-2 rounded-full border border-red-600/20">
                        <Smartphone size={20} className="text-red-600" />
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] italic">New Arrival</span>
                      </div>
                      <h2 className="text-4xl sm:text-7xl font-black text-slate-950 leading-[1.05] tracking-tighter italic uppercase">
                        iPhone 15<br/><span className="text-red-600 not-italic">Titanium</span>
                      </h2>
                      <p className="text-lg sm:text-2xl font-black text-slate-400 italic">Starting from 21.990.000đ</p>
                      <button className="px-12 py-4 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-slate-900 transition-all pointer-events-auto shadow-2xl shadow-red-600/20 active:scale-95 italic text-center">
                        Explore Now
                      </button>
                   </div>
                </div>
                <div className="absolute bottom-0 right-0 w-[70%] h-full overflow-hidden">
                   <img 
                    src="https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1200&auto=format&fit=crop" 
                    className="w-full h-full object-contain object-right transform scale-110 group-hover:scale-115 transition-transform duration-1000" 
                    alt="iPhone 15"
                    referrerPolicy="no-referrer"
                   />
                </div>
                {/* Pagination Dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                   {[1,2].map(dot => <div key={dot} className={cn("w-10 h-1.5 rounded-full transition-all", dot === 1 ? "bg-red-600" : "bg-slate-100")} />)}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Service Icons */}
      <section className="max-w-7xl mx-auto px-4 py-6">
         <div className="bg-white/5 rounded-[2.5rem] border border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5 overflow-hidden backdrop-blur-md">
            {SERVICE_BENEFITS.map((benefit, i) => (
              <div key={i} className="p-10 flex items-center gap-8 hover:bg-white/5 transition-colors group">
                 <div className="shrink-0 group-hover:scale-110 transition-transform bg-white/5 p-4 rounded-2xl border border-white/5">{benefit.icon}</div>
                 <div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-1 italic">{benefit.title}</h4>
                    <p className="text-[11px] text-slate-500 font-bold italic">{benefit.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-24">
         <div className="flex justify-between items-end mb-16 px-4">
            <div className="space-y-4">
               <div className="w-12 h-1.5 bg-red-600 rounded-full" />
               <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">SẢN PHẨM <span className="text-red-500 not-italic">HOT TẠI uMOBI</span></h2>
            </div>
            <Link to="/products" className="text-[10px] font-black text-slate-500 hover:text-red-500 transition-colors uppercase tracking-[0.3em] flex items-center gap-4 italic mb-2">
               View Store <ArrowRight size={16} />
            </Link>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
         </div>
      </section>

      {/* 4. Promotional Banners Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 aspect-[4/4] relative rounded-[3.5rem] overflow-hidden bg-slate-900 group shadow-2xl border-4 border-white/5">
               <img src="https://images.unsplash.com/photo-1707166164295-e23fdfed7a5f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-120 transition-transform duration-1000 grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 p-12 flex flex-col justify-end space-y-6 bg-gradient-to-t from-slate-950 via-transparent">
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] italic">Galaxy S24</span>
                  <h3 className="text-4xl font-black text-white italic tracking-tighter leading-tight uppercase">Intelligence <br/> is here.</h3>
                  <button className="px-10 py-4 bg-white text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-red-600 hover:text-white transition-all w-fit shadow-xl italic">Pre-order now</button>
               </div>
            </div>
            <div className="lg:col-span-7 grid grid-rows-2 gap-8">
               <div className="relative rounded-[2.5rem] overflow-hidden bg-white p-12 flex items-center justify-between group shadow-2xl border-4 border-white/5">
                  <div className="space-y-4 z-10">
                     <div className="flex items-center gap-4 mb-2">
                        <div className="w-1.5 h-8 bg-red-600 rounded-full" />
                        <h4 className="text-2xl font-black text-slate-950 italic leading-tight uppercase">XIAOMI SPECIAL</h4>
                     </div>
                     <p className="text-4xl font-black text-red-600 tracking-tighter uppercase italic leading-none">Up to <br/> 2.000.000đ OFF</p>
                     <button className="px-10 py-4 bg-slate-950 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-red-600 transition-all shadow-md italic">Shop Now</button>
                  </div>
                  <img src="https://images.unsplash.com/photo-1710313885172-e16279f0616b?q=80&w=400&auto=format&fit=crop" className="w-2/5 h-full object-contain group-hover:translate-x-4 group-hover:-rotate-6 transition-transform duration-700" referrerPolicy="no-referrer" />
               </div>
               <div className="relative rounded-[2.5rem] overflow-hidden bg-white p-12 flex items-center justify-between group shadow-2xl border-4 border-white/5">
                  <div className="space-y-4 z-10">
                     <div className="flex items-center gap-4 mb-2">
                        <div className="w-1.5 h-8 bg-red-600 rounded-full" />
                        <h4 className="text-2xl font-black text-slate-950 italic leading-tight uppercase">Accessories</h4>
                     </div>
                     <p className="text-4xl font-black text-red-600 tracking-tighter uppercase italic leading-none">30% OFF <br/> MEGA SALE</p>
                     <button className="px-10 py-4 bg-slate-950 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-red-600 transition-all shadow-md italic">View All</button>
                  </div>
                  <img src="https://images.unsplash.com/photo-1588423770574-f199baae60ec?q=80&w=400&auto=format&fit=crop" className="w-1/2 h-full object-contain group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
               </div>
            </div>
         </div>
      </section>

      {/* 5. Latest News */}
      <section className="max-w-7xl mx-auto px-4 py-32">
         <div className="flex flex-col items-center text-center mb-20 space-y-6">
            <Newspaper size={48} className="text-red-600" />
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic leading-none">TECH <span className="text-red-600 not-italic">JOURNAL</span></h2>
            <p className="text-slate-500 font-bold italic max-w-xl">Cập nhật những xu hướng và tin tức công nghệ mới nhất cùng uMobi</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
            {NEWS.slice(0, 3).map(item => (
              <Link key={item.id} to="/news" className="group bg-white rounded-[3rem] flex flex-col overflow-hidden border-4 border-white/5 shadow-2xl hover:-translate-y-4 transition-all duration-500">
                 <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                 </div>
                 <div className="p-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-red-600 bg-red-600/5 px-3 py-1 rounded-full uppercase tracking-widest">{item.category}</span>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-950 group-hover:text-red-600 transition-colors italic leading-tight uppercase">{item.title}</h3>
                    <div className="w-10 h-1 bg-slate-100 group-hover:w-full group-hover:bg-red-600 transition-all duration-700" />
                 </div>
              </Link>
            ))}
         </div>
      </section>

      {/* 6. Newsletter Registration */}
      <section className="bg-red-600 py-16 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black rounded-full blur-[100px]" />
         </div>
         <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8 text-white">
               <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center border-2 border-white/30 backdrop-blur-xl animate-bounce">
                  <Mail size={40} />
               </div>
               <div className="space-y-2">
                  <h3 className="text-4xl font-black italic uppercase tracking-widest leading-none">STAY TUNED</h3>
                  <p className="text-red-100 text-sm font-bold italic opacity-80 uppercase tracking-widest">Nhận thông báo ưu đãi độc quyền từ uMobi</p>
               </div>
            </div>
            <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-3xl shadow-2xl border-4 border-red-500/20">
               <input 
                 type="email" 
                 placeholder="Nhập email của bạn..." 
                 className="flex-1 px-8 py-5 bg-transparent text-slate-900 outline-none placeholder:text-slate-400 font-black uppercase text-xs italic tracking-widest" 
               />
               <button className="px-12 py-5 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-red-600 transition-all shadow-xl active:scale-95 italic">Đăng ký ngay</button>
            </div>
         </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-[2.5rem] flex flex-col relative overflow-hidden border-4 border-white/5 shadow-2xl hover:shadow-red-600/10 transition-all duration-500">
      {/* Badge */}
      <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black italic rounded-full shadow-lg shadow-red-600/40 uppercase tracking-widest">
        HOT
      </div>
      
      {/* Wishlist Icon */}
      <button className="absolute top-6 right-6 z-10 p-3 bg-slate-50 text-slate-300 hover:text-red-600 hover:bg-red-600/5 rounded-2xl transition-all border border-slate-100">
         <Heart size={18} />
      </button>

      {/* Top Image */}
      <Link to={`/product/${product.id}`} className="aspect-square p-10 flex flex-col items-center justify-center bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain group-hover:scale-115 transition-transform duration-700 relative z-10" 
          referrerPolicy="no-referrer"
        />
      </Link>

      {/* Info */}
      <div className="p-8 flex flex-col flex-1 space-y-4">
         <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-black text-slate-900 line-clamp-2 group-hover:text-red-500 transition-colors italic uppercase tracking-tight leading-snug">{product.name}</h3>
         </Link>
         
         <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} size={10} className={cn(s <= 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200")} />)}
            </div>
            <span className="text-[10px] font-black text-slate-300 ml-1 italic lowercase tracking-widest">/ 128 Reviews</span>
         </div>

         <div className="mt-auto pt-4 flex items-end justify-between">
            <div>
               <div className="text-2xl font-black text-red-600 italic tracking-tighter leading-none">
                  {new Intl.NumberFormat('vi-VN').format(product.price)}đ
               </div>
               {product.oldPrice && (
                 <div className="text-[11px] text-slate-300 line-through font-black mt-2 tracking-widest opacity-50">
                    {new Intl.NumberFormat('vi-VN').format(product.oldPrice)}đ
                 </div>
               )}
            </div>
            
            <button className="w-14 h-14 bg-slate-950 text-white rounded-[1.2rem] flex items-center justify-center shadow-2xl hover:bg-red-600 transition-all active:scale-90 group-hover:rotate-6 duration-300">
               <ShoppingCart size={22} />
            </button>
         </div>
      </div>
    </div>
  );
}
