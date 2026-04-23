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
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!product) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-400">Không tìm thấy sản phẩm</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <ChevronRight size={12} className="mx-2 text-slate-300" />
            <Link to="/products" className="hover:text-blue-600 transition-colors">Sản phẩm</Link>
            <ChevronRight size={12} className="mx-2 text-slate-300" />
            <span className="text-slate-900 truncate font-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 p-10 flex items-center justify-center shadow-inner"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(idx => (
                 <div key={idx} className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 p-2 cursor-pointer hover:border-blue-600 transition-colors">
                    <img src={product.image} className="w-full h-full object-contain opacity-40 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                 </div>
               ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-black rounded-lg mb-4 uppercase tracking-widest">
                {product.category}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-slate-300 font-black">/</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">128 đánh giá thực tế</span>
              </div>
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-black text-slate-900">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-slate-300 line-through font-bold">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-slate-500 leading-relaxed font-medium">
                {product.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bento-card bg-slate-50 border-none flex items-center space-x-4 shadow-none">
                  <div className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm"><Truck size={20} /></div>
                  <div className="text-xs font-black text-slate-700 uppercase tracking-tight">Giao hàng hỏa tốc 2h</div>
                </div>
                <div className="p-5 bento-card bg-slate-50 border-none flex items-center space-x-4 shadow-none">
                  <div className="p-3 bg-white rounded-2xl text-green-600 shadow-sm"><ShieldCheck size={20} /></div>
                  <div className="text-xs font-black text-slate-700 uppercase tracking-tight">Bảo hành 12 tháng</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="flex-1 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center shadow-xl shadow-blue-200">
                <ShoppingBag className="mr-2" size={18} />
                Thêm giỏ hàng
              </button>
              <button className="flex-1 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-800 transition-all text-center shadow-xl shadow-slate-200">
                Mua ngay
              </button>
            </div>

            {/* Specifications */}
            <div className="pt-12 border-t border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center">
                <ThumbsUp size={22} className="mr-3 text-blue-600" />
                Thông số kỹ thuật
              </h3>
              <div className="bento-card border-none bg-slate-50 overflow-hidden divide-y divide-slate-200 shadow-none">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex px-8 py-5 text-sm">
                    <span className="w-1/3 font-black text-slate-400 uppercase text-[10px] tracking-widest">{key}</span>
                    <span className="w-2/3 text-slate-900 font-bold">{value}</span>
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
