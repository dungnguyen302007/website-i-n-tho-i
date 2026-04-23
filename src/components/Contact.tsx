import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { submitContactMessage } from '@/src/services/dbService';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContactMessage(formData.name, formData.email, formData.message);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ... rest of header ... */}
      {/* Header */}
      <section className="relative py-24 sm:py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
           <img 
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2000&auto=format&fit=crop" 
            alt="Contact Backdrop" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-7xl font-black italic tracking-tight mb-6"
          >
            LIÊN HỆ <br/><span className="text-red-600 not-italic">HỖ TRỢ</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Mọi thắc mắc của bạn sẽ được đội ngũ uMobi phản hồi sớm nhất có thể.
          </p>
        </div>
      </section>

      <section className="py-20 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-8 italic">
              <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-xl shadow-slate-100 space-y-12">
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 mb-10 uppercase tracking-[0.2em] flex items-center">
                    <MessageSquare className="mr-3 text-red-600" size={18} />
                    THÔNG TIN LIÊN HỆ
                  </h3>
                  <div className="space-y-10">
                    <div className="flex items-start space-x-6">
                      <div className="w-14 h-14 bg-[#f4f4f4] rounded-2xl text-red-600 shrink-0 flex items-center justify-center shadow-sm"><Phone size={24} /></div>
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Hotline</div>
                        <div className="text-slate-900 font-black text-xl">1800 1234</div>
                        <div className="text-[10px] text-slate-400 font-bold italic mt-1">Hỗ trợ 24/7 toàn quốc</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-6">
                      <div className="w-14 h-14 bg-[#f4f4f4] rounded-2xl text-red-600 shrink-0 flex items-center justify-center shadow-sm"><Mail size={24} /></div>
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Email</div>
                        <div className="text-slate-900 font-black text-xl">cskh@umobi.vn</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-6">
                      <div className="w-14 h-14 bg-[#f4f4f4] rounded-2xl text-red-600 shrink-0 flex items-center justify-center shadow-sm"><MapPin size={24} /></div>
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Hệ thống</div>
                        <div className="text-slate-900 font-bold text-sm leading-relaxed">Chuỗi 50+ cửa hàng trên toàn quốc</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-100">
                   <h4 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest leading-none">Theo dõi uMobi</h4>
                   <div className="flex flex-wrap gap-3">
                      {['FACEBOOK', 'YOUTUBE', 'TIKTOK'].map(social => (
                        <div key={social} className="px-5 py-2.5 bg-[#f4f4f4] rounded-xl flex items-center justify-center font-black text-[10px] cursor-pointer hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest shadow-sm">
                          {social}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2.5rem] p-10 sm:p-16 border border-slate-100 shadow-2xl shadow-slate-100 italic">
                <h3 className="text-3xl font-black text-slate-900 mb-12 tracking-tighter italic uppercase">Gửi tin nhắn <span className="text-red-600 not-italic">Trực tuyến</span></h3>
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                  >
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-green-100">
                      <CheckCircle size={48} />
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-3xl font-black text-slate-900 italic uppercase">Cảm ơn bạn!</h4>
                       <p className="text-slate-500 font-medium italic text-lg leading-relaxed">Thông tin của bạn đã được tiếp nhận. Đội ngũ uMobi sẽ phản hồi sớm nhất qua email.</p>
                    </div>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all shadow-xl shadow-red-100"
                    >
                      Gửi tin nhắn khác
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Họ và tên</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Họ tên của bạn" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-8 py-4 bg-[#f4f4f4] border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-red-600 transition-all outline-none italic"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Địa chỉ Email</label>
                        <input 
                          required
                          type="email" 
                          placeholder="Email@domain.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-8 py-4 bg-[#f4f4f4] border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-red-600 transition-all outline-none italic"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nội dung bạn cần hỗ trợ</label>
                      <textarea 
                        required
                        rows={6} 
                        placeholder="Hãy chia sẻ vấn đề bạn gặp phải..." 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-8 py-4 bg-[#f4f4f4] border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-red-600 transition-all outline-none resize-none italic"
                      />
                    </div>
                    <button 
                      disabled={loading}
                      type="submit"
                      className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-red-100 disabled:opacity-50 active:scale-95 duration-300"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          GỬI YÊU CẦU NGAY
                          <Send size={18} className="group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] grayscale brightness-75 -mt-32 relative bg-slate-200 flex items-center justify-center border-t border-slate-300 overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" />
         </div>
         <div className="relative z-10 bg-slate-900 px-10 py-6 border-b-4 border-red-600 shadow-2xl">
            <p className="text-white font-black italic text-lg uppercase tracking-[0.2em] leading-none">HỆ THỐNG CỬA HÀNG <span className="text-red-600">uMobi</span></p>
         </div>
      </section>
    </div>
  );
}
