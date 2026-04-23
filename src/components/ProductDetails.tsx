import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ChevronRight, Truck, ShieldCheck, ThumbsUp, ShoppingBag, Loader2 } from 'lucide-react';
import { PRODUCTS, cn, type Product } from '@/src/lib/constants';
import { getProductById } from '@/src/services/dbService';

export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-red-600" size={48} />
      </div>
    );
  }

  if (!product) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-400">Không tìm thấy sản phẩm</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumbs */}
      <div className="bg-[#f4f4f4] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
            <Link to="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
            <ChevronRight size={12} className="mx-2 text-slate-300" />
            <Link to="/products" className="hover:text-red-600 transition-colors">Sản phẩm</Link>
            <ChevronRight size={12} className="mx-2 text-slate-300" />
            <span className="text-slate-900 truncate font-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Gallery */}
          <div className="space-y-6 sticky top-28">
            <div className="aspect-square bg-white rounded-[2rem] overflow-hidden border border-slate-100 p-8 flex items-center justify-center shadow-lg shadow-slate-100/50">
              <motion.img 
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(idx => (
                 <div key={idx} className={cn(
                   "aspect-square bg-white rounded-xl border-2 p-2 cursor-pointer transition-all",
                   idx === 1 ? "border-red-600" : "border-slate-100 opacity-40 hover:opacity-100 hover:border-red-200"
                 )}>
                    <img src={product.image} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                 </div>
               ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div>
              <div className="inline-block px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-lg mb-6 uppercase tracking-widest italic">
                {product.category}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight uppercase italic">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-10">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} />)}
                </div>
                <span className="text-[10px] text-slate-300 font-black tracking-widest uppercase italic">| 128 đánh giá thực tế</span>
              </div>
              <div className="flex items-baseline space-x-6">
                <span className="text-4xl sm:text-5xl font-black text-red-600 italic">
                  {new Intl.NumberFormat('vi-VN').format(product.price)}đ
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-slate-300 line-through font-bold">
                    {new Intl.NumberFormat('vi-VN').format(product.oldPrice)}đ
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-slate-500 leading-relaxed font-medium italic text-lg">
                {product.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-[#f4f4f4] rounded-2xl flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white rounded-xl text-red-600 shadow-sm flex items-center justify-center shrink-0"><Truck size={24} /></div>
                  <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic leading-tight">Giao hàng hỏa tốc 2h</div>
                </div>
                <div className="p-6 bg-[#f4f4f4] rounded-2xl flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white rounded-xl text-green-600 shadow-sm flex items-center justify-center shrink-0"><ShieldCheck size={24} /></div>
                  <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic leading-tight">Bảo hành 12 tháng</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="flex-1 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-red-100 active:scale-95">
                <ShoppingBag size={20} /> Thêm vào giỏ hàng
              </button>
              <button className="flex-1 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-black transition-all text-center shadow-xl active:scale-95">
                Mua ngay
              </button>
            </div>

            {/* Specifications */}
            <div className="pt-12 border-t border-slate-100">
               <div className="flex items-center gap-4 mb-8">
                  <TrendingUp size={24} className="text-red-600" />
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic leading-none">Thông số <span className="text-red-600">kỹ thuật</span></h3>
               </div>
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-100 shadow-sm">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex px-10 py-5 text-sm group hover:bg-slate-50 transition-colors">
                    <span className="w-1/3 font-black text-slate-400 uppercase text-[10px] tracking-widest italic group-hover:text-red-600 transition-colors">{key}</span>
                    <span className="w-2/3 text-slate-900 font-bold italic">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
