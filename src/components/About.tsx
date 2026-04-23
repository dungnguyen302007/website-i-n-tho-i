import { motion } from 'motion/react';
import { ShieldCheck, Users, Globe, Award, TrendingUp, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1556740734-793562f97c62?q=80&w=2000&auto=format&fit=crop" 
            alt="About Backdrop" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-8">
           <div className="inline-block px-4 py-1.5 bg-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] italic animate-pulse">
              Câu chuyện uMobi
           </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-8xl font-black italic tracking-tighter mb-8 leading-none uppercase"
          >
            SỨ MỆNH <br/><span className="text-red-600 not-italic">KẾT NỐI</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed italic">
            uMobi ra đời with khát vọng mang công nghệ đỉnh cao đến gần hơn with mọi người Việt qua trải nghiệm mua sắm đẳng cấp nhất.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-slate-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
            <Link to="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
            <ChevronRight size={12} className="mx-2 text-slate-800" />
            <span className="text-white truncate font-black">Giới thiệu về uMobi</span>
          </nav>
        </div>
      </div>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 order-2 lg:order-1 italic">
              <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-tight italic">
                CHẤT LƯỢNG LÀ <br/><span className="text-red-600">DANH DỰ</span> CỦA uMOBI
              </h2>
              <div className="space-y-8">
                 <p className="text-slate-500 text-xl leading-relaxed font-bold">
                    Được thành lập từ năm 2015, uMobi đã trải qua hành trình gần một thập kỷ khẳng định vị thế. Chúng tôi không chỉ bán điện thoại, chúng tôi bán sự an tâm và phong cách sống hiện đại.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/20">
                         <CheckCircle size={20} className="text-red-600" />
                       </div>
                       <span className="text-white font-black uppercase text-[10px] tracking-widest leading-normal pt-2">100% Hàng chính hãng</span>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/20">
                         <CheckCircle size={20} className="text-red-600" />
                       </div>
                       <span className="text-white font-black uppercase text-[10px] tracking-widest leading-normal pt-2">Bảo hành VIP trọn đời</span>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/20">
                         <CheckCircle size={20} className="text-red-600" />
                       </div>
                       <span className="text-white font-black uppercase text-[10px] tracking-widest leading-normal pt-2">Giá luôn top thị trường</span>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/20">
                         <CheckCircle size={20} className="text-red-600" />
                       </div>
                       <span className="text-white font-black uppercase text-[10px] tracking-widest leading-normal pt-2">Hỗ trợ kỹ thuật 24/7</span>
                    </div>
                 </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2000&auto=format&fit=crop" 
                alt="uMobi Experience" 
                className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl skew-y-2 group hover:skew-y-0 transition-all duration-700" 
              />
              <div className="absolute -bottom-10 -left-10 bg-red-600 p-10 rounded-[2.5rem] shadow-2xl shadow-red-200">
                 <span className="text-5xl font-black text-white italic">09+</span>
                 <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mt-2 italic">Năm kinh nghiệm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-white/5 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col items-center text-center mb-24 space-y-6">
              <TrendingUp size={64} className="text-red-600" />
              <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Giá trị <span className="text-red-600 not-italic">cốt lõi</span></h2>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 italic">
            <ValueCard 
              icon={<ShieldCheck size={32} />} 
              title="MINH BẠCH" 
              desc="Mọi quy trình từ nhập hàng đến bảo hành đều được công khai và minh bạch with khách hàng."
            />
            <ValueCard 
              icon={<Users size={32} />} 
              title="TẬN TÂM" 
              desc="Khách hàng là trung tâm của mọi hoạt động. Sự hài lòng của bạn là thước đo của chúng tôi."
            />
            <ValueCard 
              icon={<Globe size={32} />} 
              title="TIÊN PHONG" 
              desc="Luôn dẫn đầu trong việc mang những công nghệ mới nhất, siêu phẩm đỉnh nhất về Việt Nam."
            />
            <ValueCard 
              icon={<Award size={32} />} 
              title="TÍN NGHĨA" 
              desc="Giữ vững lời hứa và cam kết về chất lượng sản phẩm cũng như dịch vụ hậu mãi số 1."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full text-center items-center">
      <div className="w-20 h-20 bg-[#f4f4f4] text-red-600 rounded-[1.5rem] mb-8 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">{title}</h3>
      <p className="text-slate-400 font-bold leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}
