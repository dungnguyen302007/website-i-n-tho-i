import { motion } from 'motion/react';
import { NEWS } from '@/src/lib/constants';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

export function News() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-white border-b border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 text-xs font-black rounded-full uppercase tracking-widest"
          >
             Tech Highlights
          </motion.div>
          <h1 className="text-4xl sm:text-7xl font-black text-slate-900 tracking-tight leading-tight italic">TIN TỨC & <br/><span className="text-blue-600 not-italic">ĐÁNH GIÁ</span></h1>
          <p className="text-slate-500 max-w-xl mx-auto font-medium text-sm sm:text-base">
            Cập nhật những chuyển động mới nhất của thế giới công nghệ di động toàn cầu.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {NEWS.map((item) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bento-card bg-white group"
              >
                <Link to="/news" className="block aspect-[21/9] overflow-hidden relative group">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <div className="p-8 sm:p-12">
                  <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-6">
                    <span className="flex items-center"><Calendar size={14} className="mr-2 text-blue-600" /> {item.date}</span>
                    <span className="flex items-center"><Clock size={14} className="mr-2 text-blue-600" /> 5 Min Read</span>
                    <span className="flex items-center"><User size={14} className="mr-2 text-blue-600" /> Möbius</span>
                  </div>
                  <Link to="/news">
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-6 hover:text-blue-600 transition-colors leading-tight italic">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-slate-500 leading-relaxed mb-8 font-medium italic underline underline-offset-4 decoration-slate-100">{item.summary}</p>
                  <Link to="/news" className="inline-flex items-center text-xs font-black text-blue-600 uppercase tracking-widest group">
                    Tiếp tục đọc bài <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bento-card p-10 bg-white">
              <h3 className="text-xs font-black text-slate-900 mb-8 uppercase tracking-widest">Danh mục</h3>
              <div className="space-y-2">
                {['Sự kiện', 'Review sản phẩm', 'Mẹo & Thủ thuật', 'Kinh doanh'].map(cat => (
                  <Link key={cat} to="/news" className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-200">
                    <span className="text-sm font-black text-slate-500 group-hover:text-slate-900">{cat}</span>
                    <span className="w-6 h-6 bg-slate-100 text-[10px] font-black rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">12</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bento-card-dark p-10 bg-blue-600 border-none relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-black mb-4 italic uppercase leading-tight">Newsletter</h3>
                 <p className="text-blue-100 text-sm mb-8 font-medium leading-relaxed italic">Nhận tin công nghệ mới nhất từ SHOPMOBILE hàng tuần.</p>
                 <form className="space-y-4">
                   <input 
                     type="email" 
                     placeholder="Email của bạn" 
                     className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-blue-200 font-bold"
                   />
                   <button className="w-full py-4 bg-white text-blue-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                     Đăng ký ngay
                   </button>
                 </form>
               </div>
               <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
