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
            LIÊN HỆ <br/><span className="text-orange-600 not-italic">HỖ TRỢ</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Mọi thắc mắc của bạn sẽ được đội ngũ SHOPMOBILE phản hồi sớm nhất có thể.
          </p>
        </div>
      </section>

      <section className="py-20 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bento-card p-10 bg-white space-y-10">
                <div>
                  <h3 className="text-xs font-black text-slate-900 mb-8 uppercase tracking-widest flex items-center">
                    <MessageSquare className="mr-3 text-orange-600" size={18} />
                    Thông tin
                  </h3>
                  <div className="space-y-8">
                    <div className="flex items-start space-x-5">
                      <div className="p-4 bg-slate-50 rounded-2xl text-orange-600 shrink-0 shadow-sm"><Phone size={22} /></div>
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Hotline</div>
                        <div className="text-slate-900 font-black text-lg">1900 8888</div>
                        <div className="text-[10px] text-slate-500 font-bold italic mt-1">Hỗ trợ 24/7 toàn quốc</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-5">
                      <div className="p-4 bg-slate-50 rounded-2xl text-orange-600 shrink-0 shadow-sm"><Mail size={22} /></div>
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Email</div>
                        <div className="text-slate-900 font-black text-lg">care@shopmobile.vn</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-5">
                      <div className="p-4 bg-slate-50 rounded-2xl text-orange-600 shrink-0 shadow-sm"><MapPin size={22} /></div>
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Văn phòng</div>
                        <div className="text-slate-900 font-bold text-sm leading-relaxed">Quận 1, Thành phố Hồ Chí Minh</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-100">
                   <h4 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest">Mạng xã hội</h4>
                   <div className="flex flex-wrap gap-3">
                      {['FACEBOOK', 'INSTAGRAM', 'TIKTOK'].map(social => (
                        <div key={social} className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-black text-[10px] cursor-pointer hover:bg-orange-600 hover:text-white transition-all uppercase tracking-widest shadow-sm">
                          {social}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <div className="bento-card p-10 sm:p-16 bg-white shrink-0">
                <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight italic uppercase">Gửi tin nhắn <span className="text-orange-600 not-italic">Trực tuyến</span></h3>
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center">
                      <CheckCircle size={40} />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-2xl font-black text-slate-900">Cảm ơn bạn!</h4>
                       <p className="text-slate-500 font-medium italic">Chúng tôi sẽ sớm liên hệ lại với bạn qua email.</p>
                    </div>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-black text-orange-600 uppercase tracking-widest hover:underline"
                    >
                      Gửi tin nhắn khác
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên</label>
                        <input 
                          required
                          type="text" 
                          placeholder="VD: Möbius" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-orange-600 transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Địa chỉ Email</label>
                        <input 
                          required
                          type="email" 
                          placeholder="VD: care@shopmobile.vn" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-orange-600 transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nội dung yêu cầu</label>
                      <textarea 
                        required
                        rows={6} 
                        placeholder="Chúng tôi có thể giúp gì cho bạn?" 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-orange-600 transition-all outline-none resize-none"
                      />
                    </div>
                    <button 
                      disabled={loading}
                      type="submit"
                      className="w-full py-5 bg-orange-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center group shadow-2xl shadow-orange-200 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Gửi yêu cầu hỗ trợ ngay
                          <Send size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
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
      <section className="h-[500px] grayscale brightness-75 -mt-20 relative bg-slate-200 flex items-center justify-center border-t border-slate-300">
         <div className="bento-card-dark p-10 bg-slate-900 shadow-2xl">
            <p className="text-orange-400 font-black italic text-lg uppercase tracking-widest">Google Map Location</p>
         </div>
      </section>
    </div>
  );
}
