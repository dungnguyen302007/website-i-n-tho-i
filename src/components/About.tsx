import { motion } from 'motion/react';
import { Star, ShieldCheck, Heart, Award, Users, MapPin } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 text-xs font-black rounded-full uppercase tracking-widest mb-10">
               Thương hiệu uy tín
            </div>
            <h1 className="text-4xl sm:text-8xl font-black text-slate-900 mb-10 tracking-tighter italic leading-none">VỀ <span className="text-blue-600 not-italic">SHOPMOBILE</span></h1>
            <p className="text-lg sm:text-2xl text-slate-500 leading-relaxed italic max-w-2xl mx-auto">
              "Mang công nghệ đỉnh cao đến gần hơn với người Việt bằng sự tin cậy và chất lượng vượt thời gian."
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 transform translate-x-1/2 opacity-50"></div>
      </section>

      {/* Values Bento Grid */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bento-card p-10 bg-white space-y-6 text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm"><ShieldCheck size={32} /></div>
              <h3 className="text-xl font-black text-slate-900 uppercase italic">Uy tín 10 năm</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Khẳng định vị thế qua hơn một thập kỷ tận tâm phục vụ thị trường công nghệ di động.</p>
            </div>
            <div className="bento-card p-10 bg-slate-900 text-white space-y-6 text-center">
              <div className="w-16 h-16 bg-white/10 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm"><Heart size={32} /></div>
              <h3 className="text-xl font-black uppercase italic">Tận tâm phục vụ</h3>
              <p className="text-white/60 text-sm font-medium leading-relaxed">Đội ngũ kỹ thuật viên am hiểu sâu sắc, luôn đặt sự hài lòng của khách hàng lên hàng đầu.</p>
            </div>
            <div className="bento-card p-10 bg-white space-y-6 text-center border-blue-100 shadow-xl shadow-blue-50">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-lg shadow-blue-200"><Award size={32} /></div>
              <h3 className="text-xl font-black text-blue-600 uppercase italic">Chất lượng vàng</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Mọi sản phẩm đều là hàng chính hãng, quy trình kiểm định gắt gao nhất hiện nay.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Bento Styling */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 text-center items-center">
              <div>
                <div className="text-5xl sm:text-7xl font-black italic mb-2 text-blue-500">10+</div>
                <div className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black">Năm hành trình</div>
              </div>
              <div>
                <div className="text-5xl sm:text-7xl font-black italic mb-2 text-white">50+</div>
                <div className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black">Cửa hàng lớn</div>
              </div>
              <div>
                <div className="text-5xl sm:text-7xl font-black italic mb-2 text-blue-500">1M+</div>
                <div className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black">K.Hàng tin dùng</div>
              </div>
              <div>
                <div className="text-5xl sm:text-7xl font-black italic mb-2 text-white">24/7</div>
                <div className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black">Support online</div>
              </div>
           </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none"></div>
      </section>

      {/* Story Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 w-full">
                 <motion.div 
                   whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                   className="bento-card p-3 bg-slate-100/50 border-none shadow-2xl shadow-slate-200"
                 >
                   <img 
                      src="https://images.unsplash.com/photo-1556740734-7f9a2b7a0f42?q=80&w=1200&auto=format&fit=crop" 
                      alt="Our Vision" 
                      className="rounded-[2.5rem] w-full"
                      referrerPolicy="no-referrer"
                   />
                 </motion.div>
              </div>
              <div className="flex-1 space-y-10">
                 <div className="inline-block text-[10px] font-black text-blue-600 uppercase tracking-widest border-b-4 border-blue-100 pb-1">Our Vision</div>
                 <h2 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight tracking-tighter italic">HÀNH TRÌNH KIẾN TẠO <span className="text-blue-600 not-italic">ƯỚC MƠ</span></h2>
                 <p className="text-slate-500 leading-relaxed font-semibold text-lg italic">
                    Bắt đầu từ một cửa hàng nhỏ tại trái tim Quận 1 vào năm 2014, SHOPMOBILE đã vươn mình trở thành biểu tượng của sự tin cậy trong ngành thiết bị di động. Chúng tôi tin rằng mỗi sản phẩm bán ra là một lời hứa bền lâu với công nghệ.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div className="flex items-center space-x-4 p-4 bento-card bg-slate-50 border-none shadow-none">
                       <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600"><Users size={20} /></div>
                       <span className="font-black text-slate-700 text-xs uppercase tracking-tight">500+ Nhân sự tận tâm</span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bento-card bg-slate-50 border-none shadow-none">
                       <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600"><MapPin size={20} /></div>
                       <span className="font-black text-slate-700 text-xs uppercase tracking-tight">15 Tỉnh thành trọng điểm</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
