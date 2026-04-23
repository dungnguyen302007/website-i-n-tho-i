import { motion } from 'motion/react';
import { NEWS } from '@/src/lib/constants';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

export function News() {
  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      <header className="bg-slate-900/50 border-b border-white/5 py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-block px-5 py-2 bg-red-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em] italic"
          >
             Tech Highlights
          </motion.div>
          <h1 className="text-6xl sm:text-9xl font-black text-white tracking-tighter leading-none italic uppercase">TIN TỨC <br/><span className="text-red-600 not-italic">& REVIEW</span></h1>
          <p className="text-slate-500 max-w-xl mx-auto font-black text-lg italic leading-relaxed pt-2 uppercase tracking-widest">
             Khám phá thế giới công nghệ cùng uMobi.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px]"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            {NEWS.map((item) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[4rem] overflow-hidden group shadow-2xl border-4 border-white/5 relative"
              >
                <Link to="/news" className="block aspect-[21/9] overflow-hidden relative group">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <div className="p-12 sm:p-20 italic">
                  <div className="flex flex-wrap items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-12">
                    <span className="flex items-center gap-3"><Calendar size={18} className="text-red-600" /> {item.date}</span>
                    <span className="flex items-center gap-3"><Clock size={18} className="text-red-600" /> 5 MIN READ</span>
                    <span className="flex items-center gap-3"><User size={18} className="text-red-600" /> ADMIN</span>
                  </div>
                  <Link to="/news">
                    <h2 className="text-4xl sm:text-6xl font-black text-slate-950 mb-10 hover:text-red-600 transition-all leading-[1.1] italic uppercase tracking-tighter">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-slate-500 leading-relaxed mb-16 font-bold text-xl opacity-80">{item.summary}</p>
                  <Link to="/news" className="inline-flex items-center text-[10px] font-black text-red-600 uppercase tracking-[0.3em] group border-b-4 border-red-50 hover:border-red-600 pb-3 transition-all">
                    XEM CHI TIẾT <ArrowRight size={20} className="ml-6 group-hover:translate-x-4 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-white rounded-[3.5rem] p-12 border-4 border-white/5 shadow-2xl italic">
              <h3 className="text-[10px] font-black text-slate-400 mb-12 uppercase tracking-[0.3em] leading-none border-l-4 border-red-600 pl-6">Chuyên mục</h3>
              <div className="space-y-4">
                {['Sự kiện', 'Review products', 'Mẹo & Trick', 'Kinh doanh'].map(cat => (
                  <Link key={cat} to="/news" className="flex items-center justify-between p-6 rounded-[2.5rem] hover:bg-red-50 transition-all group border border-transparent hover:border-red-100">
                    <span className="text-[11px] font-black text-slate-950 group-hover:text-red-600 uppercase tracking-widest">{cat}</span>
                    <span className="w-10 h-10 bg-slate-50 text-[10px] font-black rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">12</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-[3.5rem] p-12 relative overflow-hidden group italic border-4 border-white/5">
               <div className="relative z-10">
                 <h3 className="text-4xl font-black mb-8 italic uppercase leading-none text-white tracking-tighter underline decoration-red-600 decoration-8 underline-offset-[-4px]">Bản tin</h3>
                 <p className="text-slate-400 text-sm mb-12 font-bold leading-relaxed italic opacity-80 uppercase tracking-widest">Gia nhập uMobi Tech Journal ngay hôm nay.</p>
                 <form className="space-y-6">
                   <input 
                     type="email" 
                     placeholder="Email của bạn..." 
                     className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-[2rem] text-sm focus:outline-none focus:border-red-600 placeholder:text-white/20 font-black text-white italic transition-all"
                   />
                   <button className="w-full py-6 bg-red-600 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-[2rem] hover:bg-white hover:text-slate-950 transition-all shadow-2xl shadow-red-600/20 active:scale-95 duration-500">
                     SUBSCRIBE NOW
                   </button>
                 </form>
               </div>
               <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
